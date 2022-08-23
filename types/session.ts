import { LoginMutation, MeQuery } from './hasura.generated';

export type SessionToken = Omit<
  NonNullable<LoginMutation['login']>,
  '__typename'
>;

type Me = NonNullable<MeQuery['me']>;
export type SessionUser = Omit<Me, '__typename'>;
