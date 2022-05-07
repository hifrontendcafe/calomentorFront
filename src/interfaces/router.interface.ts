import { ReactNode } from 'react';

export interface IRoute {
  name: string;
  href: string;
  icon: ReactNode;
}

export interface INavigationRoute {
  routes: IRoute[];
}
