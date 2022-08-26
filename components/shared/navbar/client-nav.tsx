import { useAuth } from '@/providers/auth';

import { Button } from '@mui/material';

import { NavBarAvatar } from './navbar-avatar';
import { NavBarNotifications } from './navbar-notifications';

export function ClientNav() {
  const { onOpenWalletModal, me } = useAuth();
  return (
    <>
      {me ? (
        <>
          {/* <NavBarNotifications /> */}
          <NavBarAvatar />
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onOpenWalletModal}
          >
            Connect Wallet
          </Button>
        </>
      )}
    </>
  );
}
