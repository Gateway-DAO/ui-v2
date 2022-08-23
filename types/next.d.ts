/* eslint-disable @typescript-eslint/ban-types */

type ExtendComponentProps = {
  auth?: boolean;
};

declare module 'next' {
  export interface NextPage<P = {}, IP = P>
    extends NextPage<P, IP>,
      ExtendComponentProps {}
}

// declare module 'next/app' {
//   export interface AppProps<P = {}> extends AppProps<P>, ExtendComponentProps {}
// }
