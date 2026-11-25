import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ToastHost() {
  const toasts = useStore((s) => s.toasts);
  const dismiss = useStore((s) => s.dismissToast);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5">
      {toasts.map((t) => {
        const tone =
          t.tone === 'success'
            ? { icon: CheckCircle2, ring: 'border-status-healthy/40', bg: 'bg-status-healthy/10', text: 'text-status-healthy' }
            : t.tone === 'warning'
            ? { icon: AlertTriangle, ring: 'border-status-attention/40', bg: 'bg-status-attention/10', text: 'text-status-attention' }
            : { icon: Info, ring: 'border-accent-blue/40', bg: 'bg-accent-blue/10', text: 'text-accent-blue' };
        const TIcon = tone.icon;
        return (
          <div
            key={t.id}
            className={`flex items-center gap-3 rounded-lg border ${tone.ring} ${tone.bg} px-4 py-3 shadow-glow backdrop-blur-md animate-slideInRight`}
          >
            <TIcon className={`h-5 w-5 ${tone.text}`} />
            <span className="text-sm font-medium text-white">{t.message}</span>
            <button onClick={() => dismiss(t.id)} className="ml-2 text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
