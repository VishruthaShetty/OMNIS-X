import { CalendarDays, ArrowLeftRight, Clock, UserMinus, CheckCircle2, AlertTriangle, Wrench } from 'lucide-react';
import { facultySchedule, substitutionRequests } from '@/data/mock';
import type { HealthStatus } from '@/data/mock';
import { useStore } from '@/store/useStore';

const statusConfig: Record<HealthStatus, { color: string; bg: string; Icon: typeof CheckCircle2; label: string }> = {
  healthy: { color: 'text-status-healthy', bg: 'bg-status-healthy/15', Icon: CheckCircle2, label: 'On track' },
  attention: { color: 'text-status-attention', bg: 'bg-status-attention/15', Icon: Wrench, label: 'Changed' },
  issue: { color: 'text-status-issue', bg: 'bg-status-issue/15', Icon: AlertTriangle, label: 'Relocated' },
};

export default function FacultyView() {
  const pushToast = useStore((s) => s.pushToast);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-white">My Schedule &amp; Substitutions</h2>
        <p className="text-sm text-slate-400">Faculty view — your sessions today and pending substitution requests</p>
      </div>

      {/* Today's schedule */}
      <div className="card-glow p-5">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent-blue" />
          <h3 className="text-sm font-bold text-white">Today's Schedule</h3>
          <span className="ml-auto badge bg-status-attention/15 text-status-attention">2 sessions relocated</span>
        </div>
        <div className="space-y-2">
          {facultySchedule.map((item, i) => {
            const sc = statusConfig[item.status];
            const SIcon = sc.Icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-lg border border-navy-700/50 bg-navy-800/40 p-3 transition-colors hover:bg-navy-800/70`}
              >
                <div className="flex w-28 flex-shrink-0 items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[11px] font-medium tabular-nums text-slate-400">{item.period}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.subject}</p>
                  <p className="text-[11px] text-slate-400">
                    {item.room}
                    {item.note && <span className="ml-2 text-status-attention">→ {item.note}</span>}
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${sc.bg}`}>
                  <SIcon className={`h-3.5 w-3.5 ${sc.color}`} />
                  <span className={`text-[11px] font-semibold ${sc.color}`}>{sc.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Substitution requests */}
      <div className="card-glow p-5">
        <div className="mb-4 flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Substitution Requests</h3>
          <span className="ml-auto badge bg-amber-500/15 text-amber-400">{substitutionRequests.length} pending</span>
        </div>
        <div className="space-y-2">
          {substitutionRequests.map((req) => (
            <div key={req.id} className="flex items-center gap-3 rounded-lg bg-navy-800/40 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                <UserMinus className="h-4 w-4 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{req.subject}</p>
                <p className="text-[11px] text-slate-400">{req.faculty} · {req.reason}</p>
              </div>
              <button
                onClick={() => pushToast('Substitution accepted (mock)', 'success')}
                className="btn-success py-1.5 text-xs"
              >
                Accept
              </button>
              <button
                onClick={() => pushToast('Substitution declined (mock)', 'info')}
                className="btn-ghost py-1.5 text-xs"
              >
                Decline
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
