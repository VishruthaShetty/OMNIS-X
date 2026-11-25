import { useEffect, useState, useRef, useMemo } from 'react';
import { Menu, Bell, ChevronDown, Zap, Check, UserCog, User, GraduationCap } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { notifications as allNotifications } from '@/data/mock';
import type { Role } from '@/data/mock';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const roleConfig: Record<Role, { icon: typeof User; label: string }> = {
  Admin: { icon: UserCog, label: 'Admin' },
  Faculty: { icon: User, label: 'Faculty' },
  Student: { icon: GraduationCap, label: 'Student' },
};

export default function TopBar() {
  const now = useClock();
  const failureActive = useStore((s) => s.failureActive);
  const failureLabel = useStore((s) => s.failureLabel);
  const setInjectModalOpen = useStore((s) => s.setInjectModalOpen);
  const setNotifOpen = useStore((s) => s.setNotifOpen);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);
  const role = useStore((s) => s.role);
  const setRole = useStore((s) => s.setRole);
  const setActivePage = useStore((s) => s.setActivePage);

  const unreadCount = useMemo(
    () => allNotifications.filter((n) => n.roles.includes(role)).length,
    [role]
  );

  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const RoleIcon = roleConfig[role].icon;

  return (
    <header className="sticky top-0 z-20 border-b border-navy-700/60 bg-navy-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-slate-400 hover:bg-navy-700/50 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="hidden h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-blue to-accent-teal shadow-glow sm:flex">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-white sm:text-base">TechNova Engineering College</h1>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              Digital Twin · Smart Campus · Resilient Institution
            </p>
          </div>
        </div>

        {/* Status pill — center */}
        <div className="ml-auto hidden items-center justify-center md:ml-4 md:flex md:flex-1">
          <div
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
              failureActive
                ? 'border-status-issue/40 bg-status-issue/10 text-status-issue'
                : 'border-status-healthy/40 bg-status-healthy/10 text-status-healthy'
            }`}
          >
            <span
              className={`relative flex h-2 w-2 ${
                failureActive ? '' : ''
              }`}
            >
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  failureActive ? 'bg-status-issue animate-pulseRing' : 'bg-status-healthy animate-softPulse'
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  failureActive ? 'bg-status-issue' : 'bg-status-healthy'
                }`}
              />
            </span>
            {failureLabel}
          </div>
        </div>

        {/* Inject failure */}
        <button
          onClick={() => setInjectModalOpen(true)}
          className="hidden items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-all hover:bg-amber-500/20 hover:shadow-glow-amber active:scale-95 sm:flex"
        >
          <Zap className="h-4 w-4" />
          Inject Failure
        </button>

        {/* Clock */}
        <div className="hidden text-right leading-tight lg:block">
          <p className="text-sm font-semibold tabular-nums text-white">{timeStr}</p>
          <p className="text-[11px] text-slate-400">{dateStr}</p>
        </div>

        {/* Bell */}
        <button
          onClick={() => setNotifOpen(true)}
          className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-navy-700/50 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-issue px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Avatar dropdown */}
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setAvatarOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-navy-700/50"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple text-xs font-bold text-white">
              {role[0]}
            </div>
            <span className="hidden text-xs font-semibold text-white sm:block">{roleConfig[role].label}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {avatarOpen && (
            <div className="absolute right-0 top-12 w-56 rounded-xl border border-navy-700/70 bg-navy-850 p-2 shadow-glow animate-slideUp">
              <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Switch Role
              </p>
              {(Object.keys(roleConfig) as Role[]).map((r) => {
                const RCfg = roleConfig[r];
                const RIcon = RCfg.icon;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setAvatarOpen(false);
                      setActivePage('dashboard');
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      role === r ? 'bg-accent-blue/15 text-white' : 'text-slate-300 hover:bg-navy-700/50'
                    }`}
                  >
                    <RIcon className="h-4 w-4" />
                    <span>{RCfg.label}</span>
                    {role === r && <Check className="ml-auto h-4 w-4 text-accent-blue" />}
                  </button>
                );
              })}
              <div className="my-1.5 h-px bg-navy-700/60" />
              <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-navy-700/50">
                <RoleIcon className="h-4 w-4" />
                <span>Profile (mock)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
