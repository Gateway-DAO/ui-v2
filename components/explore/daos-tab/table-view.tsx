import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { AvatarFile } from '@/components/shared/avatar-file';
import { categoriesMap } from '@/constants/dao';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/auth';
import { TOKENS } from '@/theme';
import { Daos } from '@/types/hasura.generated';

import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// TODO: FollowButtonDao

type Props = {
  daos: PartialDeep<Daos>[];
};
export function TableView({ daos }: Props) {
  const { me } = useAuth();
  return (
    <TableContainer
      sx={{
        '& .MuiTableCell-root:first-of-type': {
          pl: TOKENS.CONTAINER_PX,
        },
        '& .MuiTableCell-root:last-of-type': {
          pr: TOKENS.CONTAINER_PX,
        },
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Dao</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {daos.map((dao) => {
            const isAdmin =
              dao.permissions?.some(
                (p) => p?.user_id === me?.id && p?.permission === 'dao_admin'
              ) ?? false;

            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={dao.id}>
                <Link
                  passHref
                  href={ROUTES.DAO_PROFILE.replace('[id]', dao.id)}
                >
                  <TableCell sx={{ cursor: 'pointer' }}>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <AvatarFile
                        file={dao.logo}
                        fallback={dao.logo_url ?? '/logo.png'}
                      >
                        {dao.name?.[0]}
                      </AvatarFile>
                      <Box>
                        <Typography>{dao.name}</Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={(theme) => ({
                            display: 'block',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            maxWidth: '70ch',
                            [`${theme.breakpoints.down('md')}`]: {
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            },
                          })}
                        >
                          {(dao.description?.length ?? 0) > 140
                            ? `${dao.description!.slice(0, 139)}...`
                            : dao.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                </Link>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {dao.categories?.map((category) => {
                      const label = categoriesMap.get(category) ?? category;
                      return (
                        <Chip
                          key={`dao-${dao.id}-category-${category}`}
                          label={label}
                        />
                      );
                    })}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  {/* {!isAdmin && (
                    <FollowButtonDAO
                      daoId={dao.id}
                      variant="outlined"
                      color="secondary"
                    />
                  )} */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
