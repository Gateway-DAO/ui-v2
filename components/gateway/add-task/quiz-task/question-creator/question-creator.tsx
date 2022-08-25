import { Question } from '@/components/gateway/schema';

import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Stack } from '@mui/material';

import { QuestionField } from '../question-field/question-field';
import { RadioCheckBoxCreator } from '../radio-checkbox-creator/radio-checkbox-creator';

export function QuestionCreator({
  taskId,
  questions,
  onRemove,
  ...rest
}): JSX.Element {
  return (
    <Stack
      alignItems={'flex-start'}
      sx={{
        width: '100%',
      }}
      {...rest}
    >
      {questions.map((question: Question, index: number) => (
        <Stack
          key={question.id}
          sx={() => ({
            width: '100%',
            py: '48px',
          })}
        >
          {index !== 0 && <Divider sx={{ margin: '-40px -50px 60px -50px' }} />}
          <Stack
            direction="row"
            alignItems={'center'}
            sx={(theme) => ({
              width: '100%',
              mb: '24px',
              [theme.breakpoints.down('sm')]: {
                alignItems: 'flex-start',
              },
            })}
          >
            <QuestionField questionIndex={index} taskId={taskId} />

            {questions.length > 1 && (
              <IconButton
                sx={{ marginLeft: '24px', cursor: 'pointer' }}
                onClick={() => onRemove(index)}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Stack>
          <RadioCheckBoxCreator questionIndex={index} taskId={taskId} />
        </Stack>
      ))}
    </Stack>
  );
}
