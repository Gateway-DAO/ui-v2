import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { Container } from './container';
import { Drawer } from './drawer';
import { PageContainer } from './page-container';
import { DashboardTemplateProps } from './types';
import { NavStateProvider } from './use-nav';

const DaosList = dynamic(() => import('./drawer/daos-list'), { ssr: false });

export function DashboardTemplate({
  currentDao,
  children,
  containerProps,
  showExplore = true,
}: PropsWithChildren<DashboardTemplateProps>) {
  return (
    <NavStateProvider>
      <Container>
        <Drawer showExplore={showExplore}>
          <DaosList key="daos" currentDao={currentDao} />
        </Drawer>
        <PageContainer containerProps={containerProps}>
          {children}
        </PageContainer>
      </Container>
    </NavStateProvider>
  );
}

export default DashboardTemplate;
