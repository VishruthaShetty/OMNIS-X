import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import ToastHost from '@/components/ToastHost';
import NotificationCenter from '@/components/NotificationCenter';
import InjectFailureModal from '@/components/InjectFailureModal';
import DashboardPage from '@/pages/DashboardPage';
import CascadingSimulationPage from '@/pages/CascadingSimulationPage';
import PageShell from '@/pages/PageShell';
import FacultyView from '@/pages/FacultyView';
import StudentView from '@/pages/StudentView';
import { useStore } from '@/store/useStore';

function PageRouter() {
  const activePage = useStore((s) => s.activePage);
  const role = useStore((s) => s.role);

  // Faculty role: show faculty view on dashboard
  if (role === 'Faculty' && activePage === 'dashboard') return <FacultyView />;
  // Student role: show student view on dashboard
  if (role === 'Student' && activePage === 'dashboard') return <StudentView />;

  if (activePage === 'dashboard') return <DashboardPage />;
  if (activePage === 'cascading-simulation') return <CascadingSimulationPage />;

  // All other pages use the page shell
  return <PageShell pageId={activePage} />;
}

export default function App() {
  const activePage = useStore((s) => s.activePage);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);

  // Close mobile sidebar on page change
  useEffect(() => {
    setSidebarOpen(false);
  }, [activePage, setSidebarOpen]);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200">
      <Sidebar />
      <div className="lg:pl-60">
        <TopBar />
        <main className="p-4 lg:p-6">
          <PageRouter />
        </main>
      </div>

      {/* Overlays */}
      <NotificationCenter />
      <InjectFailureModal />
      <ToastHost />
    </div>
  );
}
