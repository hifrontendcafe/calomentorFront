import React, { Dispatch, Fragment } from 'react';
import { ChevronDownIcon, MenuAlt1Icon } from '@heroicons/react/outline';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useNextAuthSession } from '@/hooks/useNextAuthSession';
import { signOut } from 'next-auth/react';
import { SELF_HISTORY } from '@/config/Routes';
import Link from 'next/link';
import { isMentor } from '@/helpers/hasRole';

interface ITopBar {
  setSidebarOpen: Dispatch<boolean>;
}

export const TopBar: React.FC<ITopBar> = ({ setSidebarOpen }) => {
  const [session, loading] = useNextAuthSession();

  return (
    <div className="relative z-10 flex flex-shrink-0 h-16 border-b border-gray-200 bg-topbar lg:border-none">
      <button
        className="px-4 text-gray-400 border-r border-gray-200 focus:outline-none lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt1Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      {/* Search bar */}
      <div className="flex justify-end flex-1 px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="flex items-center ml-4 md:ml-6">
          {/* Profile dropdown */}
          <Menu as="div" className="relative ml-3">
            <div>
              {session && !loading && (
                <Menu.Button className="flex items-center max-w-xs text-sm rounded-full bg-mainContent focus:outline-none lg:p-2 lg:rounded-md lg:hover:bg-cardHeader">
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={session.user.image}
                    height="32px"
                    width="32px"
                    alt=""
                  />
                  <span className="hidden ml-3 text-sm font-medium text-gray-200 lg:block">
                    <span className="sr-only">Open user menu for </span>
                    {session.user.name}
                  </span>
                  <ChevronDownIcon
                    className="flex-shrink-0 hidden w-5 h-5 ml-1 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              )}
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-mainContent focus:outline-none">
                {/* <Link href={PROFILE} passHref>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          'block px-4 py-2 text-sm text-mainTextColor cursor-pointer active:bg-activeNavigation',
                          {
                            'bg-hoverNavigation': active,
                          },
                        )}
                      >
                        Tu perfil
                      </a>
                    )}
                  </Menu.Item>
                </Link> */}
                {isMentor(session?.user?.role!) && (
                  <Link
                    href={`${SELF_HISTORY}?name=${session?.user?.name}&userId=${session?.user?.id}&isMentor=true`}
                    passHref
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={classNames(
                            'block px-4 py-2 text-sm text-mainTextColor cursor-pointer active:bg-activeNavigation',
                            {
                              'bg-hoverNavigation': active,
                            },
                          )}
                        >
                          Mi historial
                        </a>
                      )}
                    </Menu.Item>
                  </Link>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className={classNames(
                        'block px-4 py-2 text-sm text-mainTextColor cursor-pointer active:bg-activeNavigation',
                        {
                          'bg-hoverNavigation': active,
                        },
                      )}
                    >
                      Cerrar sesión
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
