import { ReactNode, useState } from "react";
import { DesktopSidebar } from "../DesktopSidebar";
import { MobileSidebar } from "../MobileSidebar";
import { TopBar } from "../TopBar";
import styles from "./styles.module.css";

interface IDashboardLayout {
  title: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-mainContent">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="flex-1">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <header className="px-5 pt-5">
          <h2 className="text-2xl font-bold leading-7 text-mainTextColor sm:text-3xl sm:truncate">
            {title}
          </h2>
        </header>
        <main
          className={`relative z-0 flex-1 p-5 overflow-y-auto bg-mainContent ${styles.mainHeight}`}
        >
          <div className="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6 lg:pb-16 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
