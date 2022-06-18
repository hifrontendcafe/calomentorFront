import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { DesktopSidebar } from '../DesktopSidebar';
import { MobileSidebar } from '../MobileSidebar';
import { TopBar } from '../TopBar';
import styles from './styles.module.css';

interface IDashboardLayout {
  subtitle?: string;
  children: ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({
  subtitle,
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-mainContent">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSidebar />
      <div className="flex-1">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <header className="py-5 px-14 flex flex-col">
          {subtitle && <h3 className="text-xl text-white mt-4">{subtitle}</h3>}
        </header>
        <main
          className={classNames(
            'max-w-xs sm:max-w-none relative z-0 flex-1 px-5 pb-5 bg-mainContent overflow-y-auto',
            styles.mainHeight,
          )}
        >
          <div className="px-4 pb-6 mx-auto sm:px-6 lg:pb-16 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
