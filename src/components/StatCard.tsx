import { Icon } from '@/components/Icon';
import type { StatCardData } from '@/data/mock';

export default function StatCard({ data }: { data: StatCardData }) {
  return (
    <div
      className={`card-glow group relative overflow-hidden p-5 transition-all duration-300 hover:scale-[1.02] hover:border-navy-600`}
    >
      {/* gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-60 transition-opacity group-hover:opacity-100`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{data.label}</p>
          <p className="mt-1.5 text-3xl font-bold tabular-nums text-white">
            {data.value.toLocaleString()}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{data.sub}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-navy-800/80 shadow-glow">
          <Icon name={data.icon} className={`h-5 w-5 ${data.iconColor}`} />
        </div>
      </div>
    </div>
  );
}
