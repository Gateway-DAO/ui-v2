import { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/theme';

type Props = {
  isAuthPage?: boolean;
};

export function DashboardApp({
  children,
  isAuthPage,
}: PropsWithChildren<Props>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
