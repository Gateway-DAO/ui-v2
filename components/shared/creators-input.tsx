import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

import { Creator } from '../gateway/schema';

type Props = {
  set: (creators: Creator[]) => void;
  creators: Creator[];
  disabled?: boolean;
};

export const CreatedByInput = ({
  set,
  creators,
  disabled = false,
  ...props
}: Props) => {
  return (
    <Autocomplete
      multiple
      id="created_by-input"
      options={creators.map((creator: Creator) => creator.name)}
      popupIcon={<Search />}
      sx={{
        '&.Mui-focused .MuiButtonBase-root': {
          transform: 'none',
        },
      }}
      disabled={disabled}
      defaultValue={[creators[0].name]}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            {...getTagProps({ index })}
            key={index}
            variant="filled"
            label={option}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Created By" id="created_by" {...props} />
      )}
      onChange={() => set(creators)}
    />
  );
};

export default CreatedByInput;
