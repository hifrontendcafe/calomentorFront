import React, { ComponentType } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import classNames from 'classnames';

interface IRoute {
  name: string;
  href: string;
  icon: ComponentType<{ className: string }>;
}

interface INavigationRoute {
  routes: IRoute[];
}

const NavigationRoute: React.FC<INavigationRoute> = ({ routes }) => {
  const router = useRouter();
  return (
    <div className="px-2 space-y-1">
      {routes.map(item => (
        <Link key={item.name} href={item.href}>
          <a
            className={classNames(
              'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
              {
                'bg-activeNavigation active:bg-hoverNavigation text-white':
                  router.pathname.includes(item.href),
                'text-primary  hover:bg-hoverNavigation active:bg-activeNavigation':
                  !router.pathname.includes(item.href),
              },
            )}
          >
            <item.icon
              className="flex-shrink-0 w-6 h-6 mr-4 text-teal-200"
              aria-hidden="true"
            />
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default NavigationRoute;
