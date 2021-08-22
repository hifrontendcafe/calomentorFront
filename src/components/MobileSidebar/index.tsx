import React, { Dispatch } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { primaryRoutes, secondaryNavigation } from "../../config/Routes";

interface IMobileSidebar {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<boolean>;
}
export const MobileSidebar: React.FC<IMobileSidebar> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
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
            </div>
            <nav
              className="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-teal-800"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {primaryRoutes.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      item.current
                        ? "bg-teal-800 text-gray-200"
                        : "text-teal-100 hover:text-gray-200 hover:bg-teal-600"
                    }`}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className="flex-shrink-0 w-6 h-6 mr-4 text-teal-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-6 mt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-2 py-2 text-base font-medium text-teal-100 rounded-md group hover:text-gray-200 hover:bg-teal-600"
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-teal-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};
