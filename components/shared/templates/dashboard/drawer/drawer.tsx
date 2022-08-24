import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

import { AnimatePresence } from 'framer-motion';

import { GatewayIcon } from '@/components/shared/icons/gateway';
import { MotionTooltip } from '@/components/shared/motion/motion';
import { ROUTES } from '@/constants/routes';

import ExploreIcon from '@mui/icons-material/Explore';
import { Avatar, ListItemButton, ListItemIcon } from '@mui/material';

import { DashboardTemplateProps } from '../types';
import { DaosListContainer } from './daos-list-container';
import { DrawerContainer } from './drawer-container';
import { ResponsiveDrawer } from './responsive-drawer';

type Props = Pick<DashboardTemplateProps, 'showExplore'>;

export function Drawer({ showExplore, children }: PropsWithChildren<Props>) {
  const router = useRouter();

  return (
    <DrawerContainer>
      <ResponsiveDrawer>
        <DaosListContainer>
          <ListItemIcon
            sx={{
              mb: 2.75,
              px: 2,
              alignItems: 'center',
              justifyContent: 'center',
              height: (theme) => theme.spacing(5),
            }}
          >
            <GatewayIcon />
          </ListItemIcon>
          <AnimatePresence>
            {showExplore && (
              <Link passHref href={ROUTES.EXPLORE} prefetch={false}>
                <MotionTooltip
                  key="explore"
                  layoutId="Explore"
                  title="Explore"
                  placement="right"
                  className={
                    router.pathname === ROUTES.EXPLORE ? 'active' : undefined
                  }
                >
                  <ListItemButton component="a">
                    <ListItemIcon>
                      <Avatar>
                        <ExploreIcon />
                      </Avatar>
                    </ListItemIcon>
                  </ListItemButton>
                </MotionTooltip>
              </Link>
            )}
            {children}
          </AnimatePresence>
        </DaosListContainer>
      </ResponsiveDrawer>
    </DrawerContainer>
  );
}
