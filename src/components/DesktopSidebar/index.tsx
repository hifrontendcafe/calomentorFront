import React from "react";
import Link from "next/link";
import { primaryRoutes, secondaryNavigation } from "@/config/Routes";
import { useRouter } from "next/dist/client/router";

interface IDesktopSidebar {}

export const DesktopSidebar: React.FC<IDesktopSidebar> = () => {
  const router = useRouter();
  return (
    // Static sidebar for desktop
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-sidebar">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-3xl font-semibold text-white">
              🔥 Calomentor
            </span>
          </div>
          <nav
            className="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-dividerColor"
            aria-label="Sidebar"
          >
            <div className="px-2 space-y-1">
              {primaryRoutes.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md ${
                      router.pathname === item.href
                        ? "bg-activeNavigation text-mainTextColor active:bg-hoverNavigation"
                        : "text-mainTextColor hover:text-white hover:bg-hoverNavigation active:bg-activeNavigation"
                    }`}
                    aria-current={item.current ? "page" : undefined}
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
            <div className="pt-6 mt-6">
              <div className="px-2 space-y-1">
                {secondaryNavigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={`group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md ${
                        router.pathname.includes("settings")
                          ? "bg-activeNavigation text-mainTextColor active:bg-hoverNavigation"
                          : "text-mainTextColor hover:text-white hover:bg-hoverNavigation active:bg-activeNavigation"
                      }`}
                    >
                      <item.icon
                        className="w-6 h-6 mr-4 text-teal-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
