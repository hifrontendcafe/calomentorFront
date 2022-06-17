import React from 'react';
import { primaryRoutes, SELF_HISTORY } from '@/config/Routes';
import NavigationRoute from '../NavigationRoute';
import PwdByVercel from '../PwdByVercel';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { isMentor } from '@/helpers/hasRole';
import { FingerPrintIcon } from '@heroicons/react/outline';

export const DesktopSidebar: React.FC = () => {
  const [session, loading] = useNextAuthSession();
  const routes =
    isMentor(session?.user?.role!) &&
    !primaryRoutes.find(route => route.name === 'Mi historial')
      ? primaryRoutes.splice(1, 0, {
          name: 'Mi historial',
          icon: FingerPrintIcon,
          href: `${SELF_HISTORY}?name=${session?.user?.name}&userId=${session?.user?.id}&isMentor=true`,
        })
      : primaryRoutes;

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
            className="flex flex-col flex-1 mt-5 overflow-y-auto"
            aria-label="Sidebar"
          >
            {!loading && <NavigationRoute routes={routes} />}
          </nav>
          <PwdByVercel />
        </div>
      </div>
    </div>
  );
};
