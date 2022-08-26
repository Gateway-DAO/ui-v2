import Link from 'next/link';

import { PartialDeep } from 'type-fest';

import { AvatarFile } from '@/components/shared/avatar-file';
import { ROUTES } from '@/constants/routes';
import { TOKENS } from '@/theme';
import { Gates } from '@/types/hasura.generated';
import { badgeProps } from '@/utils/badge-props';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// TODO: make it generic
// TODO: Fix Gate name column width

type Props = {
  gates: PartialDeep<Gates>[];
};
export function TableView({ gates }: Props) {
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
            <TableCell align="left">Gate</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Dao</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gates.map((gate) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
                <Link
                  passHref
                  href={ROUTES.GATE_PROFILE.replace('[id]', gate.id)}
                >
                  <TableCell sx={{ cursor: 'pointer' }}>
                    <Stack alignItems="center" direction="row" gap={1}>
                      <Avatar variant="rounded" {...badgeProps(gate)}>
                        {gate.title?.[0]}
                      </Avatar>
                      <Box>
                        <Typography>{gate.title}</Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {gate.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                </Link>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {gate.categories?.map((category: string) => (
                      <Chip
                        key={`gate-${gate.id}-category-${category}`}
                        label={category}
                      />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <AvatarFile
                      file={gate?.dao?.logo}
                      fallback="/logo.png"
                      aria-label={gate?.dao?.name}
                      sx={{ width: 32, height: 32 }}
                    >
                      {gate.dao!.name?.[0]}
                    </AvatarFile>
                    {gate.dao!.name}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
