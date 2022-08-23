import type { AppProps as NextAppProps } from 'next/app';

import { DashboardApp } from '@/components/app/app';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DashboardApp isAuthPage={Component.auth}>
      <Component {...pageProps} />
    </DashboardApp>
  );
}

export default MyApp;
