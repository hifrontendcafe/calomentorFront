import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { DesktopSidebar } from '../DesktopSidebar';
import { MobileSidebar } from '../MobileSidebar';
import { TopBar } from '../TopBar';
import styles from './styles.module.css';

interface IDashboardLayout {
  title: string;
  subtitle?: string;
  children: ReactNode;
  endEnhancer?: ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({
  title,
  subtitle,
  children,
  endEnhancer,
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
          <div className="justify-between flex">
            <h2 className="text-2xl font-bold leading-7 text-mainTextColor sm:text-3xl sm:truncate">
              {title}
            </h2>
            {endEnhancer}
          </div>
          {subtitle && <h3 className="text-xl text-white sm:truncate mt-4">{subtitle}</h3>}
        </header>
        <main
          className={classNames(
            'relative z-0 flex-1 px-5 pb-5 bg-mainContent overflow-y-auto',
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
