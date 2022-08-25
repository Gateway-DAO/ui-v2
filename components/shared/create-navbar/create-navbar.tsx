import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Avatar, IconButton } from '@mui/material';

import { LoadingButton } from '../loading-button/loading-button';

type Props = {
  isLoading: boolean;
};

export const CreateNavbar = ({ isLoading }: Props) => {
  const router = useRouter();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'none',
          padding: { xs: '0 20px 0 10px', md: '0 90px' },
        }}
      >
        <Toolbar>
          <IconButton
            sx={{ position: 'absolute', left: 0 }}
            onClick={() => router.back()}
          >
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <LoadingButton
            type="submit"
            form="gate-details-form"
            variant="contained"
            size="large"
            sx={{ position: 'absolute', right: 0 }}
            isLoading={isLoading}
          >
            Publish Gate
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
