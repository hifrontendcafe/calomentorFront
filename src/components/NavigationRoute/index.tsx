import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import classNames from 'classnames';
import { INavigationRoute } from '@/interfaces/router.interface';

const NavigationRoute: React.FC<INavigationRoute> = ({ routes }) => {
  const router = useRouter();
  return (
    <div className="px-2 space-y-1">
      {routes.map(item => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
            {
              'bg-activeNavigation active:bg-hoverNavigation text-white':
                router.pathname.includes(item.href),
              'text-mainTextColor  hover:bg-hoverNavigation active:bg-activeNavigation':
                !router.pathname.includes(item.href),
            },
          )}
        >
          {/*  @ts-ignore */}
          <item.icon
            className="flex-shrink-0 w-6 h-6 mr-4 text-teal-200"
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationRoute;
