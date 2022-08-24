import { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';

import { DashboardApp } from '@/components/app/app';
import { LoadingIndicator } from '@/components/app/loading-indicator';
import { Favicons } from '@/components/app/seo/favicons';
import { Scripts } from '@/components/app/seo/scripts';
import { SEOMetatags } from '@/components/app/seo/seo-metatags';
import { usePersistLocale } from '@/components/app/use-persist-locale';
import '@/styles/next.css';
import { AuthPageComponent } from '@/types/next';

type AppProps = NextAppProps & {
  Component: NextAppProps['Component'] & AuthPageComponent;
};

function MyApp({ Component, pageProps }: AppProps) {
  usePersistLocale();

  return (
    <>
      <Head>
        <title>Gateway</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicons />
        <SEOMetatags />
      </Head>
      <DashboardApp isAuthPage={Component.auth}>
        <LoadingIndicator />
        <Component {...pageProps} />
      </DashboardApp>
      <Scripts />
    </>
  );
}

export default MyApp;
