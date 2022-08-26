import useTranslation from 'next-translate/useTranslation';
import { ReactNode } from 'react';

import { PartialDeep } from 'type-fest';

import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '@/components/shared/sections';
import { Daos, Gates, Users } from '@/types/hasura.generated';

import { Button, Divider, Stack } from '@mui/material';

// import { DaoCard } from '../../../../molecules/dao-card';
// import { GatesCard } from '../../../../molecules/gates-card';
// import { PersonCard } from '../../../../molecules/person-card';

type Props = {
  daos: ReactNode[];
  gates: ReactNode[];
  people: ReactNode[];
  setActiveTab: (tab: number) => void;
};

export function AllTab({ daos, gates, people, setActiveTab }: Props) {
  const { t } = useTranslation('explore');

  return (
    <Stack
      direction="column"
      sx={{
        section: {
          py: 4,
        },
      }}
    >
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        <SectionWithSliderResponsive
          title={t('featured-gates.title')}
          caption={t('featured-gates.caption')}
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('featured-gates.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {gates}
          {/* gates.map((gate) => (
            <GatesCard key={gate.id} {...gate} />
          )) */}
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
          title={t('featured-daos.title')}
          caption={t('featured-daos.caption')}
          action={
            <Button onClick={() => setActiveTab(2)}>
              {t('featured-daos.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(41)}
        >
          {daos}
          {/* daos.map((dao) => (
            <DaoCard key={dao.id} {...dao} />
          )) */}
        </SectionWithSliderResponsive>
        <SectionWithGrid
          title={t('featured-people.title')}
          caption={t('featured-people.caption')}
          action={
            <Button onClick={() => setActiveTab(3)}>
              {t('featured-people.see-more')}
            </Button>
          }
        >
          {people}
          {/* people.map((person) => (
            <PersonCard key={person.id} user={person} />
          )) */}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
