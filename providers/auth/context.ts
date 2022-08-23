/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

import { HasuraSDK } from '@/services/hasura/api';
import { SessionUser } from '@/types/session';

type Context = {
  me?: SessionUser;
  hasuraAuthSDK?: HasuraSDK;
  onOpenWalletModal: () => void;
  onSignOut: () => void;
};

export const AuthContext = createContext({
  onOpenWalletModal: () => {},
  onSignOut: () => {},
} as Context);
