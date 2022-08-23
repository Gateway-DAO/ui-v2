import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export function LoadingIndicator() {
  const router = useRouter();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <LinearProgress
      sx={{
        backgroundColor: `${theme.palette.secondary.main}`,
        '& .MuiLinearProgress-bar': {
          backgroundColor: `${theme.palette.secondary.dark}`,
        },
      }}
    />
  );
}
