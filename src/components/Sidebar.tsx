import { LogOut, GraduationCap, X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { primaryNav, subsystemNav } from '@/data/mock';
import { Icon } from '@/components/Icon';

export default function Sidebar() {
  const activePage = useStore((s) => s.activePage);
  const setActivePage = useStore((s) => s.setActivePage);
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const pushToast = useStore((s) => s.pushToast);

  const handleNav = (id: string) => setActivePage(id);

  const handleLogout = () => {
    pushToast('Signed out (mock)', 'info');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-navy-700/60 bg-navy-900/95 backdrop-blur-md transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-navy-700/60 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-teal">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">TechNova</p>
            <p className="truncate text-[11px] text-slate-400">Smart Campus</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-md p-1 text-slate-400 hover:bg-navy-700/50 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav scroll area */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          <div className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Primary
            </p>
            {primaryNav.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-item w-full ${activePage === item.id ? 'nav-item-active' : ''}`}
              >
                <Icon name={item.icon} className="h-[18px] w-[18px] flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-0.5">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Subsystems
            </p>
            {subsystemNav.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-item w-full ${activePage === item.id ? 'nav-item-active' : ''}`}
              >
                <Icon name={item.icon} className="h-[18px] w-[18px] flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-navy-700/60 p-3">
          <button
            onClick={handleLogout}
            className="nav-item w-full text-status-issue hover:bg-status-issue/10 hover:text-status-issue"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
