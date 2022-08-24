import { LoginMutation, MeQuery } from './hasura.generated';

export type SessionToken = LoginMutation['login'];

export type SessionUser = MeQuery['me'];
