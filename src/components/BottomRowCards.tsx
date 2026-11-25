import { useState } from 'react';
import { CalendarClock, ChevronRight, Plus, Minus, MapPin, Radio } from 'lucide-react';
import { Icon } from '@/components/Icon';
import { useStore } from '@/store/useStore';
import { resourceAvailability, upcomingEvents } from '@/data/mock';

export function ResourceAvailabilityCard() {
  const setActivePage = useStore((s) => s.setActivePage);
  return (
    <div className="card-glow flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Resource Availability</h3>
        <CalendarClock className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1 space-y-3.5">
        {resourceAvailability.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300">{r.label}</span>
              <span className="font-semibold tabular-nums text-white">{r.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-navy-700/50">
              <div
                className={`h-full rounded-full ${r.color} transition-all duration-700`}
                style={{ width: `${r.percent}%` }}
              />
            </div>
            <p className="mt-0.5 text-[10px] text-slate-500">
              {r.used} / {r.total} in use
            </p>
          </div>
        ))}
      </div>
      <button onClick={() => setActivePage('resource-scheduler')} className="btn-ghost mt-4 w-full">
        View Schedule <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function UpcomingEventsCard() {
  const setActivePage = useStore((s) => s.setActivePage);
  return (
    <div className="card-glow flex flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Upcoming Events</h3>
        <CalendarClock className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex-1 space-y-2.5">
        {upcomingEvents.map((e, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-navy-800/40 p-2.5 transition-colors hover:bg-navy-800/70">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent-blue/15">
              <Icon name={e.icon} className="h-4 w-4 text-accent-blue" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{e.title}</p>
              <p className="truncate text-[11px] text-slate-400">{e.detail}</p>
            </div>
            <span className="flex-shrink-0 text-[11px] font-semibold tabular-nums text-accent-teal">{e.time}</span>
          </div>
        ))}
      </div>
      <button onClick={() => setActivePage('events')} className="btn-ghost mt-4 w-full">
        View Calendar <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CampusMapCard() {
  const failureActive = useStore((s) => s.failureActive);
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const [zoom, setZoom] = useState(1);
  const [live, setLive] = useState(true);

  const markerColor = recoveryApplied ? '#F5A524' : '#FF4D4F';
  const markerLabel = recoveryApplied ? 'Block A (Restoring)' : 'Block A (Power Failure)';

  return (
    <div className="card-glow flex flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Campus Map &amp; Systems</h3>
        <button
          onClick={() => setLive((v) => !v)}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
            live ? 'bg-status-healthy/15 text-status-healthy' : 'bg-navy-700/50 text-slate-400'
          }`}
        >
          <Radio className={`h-3 w-3 ${live ? 'animate-softPulse' : ''}`} />
          Live
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-navy-700/50 bg-navy-950/60">
        <div style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }} className="h-full w-full transition-transform duration-300">
          <svg viewBox="0 0 300 200" className="h-full w-full">
            {/* ground */}
            <rect x="0" y="0" width="300" height="200" fill="#0A1020" />
            {/* roads */}
            <rect x="0" y="90" width="300" height="14" fill="#15203F" />
            <rect x="143" y="0" width="14" height="200" fill="#15203F" />
            {/* buildings */}
            <rect x="30" y="30" width="70" height="50" rx="3" fill={recoveryApplied ? '#F5A524' : '#FF4D4F'} opacity="0.25" stroke={markerColor} strokeWidth="1.5" />
            <text x="65" y="58" textAnchor="middle" className="fill-slate-300" style={{ fontSize: 8, fontWeight: 600 }}>Block A</text>
            <rect x="185" y="30" width="80" height="50" rx="3" fill="#22D39A" opacity="0.18" stroke="#22D39A" strokeWidth="1.5" />
            <text x="225" y="58" textAnchor="middle" className="fill-slate-300" style={{ fontSize: 8, fontWeight: 600 }}>Block B</text>
            <rect x="60" y="130" width="60" height="45" rx="3" fill="#F5A524" opacity="0.18" stroke="#F5A524" strokeWidth="1.5" />
            <text x="90" y="156" textAnchor="middle" className="fill-slate-300" style={{ fontSize: 8, fontWeight: 600 }}>Block C</text>
            {/* track */}
            <ellipse cx="220" cy="150" rx="32" ry="22" fill="none" stroke="#2E4374" strokeWidth="2" />
            <text x="220" y="153" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 6 }}>Track</text>

            {/* pulsing marker on Block A */}
            {failureActive || recoveryApplied ? (
              <>
                <circle cx="65" cy="55" r="6" fill={markerColor} opacity="0.3">
                  <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="55" r="4" fill={markerColor} />
              </>
            ) : null}
          </svg>
        </div>

        {/* zoom controls */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1">
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-navy-700 bg-navy-850/90 text-slate-300 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-navy-700 bg-navy-850/90 text-slate-300 hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* marker label */}
        {(failureActive || recoveryApplied) && (
          <div className="absolute left-2 top-2 flex items-center gap-1.5 rounded-md border border-navy-700/70 bg-navy-900/90 px-2 py-1">
            <MapPin className="h-3 w-3" style={{ color: markerColor }} />
            <span className="text-[10px] font-medium text-slate-300">{markerLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
