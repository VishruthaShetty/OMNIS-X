import { CalendarDays, Clock, CheckCircle2, AlertTriangle, Wrench, Info } from 'lucide-react';
import { studentTimetable } from '@/data/mock';
import type { HealthStatus } from '@/data/mock';
import { useStore } from '@/store/useStore';

const statusConfig: Record<HealthStatus, { color: string; bg: string; Icon: typeof CheckCircle2; label: string }> = {
  healthy: { color: 'text-status-healthy', bg: 'bg-status-healthy/15', Icon: CheckCircle2, label: 'On track' },
  attention: { color: 'text-status-attention', bg: 'bg-status-attention/15', Icon: Wrench, label: 'Changed' },
  issue: { color: 'text-status-issue', bg: 'bg-status-issue/15', Icon: AlertTriangle, label: 'Relocated' },
};

export default function StudentView() {
  const affectedCount = studentTimetable.filter((t) => t.status !== 'healthy').length;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-white">My Day</h2>
        <p className="text-sm text-slate-400">Student view — your timetable with only the changes that affect you</p>
      </div>

      {/* Alert banner */}
      {affectedCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-status-attention/30 bg-status-attention/10 p-4">
          <Info className="h-5 w-5 flex-shrink-0 text-status-attention" />
          <p className="text-sm text-slate-200">
            <span className="font-semibold text-status-attention">{affectedCount} of your sessions</span> are affected by the Block A power outage. Changes are highlighted below.
          </p>
        </div>
      )}

      {/* Timetable */}
      <div className="card-glow p-5">
        <div className="mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-accent-blue" />
          <h3 className="text-sm font-bold text-white">Today's Timetable</h3>
        </div>
        <div className="space-y-2">
          {studentTimetable.map((item, i) => {
            const sc = statusConfig[item.status];
            const SIcon = sc.Icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-lg border p-3 transition-colors ${
                  item.status === 'healthy'
                    ? 'border-navy-700/50 bg-navy-800/30'
                    : 'border-status-attention/30 bg-status-attention/5'
                }`}
              >
                <div className="flex w-28 flex-shrink-0 items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-[11px] font-medium tabular-nums text-slate-400">{item.period}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{item.subject}</p>
                  <p className="text-[11px] text-slate-400">
                    {item.room}
                    {item.change && <span className="ml-2 font-semibold text-status-attention">→ {item.change}</span>}
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

      {/* Quick info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-glow p-4">
          <h4 className="text-sm font-semibold text-white">Exam Update</h4>
          <p className="mt-1.5 text-xs text-slate-400">
            Your Sem IV internal exam has been moved to <span className="font-semibold text-white">B-301 at 11:30 AM</span>. Please arrive 10 minutes early.
          </p>
        </div>
        <div className="card-glow p-4">
          <h4 className="text-sm font-semibold text-white">Lab Update</h4>
          <p className="mt-1.5 text-xs text-slate-400">
            Your DBMS Lab session has been moved from Lab-1 to <span className="font-semibold text-white">Lab-2 (Block B)</span> at 02:00 PM.
          </p>
        </div>
      </div>
    </div>
  );
}
