import { useState } from 'react';
import { CheckCircle2, Wrench, AlertTriangle, X, Box, ChevronDown, Power, Radio } from 'lucide-react';
import { TwinCanvas } from '@/components/Icon';
import DigitalTwinSVG from '@/components/DigitalTwinSVG';
import { buildings } from '@/data/mock';
import type { BuildingData, HealthStatus } from '@/data/mock';
import { useStore } from '@/store/useStore';

const statusColor: Record<HealthStatus, string> = {
  healthy: '#22D39A',
  attention: '#F5A524',
  issue: '#FF4D4F',
};

const statusIcon: Record<HealthStatus, typeof CheckCircle2> = {
  healthy: CheckCircle2,
  attention: Wrench,
  issue: AlertTriangle,
};

const statusLabel: Record<HealthStatus, string> = {
  healthy: 'Operational',
  attention: 'Attention',
  issue: 'Issue',
};

function BuildingPanel({ building, onClose }: { building: BuildingData; onClose: () => void }) {
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const effectiveStatus = recoveryApplied && building.id === 'block-a' ? 'attention' : building.status;

  return (
    <div className="absolute right-3 top-3 z-10 w-64 max-w-[80%] rounded-xl border border-navy-700/70 bg-navy-900/95 p-4 shadow-glow backdrop-blur-md animate-slideInRight">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-bold text-white">{building.name}</h4>
          <div className="mt-1 flex items-center gap-1.5">
            {(() => {
              const SIcon = statusIcon[effectiveStatus];
              const c = statusColor[effectiveStatus];
              return (
                <>
                  <SIcon className="h-3.5 w-3.5" style={{ color: c }} />
                  <span className="text-[11px] font-semibold" style={{ color: c }}>{statusLabel[effectiveStatus]}</span>
                </>
              );
            })()}
          </div>
        </div>
        <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-navy-700/50 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {/* power status */}
        <div className="rounded-lg bg-navy-800/50 p-2.5">
          <div className="flex items-center gap-2">
            <Power className="h-3.5 w-3.5 text-accent-blue" />
            <span className="text-[11px] font-semibold text-slate-300">Power Status</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{building.powerStatus}</p>
        </div>

        {/* rooms */}
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Rooms ({building.rooms.length})
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {building.rooms.map((r) => {
              const c = statusColor[r.status];
              return (
                <div key={r.name} className="flex items-center justify-between rounded-md bg-navy-800/40 px-2 py-1">
                  <span className="text-[11px] font-medium text-slate-300">{r.name}</span>
                  <span className="text-[10px] capitalize text-slate-500">{r.type}</span>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                </div>
              );
            })}
          </div>
        </div>

        {/* subsystems */}
        <div>
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Subsystems</p>
          <div className="flex flex-wrap gap-1.5">
            {building.subsystems.map((s) => (
              <span key={s} className="badge bg-accent-blue/15 text-accent-blue">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DigitalTwinCard() {
  const selectedId = useStore((s) => s.selectedBuildingId);
  const setSelectedId = useStore((s) => s.setSelectedBuildingId);
  const [view, setView] = useState<'3D View' | 'Top View' | 'Floor Plan'>('3D View');
  const [viewOpen, setViewOpen] = useState(false);

  const selectedBuilding = buildings.find((b) => b.id === selectedId) || null;

  return (
    <div className="card-glow flex flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="h-5 w-5 text-accent-blue" />
          <h3 className="text-sm font-bold text-white">Campus Digital Twin – Live View</h3>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-status-healthy">
            <Radio className="h-3 w-3 animate-softPulse" /> streaming
          </span>
        </div>

        {/* View dropdown */}
        <div className="relative">
          <button
            onClick={() => setViewOpen((v) => !v)}
            className="btn-ghost py-1.5 text-xs"
          >
            {view} <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {viewOpen && (
            <div className="absolute right-0 top-9 z-20 w-32 rounded-lg border border-navy-700/70 bg-navy-850 p-1 shadow-glow animate-slideUp">
              {(['3D View', 'Top View', 'Floor Plan'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => { setView(v); setViewOpen(false); }}
                  className={`flex w-full items-center rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                    view === v ? 'bg-accent-blue/15 text-white' : 'text-slate-300 hover:bg-navy-700/50'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative h-[340px] overflow-hidden rounded-xl border border-navy-700/50 bg-gradient-to-b from-navy-950 to-navy-900">
        {view === '3D View' ? (
          <TwinCanvas onBuildingClick={(id) => setSelectedId(id)} selectedId={selectedId} />
        ) : (
          <DigitalTwinSVG onBuildingClick={(id) => setSelectedId(id)} selectedId={selectedId} />
        )}

        {/* Building panel */}
        {selectedBuilding && (
          <BuildingPanel building={selectedBuilding} onClose={() => setSelectedId(null)} />
        )}

        {/* Legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg border border-navy-700/70 bg-navy-900/80 px-3 py-1.5 backdrop-blur-md">
          {(['healthy', 'attention', 'issue'] as HealthStatus[]).map((s) => {
            const SIcon = statusIcon[s];
            return (
              <div key={s} className="flex items-center gap-1.5">
                <SIcon className="h-3.5 w-3.5" style={{ color: statusColor[s] }} />
                <span className="text-[10px] font-medium text-slate-300">{statusLabel[s]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-500">
        {view === '3D View'
          ? 'Drag to rotate · scroll to zoom · click a building to inspect'
          : 'Click a building to inspect rooms, labs and subsystems'}
      </p>
    </div>
  );
}
