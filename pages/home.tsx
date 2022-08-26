import { InferGetStaticPropsType } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';

import { AllTab } from '@/components/explore/all-tab';
import { DaosTab } from '@/components/explore/daos-tab';
import { GatesTab } from '@/components/explore/gates-tab';
import { PeopleTab } from '@/components/explore/people-tab';
import { Navbar } from '@/components/shared/navbar';
import { a11yTabProps, TabPanel, useTab } from '@/components/shared/tabs';
import { DashboardTemplate } from '@/components/shared/templates/dashboard/dashboard';
import { hasuraPublicSDK } from '@/services/hasura/api';
import { TOKENS } from '@/theme';

import { Box, Tab, Tabs, Typography } from '@mui/material';

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
  const { activeTab, handleTabChange, setTab } = useTab();

  const { data } = useQuery(['explore'], () => hasuraPublicSDK.get_home(), {
    initialData: exploreProps,
  });

  if (!data) return null;

  const tabs = [
    {
      key: 'all',
      label: t('common:tabs.all'),
      section: (
        <AllTab
          daos={data.daos.map((dao) => (
            <div key={dao.id}>{dao.name}</div>
          ))}
          gates={data.gates.map((gate) => (
            <div key={gate.id}>{gate.title}</div>
          ))}
          people={data.people.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
          setActiveTab={setTab}
        />
      ),
    },
    {
      key: 'gates',
      label: t('common:tabs.gates'),
      section: <GatesTab />,
    },
    {
      key: 'daos',
      label: t('common:tabs.daos'),
      section: <DaosTab />,
    },
    {
      key: 'people',
      label: t('common:tabs.people'),
      section: <PeopleTab />,
    },
  ];

  return (
    <DashboardTemplate
      containerProps={{
        sx: {
          pt: 2,
          overflow: 'hidden',
        },
      }}
    >
      <>
        <Navbar />
        <Box pt={6}>
          <Typography
            variant="h4"
            whiteSpace="pre-line"
            px={TOKENS.CONTAINER_PX}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="body1"
            whiteSpace="pre-line"
            px={TOKENS.CONTAINER_PX}
            color="text.secondary"
          >
            {t('subtitle')}
          </Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: TOKENS.CONTAINER_PX,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
              sx={{
                mb: '-1px',
              }}
            >
              {tabs.map(({ key, label }, index) => (
                <Tab
                  key={key}
                  label={label}
                  sx={(theme) => ({
                    px: 0,
                    mr: theme.spacing(3),
                    fontWeight: 700,
                  })}
                  {...a11yTabProps('explore', index)}
                />
              ))}
            </Tabs>
          </Box>
          {tabs.map(({ key, section }, index) => (
            <TabPanel
              key={key}
              tabsId="explore"
              index={index}
              active={index === activeTab}
            >
              {section}
            </TabPanel>
          ))}
        </Box>
      </>
    </DashboardTemplate>
  );
}
