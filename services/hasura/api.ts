import { GraphQLClient } from 'graphql-request';

import { getSdk, RefreshMutation, SdkFunctionWrapper } from './types.generated';

export type GqlMethods = ReturnType<typeof getSdk>;

const hasuraHeaders = (token?: string, userId?: string) =>
  token
    ? {
        'X-Hasura-Role': 'user',
        Authorization: `Bearer ${token}`,
        ...(userId && { 'X-Hasura-User-Id': userId }),
      }
    : undefined;

const hasuraClient = (token?: string, userId?: string) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_ENDPOINT as string, {
    headers: hasuraHeaders(token, userId),
  });

export const hasuraPublicSDK = getSdk(hasuraClient());

export const hasuraAuthSDK = (token: string, userId?: string) =>
  getSdk(hasuraClient(token, userId));

export const hasuraRefreshSDK = (
  token: string,
  refreshToken: string,
  userId: string | undefined,
  saveToken: (newTokens: RefreshMutation['refresh']) => void
) => {
  const wrapper: SdkFunctionWrapper = async (action) => {
    try {
      const res = await action();
      return res;
    } catch (e: any) {
      const isExpiredToken =
        e?.response?.errors?.[0].extensions.code === 'invalid-jwt';
      if (isExpiredToken) {
        /* Retrieves the new token */
        const newTokens = (
          await hasuraPublicSDK.refresh({
            refresh_token: refreshToken,
          })
        ).refresh;

        /* Saves the token on stored user */
        const res = await action(hasuraHeaders(userId, newTokens!.token));
        saveToken(newTokens);
        return res;
      }
      throw e;
    }
  };
  const methods = getSdk(hasuraClient(token, userId), wrapper);
  return methods;
};
