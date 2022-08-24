import { MutableRefObject, ReactNode } from 'react';

export type MenuListItem = {
  text: string;
  href: string;
};

export type MenuProps = {
  activeMenu: string;
  menuList: MenuListItem[];
  connectButton: ReactNode;
  signUpButton: ReactNode;
};

export interface ObjectIndex {
  [key: string]: any;
}

export interface Refs extends ObjectIndex {
  hero: MutableRefObject<null>;
  professionals: MutableRefObject<null>;
  organizations: MutableRefObject<null>;
  build: MutableRefObject<null>;
  investors: MutableRefObject<null>;
}
