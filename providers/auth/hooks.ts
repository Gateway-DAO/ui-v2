import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import { useDisconnect, useAccount } from 'wagmi';

import { ROUTES } from '@/constants/routes';
import {
  hasuraPublicSDK,
  hasuraAuthSDK,
  hasuraRefreshSDK,
} from '@/services/hasura/api';
import { ErrorResponse } from '@/types/graphql';
import {
  LoginMutation,
  LoginMutationVariables,
  RefreshMutation,
} from '@/types/hasura.generated';
import { SessionUser } from '@/types/session';

import { AuthStatus } from './state';

export function useLogin() {
  const queryClient = useQueryClient();

  const signIn = useMutation(
    ['signIn'],
    async (credentials: LoginMutationVariables) => {
      const res = await hasuraPublicSDK.login({
        signature: credentials.signature,
        wallet: credentials.wallet,
      });

      const { error } = (res as any) ?? {};

      if (error || !res.login) {
        throw error;
      }
      /* get current user from hasura based on the token */
      const { me } = await hasuraAuthSDK(res.login.token).me();

      return {
        login: res.login,
        me: me,
        wallet: credentials.wallet,
      };
    },
    {
      onSuccess({ login, me, wallet }) {
        queryClient.setQueryData(['token', wallet], login);
        queryClient.setQueryData(['me', wallet], me);
      },
    }
  );

  return signIn;
}

export function useMe(wallet?: string) {
  const queryClient = useQueryClient();
  const { disconnect } = useDisconnect();

  /* Updates current token with refreshed one */
  const onRefreshToken = (
    newToken: NonNullable<RefreshMutation['refresh']>
  ) => {
    queryClient.setQueryData(
      ['token', wallet],
      (oldToken?: NonNullable<LoginMutation['login']>) => ({
        ...oldToken,
        token: newToken.token,
        refresh_token: newToken.refresh_token,
      })
    );
  };

  /* Clean up user cache and disconnects from the wallet */
  const onDisconnectUser = () => {
    queryClient.setQueryData(['token', wallet], null);
    queryClient.setQueryData(['me', wallet], null);
    disconnect();
  };

  const token = useQuery(
    ['token', wallet],
    () => queryClient.getQueryData<LoginMutation['login']>(['token', wallet]),
    { enabled: !!wallet }
  );

  const me = useQuery(
    ['me', wallet],
    () =>
      hasuraRefreshSDK(
        token.data!.token,
        token.data!.refresh_token,
        undefined,
        onRefreshToken
      ).me(),
    {
      select: (data) => data.me as SessionUser,
      enabled: !!wallet && !!token.data,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 10,
      onError(error: unknown) {
        (error as ErrorResponse).response.errors?.forEach((err) => {
          if (err.extensions.code === 500 && err.message.includes('token')) {
            onDisconnectUser();
          }
        });
      },
    }
  );

  const onUpdateMe = (cb: (oldMe: SessionUser) => PartialDeep<SessionUser>) =>
    queryClient.setQueryData(
      ['me', wallet],
      (oldMe?: Partial<SessionUser>) => ({
        ...oldMe,
        ...(cb(oldMe! as SessionUser) as SessionUser),
      })
    );

  /* Authenticated */
  const hasuraAuthRefreshSDK = useMemo(() => {
    if (!token.data) return undefined;
    return hasuraRefreshSDK(
      token.data.token,
      token.data.refresh_token,
      undefined,
      onRefreshToken
    );
  }, [token.data, onRefreshToken]);

  return {
    me: me.data,
    hasuraAuthRefreshSDK,
    onUpdateMe,
    onDisconnectUser,
  };
}

// If the user is authenticated, but:
// - there's no wallet connected; or
// - the wallet is connected, but the address is different
// then disconnect the user
export function useAuthenticatedUser(
  addressStatus: string,
  address: string | undefined,
  me: SessionUser | undefined,
  onSignOut: () => void
) {
  useEffect(() => {
    if (addressStatus === 'connecting' || addressStatus === 'reconnecting')
      return;
    if ((!address && me) || (address && me && address !== me.wallet)) {
      onSignOut();
    }
  }, [address, me, onSignOut]);
}

// Detects user status and redirects to the appropriate page
export function useUserStatusRoute(
  status: AuthStatus,
  me: PartialDeep<SessionUser> | undefined
) {
  const router = useRouter();

  useEffect(() => {
    if (status !== 'AUTHENTICATED') return;
    // Redirects to New User if authenticated but not registered
    if (router.pathname !== ROUTES.NEW_USER && me && !me.init) {
      router.replace(ROUTES.NEW_USER);
    }

    // Redirect to Explore if authenticated and registered
    if (router.pathname === ROUTES.NEW_USER && me && me.init) {
      router.replace(ROUTES.EXPLORE);
    }

    // Redirects to Explore if authenticated and user already initialized
    if (router.pathname === ROUTES.LANDING && me && me.init) {
      router.replace(ROUTES.EXPLORE);
    }
  }, [me, router, status]);
}

// Detects if unauthenticated user is in a authenticated page. If so, redirects to Landing page
export function useCloseModal(isUserBlocked: boolean, onClose: () => void) {
  const router = useRouter();
  const onCloseWhenBlocked = async () => {
    await router.replace(ROUTES.LANDING);
    onClose();
  };

  return isUserBlocked ? onCloseWhenBlocked : onClose;
}
