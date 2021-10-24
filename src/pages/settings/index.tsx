import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { settingsNavigation } from "@/config/Routes";
import CustomHead from "@/components/CustomHead";

interface ISettingsSchedulePage {
  title: string;
  description: string;
  component?: React.ReactNode;
}

const SettingsSchedulePage: React.FC<ISettingsSchedulePage> = ({
  children,
  title,
  description,
  component,
}) => {
  const router = useRouter();
  return (
    <>
      <CustomHead title="Configuración" />
      <DashboardLayout title="Configuración">
        <div className="overflow-hidden rounded-lg shadow bg-cardContent">
          <div className="divide-y divide-dividerColor lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {settingsNavigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={`group border-l-4 px-3 py-2 flex items-center text-sm font-medium ${
                        router.pathname === item.href
                          ? "bg-activeNavigation border-teal-500 text-mainTextColor hover:text-hoverNavigationText"
                          : "border-transparent text-mainTextColor hover:bg-hoverNavigation hover:text-hoverNavigationText"
                      }
                      `}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-mainTextColor`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </a>
                  </Link>
                ))}
              </nav>
            </aside>
            <div className="px-4 py-6 sm:p-6 lg:pb-8 lg:col-span-9">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium leading-6 text-mainTextColor">
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">{description}</p>
                </div>
                {component}
              </div>
              {children}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsSchedulePage;
