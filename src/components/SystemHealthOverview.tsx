import { CheckCircle2, Wrench, AlertTriangle, ChevronRight, Bell } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { systemHealthChecks, activeAlerts } from '@/data/mock';
import type { HealthStatus } from '@/data/mock';

const statusIcon: Record<HealthStatus, typeof CheckCircle2> = {
  healthy: CheckCircle2,
  attention: Wrench,
  issue: AlertTriangle,
};

const statusColor: Record<HealthStatus, string> = {
  healthy: 'text-status-healthy',
  attention: 'text-status-attention',
  issue: 'text-status-issue',
};

export function HealthRing({ percent }: { percent: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const color = percent >= 95 ? '#22D39A' : percent >= 85 ? '#F5A524' : '#FF4D4F';

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#1B2A4E" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out, stroke 0.6s' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums text-white">{percent}%</span>
        <span className="text-[11px] font-medium text-slate-400">Healthy</span>
      </div>
    </div>
  );
}

export default function SystemHealthOverview() {
  const healthPercent = useStore((s) => s.healthPercent);
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const failureActive = useStore((s) => s.failureActive);

  // After recovery, infrastructure flips to healthy
  const checks = systemHealthChecks.map((c) =>
    recoveryApplied && c.name === 'Infrastructure' ? { ...c, status: 'healthy' as const } : c
  );

  const alerts = failureActive ? activeAlerts : [];

  return (
    <div className="card-glow flex flex-col p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">System Health Overview</h3>
        <span className="badge bg-status-healthy/15 text-status-healthy">Live</span>
      </div>

      <div className="flex flex-col items-center gap-4 py-2">
        <HealthRing percent={healthPercent} />
        <div className="w-full space-y-1.5">
          {checks.map((c) => {
            const SIcon = statusIcon[c.status];
            return (
              <div key={c.name} className="flex items-center justify-between rounded-lg bg-navy-800/40 px-3 py-1.5">
                <span className="text-xs font-medium text-slate-300">{c.name}</span>
                <div className="flex items-center gap-1.5">
                  <SIcon className={`h-4 w-4 ${statusColor[c.status]}`} />
                  <span className={`text-xs font-semibold ${statusColor[c.status]}`}>
                    {c.status === 'healthy' ? 'OK' : c.status === 'attention' ? 'Check' : 'Down'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mt-4 rounded-lg border border-status-issue/30 bg-status-issue/5 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-status-issue animate-softPulse" />
            <span className="text-xs font-bold text-status-issue">Active Alerts</span>
          </div>
          <button className="text-[11px] font-semibold text-status-issue/80 hover:text-status-issue">
            View All <ChevronRight className="inline h-3 w-3" />
          </button>
        </div>
        {alerts.length === 0 ? (
          <p className="py-1.5 text-center text-xs text-status-healthy">No active alerts — all clear.</p>
        ) : (
          alerts.map((a) => (
            <div key={a.id} className="rounded-md bg-status-issue/10 p-2.5">
              <p className="text-xs font-semibold text-white">{a.title}</p>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Since {a.since} · Severity: <span className="text-status-issue font-semibold">{a.severity}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
