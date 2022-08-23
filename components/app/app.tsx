import { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';

import { queryClient } from '@/services/react-query/client';
import { web3client } from '@/services/wagmi/client';
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
      <ThemeProvider>
        <WagmiConfig client={web3client}>{children}</WagmiConfig>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
