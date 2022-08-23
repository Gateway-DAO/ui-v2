import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/services/react-query/client';
import { ThemeProvider } from '@/theme';
type Props = {
  isAuthPage?: boolean;
};

export function DashboardApp({
  children,
  isAuthPage,
}: PropsWithChildren<Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
