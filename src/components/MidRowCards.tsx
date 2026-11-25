import { Zap, ChevronRight, LifeBuoy, ClipboardList, Workflow, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { failureDetection, cascadeSummary, recommendedActions } from '@/data/mock';

export function FailureDetectionCard() {
  const setActivePage = useStore((s) => s.setActivePage);
  return (
    <div className="card-glow flex flex-col p-5 transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-status-issue/15">
            <Zap className="h-4 w-4 text-status-issue" />
          </div>
          <h3 className="text-sm font-bold text-white">Failure Detection</h3>
        </div>
        <span className="badge bg-status-issue/15 text-status-issue">{failureDetection.severity}</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-white">{failureDetection.title}</p>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-slate-400">{failureDetection.description}</p>
      <p className="mt-2 text-[11px] text-slate-500">
        Detected at {failureDetection.detectedAt} · Sensor {failureDetection.sensor}
      </p>
      <button
        onClick={() => setActivePage('cascading-simulation')}
        className="btn-primary mt-3 w-full"
      >
        View Impact <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CascadingImpactCard() {
  const setActivePage = useStore((s) => s.setActivePage);
  return (
    <div className="card-glow flex flex-col p-5 transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
            <Workflow className="h-4 w-4 text-amber-400" />
          </div>
          <h3 className="text-sm font-bold text-white">Cascading Impact Analysis</h3>
        </div>
      </div>

      {/* Mini node graph */}
      <div className="my-3 flex h-20 items-center justify-center">
        <svg viewBox="0 0 200 80" className="h-full w-full">
          {/* edges */}
          <line x1="100" y1="40" x2="40" y2="15" stroke="#FF4D4F" strokeWidth="1.5" opacity="0.5" />
          <line x1="100" y1="40" x2="160" y2="15" stroke="#F5A524" strokeWidth="1.5" opacity="0.5" />
          <line x1="100" y1="40" x2="40" y2="65" stroke="#F5A524" strokeWidth="1.5" opacity="0.5" />
          <line x1="100" y1="40" x2="160" y2="65" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
          {/* center */}
          <circle cx="100" cy="40" r="10" fill="#FF4D4F" />
          <text x="100" y="43" textAnchor="middle" className="fill-white" style={{ fontSize: 7, fontWeight: 700 }}>
            FAIL
          </text>
          {/* outer nodes */}
          <circle cx="40" cy="15" r="7" fill="#F5A524" />
          <circle cx="160" cy="15" r="7" fill="#F5A524" />
          <circle cx="40" cy="65" r="7" fill="#3B82F6" />
          <circle cx="160" cy="65" r="7" fill="#22D39A" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-navy-800/50 py-2">
          <p className="text-lg font-bold text-white">{cascadeSummary.affectedSystems}</p>
          <p className="text-[10px] text-slate-400">Systems</p>
        </div>
        <div className="rounded-lg bg-navy-800/50 py-2">
          <p className="text-lg font-bold text-status-attention">{cascadeSummary.affectedStudents}</p>
          <p className="text-[10px] text-slate-400">Students</p>
        </div>
        <div className="rounded-lg bg-navy-800/50 py-2">
          <p className="text-lg font-bold text-white">{cascadeSummary.affectedFaculty}</p>
          <p className="text-[10px] text-slate-400">Faculty</p>
        </div>
      </div>
      <button
        onClick={() => setActivePage('cascading-simulation')}
        className="btn-ghost mt-3 w-full"
      >
        View Details <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function RecoveryPlannerCard() {
  const approvePlan = useStore((s) => s.approvePlan);
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const setActivePage = useStore((s) => s.setActivePage);

  return (
    <div className="card-glow flex flex-col p-5 transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-status-healthy/15">
            <LifeBuoy className="h-4 w-4 text-status-healthy" />
          </div>
          <h3 className="text-sm font-bold text-white">Recovery Planner</h3>
        </div>
        <ClipboardList className="h-4 w-4 text-slate-500" />
      </div>

      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Recommended Actions</p>
      <ol className="mt-2 flex-1 space-y-2">
        {recommendedActions.map((action, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-blue/20 text-[11px] font-bold text-accent-blue">
              {i + 1}
            </span>
            <span className="text-xs text-slate-200">{action}</span>
          </li>
        ))}
      </ol>

      {recoveryApplied ? (
        <div className="mt-3 rounded-lg border border-status-healthy/30 bg-status-healthy/10 p-2.5 text-center">
          <p className="text-xs font-semibold text-status-healthy">Plan approved — restoring service</p>
          <button onClick={() => setActivePage('recovery-planner')} className="mt-1 text-[11px] text-status-healthy/80 hover:text-status-healthy">
            View details
          </button>
        </div>
      ) : (
        <button onClick={approvePlan} className="btn-success mt-3 w-full">
          Approve Plan
        </button>
      )}
    </div>
  );
}
