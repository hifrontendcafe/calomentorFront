import { IconType } from 'react-icons/lib';

export interface IRoute {
  name: string;
  href: string;
  icon: IconType;
}

export interface INavigationRoute {
  routes: IRoute[];
}
