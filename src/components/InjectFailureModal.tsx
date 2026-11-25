import { useState } from 'react';
import { X, Zap, Target, ChevronRight, Check, AlertTriangle, TrendingUp, Scale } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { useStore } from '@/store/useStore';
import { failureTypes, failureTargets, recoveryPlans } from '@/data/mock';
import type { RecoveryPlan } from '@/data/mock';

interface SimResult {
  affectedStudents: number;
  affectedFaculty: number;
  affectedSystems: number;
  cascadeSummary: string;
}

export default function InjectFailureModal() {
  const open = useStore((s) => s.injectModalOpen);
  const setOpen = useStore((s) => s.setInjectModalOpen);
  const injectFailure = useStore((s) => s.injectFailure);
  const setActivePage = useStore((s) => s.setActivePage);
  const pushToast = useStore((s) => s.pushToast);
  const resetRecovery = useStore((s) => s.resetRecovery);

  const [step, setStep] = useState<'select' | 'result'>('select');
  const [selectedType, setSelectedType] = useState<string>('power-cut');
  const [selectedTarget, setSelectedTarget] = useState<string>('Block A');
  const [result, setResult] = useState<SimResult | null>(null);

  if (!open) return null;

  const typeLabel = failureTypes.find((t) => t.id === selectedType)?.label || '';

  const runSimulation = () => {
    // Mock cascade result based on failure type
    const baseResults: Record<string, SimResult> = {
      'faculty-absent': { affectedStudents: 180, affectedFaculty: 1, affectedSystems: 2, cascadeSummary: '1 faculty absent cascades to 3 classes and a lab session.' },
      'power-cut': { affectedStudents: 520, affectedFaculty: 18, affectedSystems: 5, cascadeSummary: 'Power loss disables classrooms, labs and exam halls in the target block.' },
      'lab-equipment': { affectedStudents: 120, affectedFaculty: 4, affectedSystems: 2, cascadeSummary: 'Equipment failure cancels practicals for 3 batches.' },
      'bus-breakdown': { affectedStudents: 60, affectedFaculty: 0, affectedSystems: 1, cascadeSummary: 'One bus offline delays route 7 students by 25 minutes.' },
      'exam-double-booked': { affectedStudents: 80, affectedFaculty: 2, affectedSystems: 2, cascadeSummary: 'Hall conflict forces exam reschedule to afternoon slot.' },
      'network-outage': { affectedStudents: 340, affectedFaculty: 12, affectedSystems: 3, cascadeSummary: 'Network down disrupts LMS, attendance and smart classrooms.' },
    };
    setResult(baseResults[selectedType] || baseResults['power-cut']);
    setStep('result');
  };

  const applyFailure = () => {
    if (!result) return;
    resetRecovery();
    injectFailure({
      type: selectedType,
      typeLabel,
      target: selectedTarget,
      affectedStudents: result.affectedStudents,
      affectedFaculty: result.affectedFaculty,
      affectedSystems: result.affectedSystems,
    });
    pushToast(`${typeLabel} injected at ${selectedTarget}`, 'warning');
    setOpen(false);
    setActivePage('cascading-simulation');
    // reset for next open
    setTimeout(() => { setStep('select'); setResult(null); }, 300);
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => { setStep('select'); setResult(null); }, 300);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
      <div className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 animate-slideUp">
        <div className="card-glow max-h-[88vh] overflow-y-auto p-6">
          {/* header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
                <Zap className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Inject Failure (What-if)</h2>
                <p className="text-xs text-slate-400">Simulate a failure and see its cascading impact</p>
              </div>
            </div>
            <button onClick={closeModal} className="rounded-md p-1.5 text-slate-400 hover:bg-navy-700/50 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {step === 'select' && (
            <div className="space-y-5">
              {/* Failure type */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Failure Type</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {failureTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t.id)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                        selectedType === t.id
                          ? 'border-amber-500/50 bg-amber-500/10 text-white'
                          : 'border-navy-700/70 bg-navy-800/40 text-slate-300 hover:border-navy-600 hover:bg-navy-800/70'
                      }`}
                    >
                      <Icon name={t.icon} className="h-4 w-4 flex-shrink-0 text-amber-400" />
                      <span className="leading-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target */}
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <Target className="h-3.5 w-3.5" /> Target
                </p>
                <div className="flex flex-wrap gap-2">
                  {failureTargets.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTarget(t)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedTarget === t
                          ? 'border-accent-blue/50 bg-accent-blue/15 text-white'
                          : 'border-navy-700/70 bg-navy-800/40 text-slate-300 hover:bg-navy-800/70'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={closeModal} className="btn-ghost">Cancel</button>
                <button onClick={runSimulation} className="btn-primary">
                  Simulate Impact <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'result' && result && (
            <div className="space-y-5">
              {/* Cascade result */}
              <div className="rounded-xl border border-status-issue/30 bg-status-issue/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-status-issue" />
                  <p className="text-sm font-bold text-white">Cascade Result: {typeLabel} at {selectedTarget}</p>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">{result.cascadeSummary}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-navy-800/50 py-2">
                    <p className="text-xl font-bold text-status-issue">{result.affectedSystems}</p>
                    <p className="text-[10px] text-slate-400">Systems</p>
                  </div>
                  <div className="rounded-lg bg-navy-800/50 py-2">
                    <p className="text-xl font-bold text-status-attention">{result.affectedStudents}</p>
                    <p className="text-[10px] text-slate-400">Students</p>
                  </div>
                  <div className="rounded-lg bg-navy-800/50 py-2">
                    <p className="text-xl font-bold text-white">{result.affectedFaculty}</p>
                    <p className="text-[10px] text-slate-400">Faculty</p>
                  </div>
                </div>
              </div>

              {/* Ranked recovery plans */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ranked Recovery Plans
                </p>
                <div className="space-y-2">
                  {recoveryPlans.map((plan) => (
                    <PlanRow key={plan.id} plan={plan} />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setStep('select')} className="btn-ghost">Back</button>
                <button onClick={applyFailure} className="btn-primary">
                  Inject &amp; View Simulation <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PlanRow({ plan }: { plan: RecoveryPlan }) {
  return (
    <div className="rounded-lg border border-navy-700/70 bg-navy-800/40 p-3 transition-colors hover:border-navy-600">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-blue/20 text-xs font-bold text-accent-blue">
            {plan.rank}
          </span>
          <p className="text-sm font-semibold text-white">{plan.title}</p>
        </div>
        {plan.rank === 1 && (
          <span className="badge bg-status-healthy/15 text-status-healthy">
            <Check className="h-3 w-3" /> Recommended
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-4 text-[11px]">
        <span className="flex items-center gap-1 text-slate-400">
          <TrendingUp className="h-3.5 w-3.5 text-status-attention" />
          <span className="font-semibold text-white">{plan.studentsAffected}</span> students affected
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          <Scale className="h-3.5 w-3.5 text-accent-blue" />
          <span className="font-semibold text-white">{plan.workloadFairness}%</span> fairness
        </span>
        <span className="flex items-center gap-1 text-slate-400">
          est. <span className="font-semibold text-white">{plan.estRestoreMin} min</span> restore
        </span>
      </div>
    </div>
  );
}
