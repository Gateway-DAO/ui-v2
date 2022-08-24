/* eslint-disable @typescript-eslint/ban-types */
import type { NextPage as NextPageBase } from 'next';

export type AuthPageComponent = {
  auth?: boolean;
};

export type NextPage<P = {}, IP = P> = NextPageBase<P, IP> & AuthPageComponent;
