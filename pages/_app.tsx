import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';

import { DashboardApp } from '@/components/app/app';
import { LoadingIndicator } from '@/components/app/loading-indicator';
import { Favicons } from '@/components/app/seo/favicons';
import { Scripts } from '@/components/app/seo/scripts';
import { SEOMetatags } from '@/components/app/seo/seo-metatags';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & { auth?: boolean };
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicons />
        <SEOMetatags />
      </Head>
      <LoadingIndicator />
      <DashboardApp isAuthPage={Component.auth}>
        <Component {...pageProps} />
      </DashboardApp>
      <Scripts />
    </>
  );
}

export default MyApp;
