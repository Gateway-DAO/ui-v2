import { SKILLS } from '@/constants/skills';

import { Search } from '@mui/icons-material';
import { Chip, TextField, Autocomplete } from '@mui/material';

type Props = {
  set: (skills: string[]) => void;
};

export const SkillsInput = ({ set, ...props }: Props) => {
  return (
    <Autocomplete
      multiple
      id="skills-input"
      options={[...SKILLS.HARD, ...SKILLS.SOFT]}
      groupBy={(option) =>
        SKILLS.HARD.includes(option) ? 'Hard Skills' : 'Soft Skills'
      }
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
        <TextField {...params} label="Skills" id="skills" {...props} />
      )}
      onChange={(event, skills) => set(skills)}
    />
  );
};

export default SkillsInput;
