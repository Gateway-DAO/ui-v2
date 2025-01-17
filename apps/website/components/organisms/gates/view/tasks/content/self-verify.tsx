import normalizeUrl from 'normalize-url';

import DescriptionIcon from '@mui/icons-material/Description';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const SelfVerifyContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  const files = data.files.map((file, index) => {
    return (
      <ListItem
        key={index}
        sx={{ cursor: 'pointer' }}
        onClick={() =>
          window.open(
            normalizeUrl(`${file.link}`, {
              defaultProtocol: 'https:',
            }),
            '_blank'
          )
        }
      >
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText
          sx={{
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
          }}
          primary={file.title}
          secondary={file.description}
        />
      </ListItem>
    );
  });

  return (
    <List>
      {files}
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      )}
      {completed && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </List>
  );
};

export default SelfVerifyContent;
