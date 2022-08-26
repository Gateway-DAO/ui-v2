import { useQuery } from '@tanstack/react-query';

import { hasuraPublicSDK } from '@/services/hasura/api';

import { Box, CircularProgress } from '@mui/material';

import { TableView } from './table-view';

export function PeopleTab() {
  const { data: people, isLoading } = useQuery(
    ['people-tab'],
    () => hasuraPublicSDK.people_tab(),
    { select: (data) => data.people }
  );
  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableView people={people ?? []} />
      )}
    </Box>
  );
}
