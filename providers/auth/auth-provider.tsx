import { PropsWithChildren, useEffect, useState } from 'react';

import { useAccount } from 'wagmi';

import { WalletModal } from '@/components/shared/wallet-modal';
import useToggleContainerClass from '@/hooks/use-toggle-container-class';

import { AuthContext } from './context';
import {
  useMe,
  useAuthenticatedUser,
  useUserStatusRoute,
  useCloseModal,
} from './hooks';
import { useAuthStatus } from './state';

type Props = {
  isAuthPage?: boolean;
};

export function AuthProvider({
  isAuthPage,
  children,
}: PropsWithChildren<Props>) {
  /* Wallet connection */
  const { address, status: addressStatus } = useAccount();

  /* Authenticated User */
  const { me, hasuraAuthRefreshSDK, onDisconnectUser, onUpdateMe } =
    useMe(address);

  /* SSR Fix  */
  const [isBlocked, setBlocked] = useState(!!isAuthPage);
  useEffect(() => {
    if (!isAuthPage && isBlocked) {
      setBlocked(false);
    }
    if (isAuthPage) {
      if (!!me && isBlocked) {
        setBlocked(false);
      }
      if (!me && !isBlocked) {
        setBlocked(true);
      }
    }
  }, [isBlocked, isAuthPage, me]);

  /* Global Auth Status */
  const { status, onAuthenticated, onConnecting, onUnauthenticated } =
    useAuthStatus(!!me, isBlocked);

  const onSignOut = () => {
    onDisconnectUser();
    onUnauthenticated();
  };

  const onCloseModal = useCloseModal(isBlocked, onUnauthenticated);

  useAuthenticatedUser(addressStatus, address, me, onSignOut);

  useToggleContainerClass('blur', status === 'CONNECTING');

  useUserStatusRoute(status, me);

  return (
    <AuthContext.Provider
      value={{
        me,
        hasuraAuthSDK: hasuraAuthRefreshSDK,
        onOpenWalletModal: onConnecting,
        onSignOut,
        onUpdateMe,
      }}
    >
      {!isBlocked && children}
      {status !== 'AUTHENTICATED' && (
        <WalletModal
          isOpen={status === 'CONNECTING'}
          onClose={onCloseModal}
          onSuccess={onAuthenticated}
        />
      )}
    </AuthContext.Provider>
  );
}
