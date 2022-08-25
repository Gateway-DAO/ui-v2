import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

import { CATEGORIES } from '../../constants/gate';

interface Props extends HTMLInputElement {
  set: (categories: string[]) => void;
  label?: string;
}

export const CategoriesInput = ({ set, ...props }: Props) => {
  return (
    <Autocomplete
      multiple
      id="categories-input"
      options={CATEGORIES}
      popupIcon={<Search />}
      sx={{
        '&.Mui-focused .MuiButtonBase-root': {
          transform: 'none',
        },
      }}
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
        <TextField {...params} label="Categories" {...props} />
      )}
      onChange={(_event, categories) => set(categories)}
    />
  );
};

export default CategoriesInput;
