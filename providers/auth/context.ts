/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';

import { PartialDeep } from 'type-fest';

import { HasuraSDK } from '@/services/hasura/api';
import { SessionUser } from '@/types/session';

type Context = {
  me?: SessionUser;
  hasuraAuthSDK?: HasuraSDK;
  onOpenWalletModal: () => void;
  onSignOut: () => void;
  onUpdateMe: (
    cb: (me: PartialDeep<SessionUser>) => PartialDeep<SessionUser>
  ) => void;
};

export const AuthContext = createContext({
  onOpenWalletModal: () => {},
  onSignOut: () => {},
  onUpdateMe: () => {},
} as Context);

export const useAuth = () => useContext(AuthContext);
