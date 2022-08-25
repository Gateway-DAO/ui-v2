import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import CategoriesInput from '@/components/shared/categories-input';
import CreatedByInput from '@/components/shared/creators-input';
import SkillsInput from '@/components/shared/skills-input';
import { useAuth } from '@/providers/auth';

import { Stack, TextField } from '@mui/material';

import { CreateGateTypes, Creator } from './schema';

export function GateDetailsForm() {
  const { me } = useAuth();
  const creators: Creator[] = [{ id: me?.id, name: me?.name }];
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue('created_by', creators);
  }, []);

  return (
    <Stack direction="column" gap={2}>
      <TextField
        {...register('title')}
        label="Title"
        id="title"
        name="title"
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{
          '& div fieldset legend span': {
            marginRight: '4px',
          },
        }}
      />
      <CategoriesInput
        {...register('categories')}
        label="Categories"
        id="categories"
        name="categories"
        error={!!errors.categories}
        errors={errors.categories}
        helperText={errors.categories && 'Invalid categories added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '10px',
          },
        }}
        set={(categories: string[]) => {
          setValue('categories', categories);
        }}
      />
      <TextField
        {...register('description')}
        multiline
        minRows={4}
        label="Description"
        id="description"
        name="description"
        error={!!errors.description}
        helperText={errors.description?.message}
        sx={{
          '& div fieldset legend span': {
            marginRight: '12px',
          },
        }}
      />
      <SkillsInput
        {...register('skills')}
        label="Skills"
        id="skills"
        name="skills"
        error={!!errors.skills}
        errors={errors.skills}
        helperText={errors.skills && 'Invalid skills added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '10px',
          },
        }}
        set={(skills: string[]) => {
          setValue('skills', skills);
        }}
      />
      <CreatedByInput
        {...register('created_by')}
        label="Created By"
        id="created_by"
        name="created_by"
        disabled
        creators={creators}
        defaultValue={creators}
        error={!!errors.created_by}
        errors={errors.created_by}
        helperText={errors.created_by && 'Invalid creator added'}
        sx={{
          width: '100%',
          '& div fieldset legend span': {
            marginRight: '6px',
          },
        }}
        set={(created_by: Creator[]) => setValue('created_by', created_by)}
      />
    </Stack>
  );
}
