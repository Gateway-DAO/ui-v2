import { PartialDeep } from 'type-fest';

import { Daos } from '@/types/hasura.generated';

import { BoxProps } from '@mui/material/Box';

export type DashboardTemplateProps = {
  currentDao?: PartialDeep<Daos>;
  containerProps?: BoxProps<'main'>;
  showExplore?: boolean;
};
