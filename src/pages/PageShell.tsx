import { Icon } from '@/components/Icon';
import { subsystemPageContent } from '@/data/mock';
import type { HealthStatus } from '@/data/mock';
import { useStore } from '@/store/useStore';
import { CheckCircle2, Wrench, AlertTriangle } from 'lucide-react';

const toneConfig: Record<HealthStatus, { color: string; bg: string; Icon: typeof CheckCircle2 }> = {
  healthy: { color: 'text-status-healthy', bg: 'bg-status-healthy/15', Icon: CheckCircle2 },
  attention: { color: 'text-status-attention', bg: 'bg-status-attention/15', Icon: Wrench },
  issue: { color: 'text-status-issue', bg: 'bg-status-issue/15', Icon: AlertTriangle },
};

export default function PageShell({ pageId }: { pageId: string }) {
  const content = subsystemPageContent[pageId];
  const setActivePage = useStore((s) => s.setActivePage);

  if (!content) {
    return (
      <div className="card-glow p-10 text-center">
        <p className="text-sm text-slate-400">Page not found.</p>
        <button onClick={() => setActivePage('dashboard')} className="btn-primary mt-4">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-white">{content.title}</h2>
        <p className="text-sm text-slate-400">{content.subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {content.cards.map((c, i) => {
          const tc = toneConfig[c.tone];
          const TIcon = tc.Icon;
          return (
            <div key={i} className="card-glow p-5 transition-transform hover:scale-[1.02]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{c.title}</p>
                  <p className="mt-1.5 text-2xl font-bold text-white">{c.value}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{c.detail}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tc.bg}`}>
                  <Icon name={c.icon} className={`h-5 w-5 ${tc.color}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <TIcon className={`h-3.5 w-3.5 ${tc.color}`} />
                <span className={`text-[11px] font-semibold ${tc.color}`}>
                  {c.tone === 'healthy' ? 'Operational' : c.tone === 'attention' ? 'Attention' : 'Issue'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card-glow p-6">
        <p className="text-sm text-slate-400">
          This is a prototype page for the <span className="font-semibold text-white">{content.title}</span> subsystem.
          Detailed management views will appear here in the full application.
        </p>
        <button onClick={() => setActivePage('dashboard')} className="btn-ghost mt-4">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
