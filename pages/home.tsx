import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';

import { DashboardTemplate } from '@/components/shared/templates/dashboard/dashboard';
import { hasuraPublicSDK } from '@/services/hasura/api';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export const getStaticProps = async () => {
  const exploreProps = await hasuraPublicSDK.get_home();

  return {
    props: {
      exploreProps,
    },
    revalidate: 10,
  };
};

export default function Explore({
  exploreProps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('explore');

  const { data } = useQuery(['explore'], () => hasuraPublicSDK.get_home(), {
    initialData: exploreProps,
  });

  console.log('rerender');

  if (!data) return null;

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
      Wawo
    </DashboardTemplate>
  );
}
