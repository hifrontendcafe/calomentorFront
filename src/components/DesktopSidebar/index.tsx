import React from 'react';
import { adminNavigation, primaryRoutes } from '@/config/Routes';
import { useSession } from 'next-auth/client';
import NavigationRoute from '../NavigationRoute';
import PwdByVercel from '../PwdByVercel';

export const DesktopSidebar: React.FC = () => {
  const [session, loading] = useSession();
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-sidebar">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-3xl font-semibold text-white">
              🔥 Calomentor
            </span>
          </div>
          <span className="text-sm font-bold text-center text-red-500">
            {process.env.NEXT_PUBLIC_CALOMENTOR_VERSION}
          </span>
          <nav
            className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-dividerColor"
            aria-label="Sidebar"
          >
            <NavigationRoute routes={primaryRoutes} />
            {!loading &&
              (session?.user.role === '0' || session?.user.role === '2') && (
                <div className="pt-6 mt-6">
                  <NavigationRoute routes={adminNavigation} />
                </div>
              )}
          </nav>
          <PwdByVercel />
        </div>
      </div>
    </div>
  );
};
