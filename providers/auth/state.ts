import { useEffect, useState } from 'react';

export type AuthStatus = 'UNAUTHENTICATED' | 'CONNECTING' | 'AUTHENTICATED';

export const useAuthStatus = (hasUser: boolean, isBlocked: boolean) => {
  const [status, setStatus] = useState<AuthStatus>(() => {
    if (hasUser) return 'AUTHENTICATED';
    return 'UNAUTHENTICATED';
  });

  useEffect(() => {
    if (!hasUser && status === 'AUTHENTICATED') {
      setStatus('UNAUTHENTICATED');
    }
  }, [hasUser, status]);

  useEffect(() => {
    if (hasUser && status !== 'AUTHENTICATED') {
      setStatus('AUTHENTICATED');
    }
  }, [hasUser, status]);

  useEffect(() => {
    if (isBlocked && status === 'UNAUTHENTICATED') {
      setStatus('CONNECTING');
    }
  }, [isBlocked, status]);

  const onConnecting = () => {
    setStatus('CONNECTING');
  };

  const onUnauthenticated = () => {
    setStatus('UNAUTHENTICATED');
  };

  const onAuthenticated = () => {
    setStatus('AUTHENTICATED');
  };

  return { status, onConnecting, onUnauthenticated, onAuthenticated };
};
