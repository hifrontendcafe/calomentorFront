import React, { Dispatch } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { adminNavigation, primaryRoutes } from '@/config/Routes';
import NavigationRoute from '../NavigationRoute';
import PwdByVercel from '../PwdByVercel';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';

interface IMobileSidebar {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<boolean>;
}
export const MobileSidebar: React.FC<IMobileSidebar> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [session, loading] = useNextAuthSession();
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-40 flex lg:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-sidebar">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="w-6 h-6 text-gray-200" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-3xl font-semibold text-gray-200">
                🔥 Calomentor
              </span>
              <span className="text-sm font-bold text-center text-red-500">
                {process.env.NEXT_PUBLIC_CALOMENTOR_VERSION}
              </span>
            </div>
            <nav
              className="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-dividerColor"
              aria-label="Sidebar"
            >
              {!loading &&
              (session?.user.role === '0' || session?.user.role === '2') ? (
                <NavigationRoute routes={adminNavigation} />
              ) : (
                <NavigationRoute routes={primaryRoutes} />
              )}
            </nav>
            <PwdByVercel />
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};
