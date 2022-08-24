import { PropsWithChildren } from 'react';

import { Box } from '@mui/material';

import { DashboardTemplateProps } from './types';
import { useNav } from './use-nav';

export function PageContainer({
  containerProps,
  children,
}: PropsWithChildren<Pick<DashboardTemplateProps, 'containerProps'>>) {
  const { isOpen } = useNav();
  return (
    <Box
      component="main"
      {...containerProps}
      sx={[
        containerProps?.sx as any,
        (theme) => ({
          flexGrow: 1,
          [theme.breakpoints.down('md')]: {
            transition: 'transform 225ms ease-out',
          },
        }),
        isOpen &&
          ((theme) => ({
            [theme.breakpoints.down('md')]: {
              transform: (theme) => `translateX(${theme.spacing(9)})`,
            },
          })),
      ]}
    >
      {children}
    </Box>
  );
}
