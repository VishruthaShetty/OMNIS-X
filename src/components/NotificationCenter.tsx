import { X, Bell, AlertOctagon, AlertCircle, Info } from 'lucide-react';
import { useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { notifications as allNotifications } from '@/data/mock';
import type { NotificationPriority } from '@/data/mock';

const priorityConfig: Record<NotificationPriority, { icon: typeof Info; color: string; bg: string; ring: string }> = {
  Urgent: { icon: AlertOctagon, color: 'text-status-issue', bg: 'bg-status-issue/10', ring: 'border-status-issue/30' },
  Important: { icon: AlertCircle, color: 'text-status-attention', bg: 'bg-status-attention/10', ring: 'border-status-attention/30' },
  FYI: { icon: Info, color: 'text-accent-blue', bg: 'bg-accent-blue/10', ring: 'border-accent-blue/30' },
};

export default function NotificationCenter() {
  const open = useStore((s) => s.notifOpen);
  const setOpen = useStore((s) => s.setNotifOpen);
  const role = useStore((s) => s.role);
  const notifs = useMemo(
    () => allNotifications.filter((n) => n.roles.includes(role)),
    [role]
  );

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-navy-700/70 bg-navy-900 shadow-glow transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-navy-700/60 px-5 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent-blue" />
            <h3 className="text-sm font-bold text-white">Notifications</h3>
            <span className="badge bg-accent-blue/15 text-accent-blue">{notifs.length}</span>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-md p-1 text-slate-400 hover:bg-navy-700/50 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
          {notifs.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-slate-500">
              <Bell className="mb-3 h-10 w-10 opacity-40" />
              <p className="text-sm">No notifications for your role</p>
            </div>
          )}
          {notifs.map((n) => {
            const cfg = priorityConfig[n.priority];
            const PIcon = cfg.icon;
            return (
              <div
                key={n.id}
                className={`rounded-lg border ${cfg.ring} ${cfg.bg} p-3.5 transition-transform hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-3">
                  <PIcon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${cfg.color}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold text-white">{n.title}</p>
                      <span className={`badge ${cfg.bg} ${cfg.color} flex-shrink-0`}>{n.priority}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{n.body}</p>
                    <p className="mt-1.5 text-[11px] text-slate-500">{n.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
