import { useEffect, useState } from 'react';

import { useMutation } from 'react-query';
import { useToggle } from 'react-use';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  IconButton,
  Collapse,
} from '@mui/material';

import { useAuth } from '../../../../../website/providers/auth';
import { gqlMethods } from '../../../../../website/services/api';
import { queryClient } from '../../../../../website/services/query-client';
import { SessionUser } from '../../../../../website/types/user';
import { Tasks } from '../../../../services/graphql/types.generated';
import MeetingCodeContent from '../../../organisms/gates/view/tasks/content/meeting_code';
import QuizContent from '../../../organisms/gates/view/tasks/content/quiz';
import SelfVerifyContent from '../../../organisms/gates/view/tasks/content/self-verify';
import SnapshotContent from '../../../organisms/gates/view/tasks/content/snapshot';
import TokenHoldContent from '../../../organisms/gates/view/tasks/content/token_hold';

type Props = {
  idx?: number;
  task?: PartialObjectDeep<Tasks>;
};

export function Task({ task, idx }: Props) {
  const { me } = useAuth();

  const [expanded, toggleExpanded] = useToggle(false);
  const [completed, setCompleted] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    console.log(me?.task_progresses);
    const progressTaskIndex = me?.task_progresses.findIndex(
      (task_progress) => task_progress.task_id === task.id
    );

    if (progressTaskIndex !== -1) {
      setCompleted(true);
      setUpdatedAt(me?.task_progresses[progressTaskIndex].updated_at);
    }
  }, [task.id, me?.task_progresses]);

  const getTaskContent = (task_type: string) => {
    switch (task_type) {
      case 'self_verify':
        return {
          title: 'Files & Links',
          body: SelfVerifyContent,
        };
      case 'meeting_code':
        return {
          title: 'Verification Code',
          body: MeetingCodeContent,
        };
      case 'token_hold':
        return {
          title: 'Hold Token',
          body: TokenHoldContent,
        };
      case 'snapshot':
        return {
          title: 'Snapshot',
          body: SnapshotContent,
        };
      case 'quiz':
        return {
          title: 'Quiz',
          body: QuizContent,
        };
    }
  };

  const { mutate: completeTaskMutation } = useMutation(
    'completeTask',
    me && gqlMethods(me).complete_task,
    {
      onSuccess: async (data) => {
        await queryClient.cancelQueries('me');

        queryClient.setQueryData<SessionUser>('me', (old) => {
          const oldTaskProgresses = old.task_progresses.filter(
            (task_progress) => task_progress.task_id !== task.id
          );
          const newTaskProgress = [
            ...oldTaskProgresses,
            data.verify_key.task_info,
          ];

          return {
            ...old,
            task_progresses: newTaskProgress,
          };
        });

        //handleOpen();
      },
    }
  );

  const completeTask = (info) => {
    const data = {
      task_id: task.id,
      info,
    };

    completeTaskMutation(data, {
      onSuccess: (response) => {
        console.log('Completed!', response);
      },
      onError: (error) => {
        console.log('Error!', error);
      },
    });
  };

  const taskContent = getTaskContent(task.task_type);
  const TaskComponent = taskContent?.body;

  return (
    <Card
      sx={{
        borderRadius: 0,
        borderLeft: 'none',
        backgroundColor: 'transparent !important',
        backgroundImage: 'none !important',
        px: (theme) => theme.spacing(7),
        py: (theme) => theme.spacing(5),
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: expanded ? 'white' : 'transparent',
              color: (theme) =>
                expanded ? theme.palette.background.default : 'white',
              border: expanded ? 'none' : '1px solid #FFFFFF4D',
            }}
          >
            {idx || task.title[0]}
          </Avatar>
        }
        title={<Typography variant="caption">{taskContent?.title}</Typography>}
        subheader={<Typography variant="h6">{task.title}</Typography>}
        action={
          <IconButton onClick={toggleExpanded}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{
          paddingLeft: (theme) => theme.spacing(2) + 40,
        }}
      >
        <CardContent sx={{ marginLeft: '55px' }}>
          <Typography variant="subtitle2">{task.description}</Typography>
          <TaskComponent
            data={task.task_data}
            completed={completed}
            updatedAt={updatedAt}
            completeTask={completeTask}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}