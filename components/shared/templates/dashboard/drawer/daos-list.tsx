import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { AdminBadge } from '@/components/shared/admin-badge';
import { AvatarFile } from '@/components/shared/avatar-file';
import { MotionTooltip } from '@/components/shared/motion/motion';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { Daos } from '@/types/hasura.generated';

import { ListItemButton, ListItemIcon } from '@mui/material';

import { DashboardTemplateProps } from '../types';

type Props = Pick<DashboardTemplateProps, 'currentDao'>;

export default function DaosList({ currentDao }: Props) {
  const { me } = useAuth();

  const followingDaos: PartialDeep<Daos>[] = useMemo(
    () => me?.following_dao?.map(({ dao }) => dao) ?? [],
    [me?.following_dao]
  );

  return (
    <>
      {followingDaos?.map((dao) => {
        const url = ROUTES.DAO_PROFILE.replace('[id]', dao.id);

        return (
          <Link key={dao.id} passHref href={url} prefetch={false}>
            <MotionTooltip
              layoutId={dao.id}
              title={dao.name!}
              placement="right"
            >
              <ListItemButton
                component="a"
                aria-label={`Go to ${dao.name}`}
                className={dao.id === currentDao?.id ? 'active' : undefined}
              >
                <ListItemIcon>
                  <AdminBadge isAdmin={!!dao.is_admin}>
                    <AvatarFile file={dao.logo} fallback={dao.logo_url!}>
                      {dao.name?.[0]}
                    </AvatarFile>
                  </AdminBadge>
                </ListItemIcon>
              </ListItemButton>
            </MotionTooltip>
          </Link>
        );
      })}
    </>
  );
}
