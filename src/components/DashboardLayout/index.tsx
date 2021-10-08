import { useState } from "react";
import { DesktopSidebar } from "../DesktopSidebar";
import { MobileSidebar } from "../MobileSidebar";
import { TopBar } from "../TopBar";
import styles from "./styles.module.css";

const DashboardLayout: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-mainContent">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="flex-1 ">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <main
          className={`relative z-0 flex-1 py-5 overflow-y-auto bg-mainContent ${styles.mainHeight}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
