import { useSession } from "next-auth/client";
import { useState } from "react";
import { DesktopSidebar } from "../DesktopSidebar";
import { MobileSidebar } from "../MobileSidebar";
import { TopBar } from "../TopBar";

const DashboardLayout: React.FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, loading] = useSession();
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="flex-1 overflow-auto focus:outline-none bg-mainContent">
        {session && !loading && <TopBar setSidebarOpen={setSidebarOpen} />}
        <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
