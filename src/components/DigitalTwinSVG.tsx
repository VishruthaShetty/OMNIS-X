import { CheckCircle2, Wrench, AlertTriangle } from 'lucide-react';
import { buildings } from '@/data/mock';
import type { BuildingData } from '@/data/mock';
import { useStore } from '@/store/useStore';

const statusColor: Record<string, string> = {
  healthy: '#22D39A',
  attention: '#F5A524',
  issue: '#FF4D4F',
};

const statusIcon: Record<string, typeof CheckCircle2> = {
  healthy: CheckCircle2,
  attention: Wrench,
  issue: AlertTriangle,
};

function IsoBuilding({ data, selected, onClick }: { data: BuildingData; selected: boolean; onClick: () => void }) {
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const effectiveStatus = recoveryApplied && data.id === 'block-a' ? 'attention' : data.status;
  const color = statusColor[effectiveStatus];
  const SIcon = statusIcon[effectiveStatus];

  // Map 3D position to isometric 2D
  const cx = 200 + data.position[0] * 28;
  const cy = 180 + data.position[2] * 28;
  const [w, h] = data.size;
  const sw = w * 26;
  const sh = h * 28;

  return (
    <g onClick={onClick} className="cursor-pointer" style={{ outline: 'none' }}>
      {/* base shadow */}
      <ellipse cx={cx} cy={cy + 8} rx={sw / 2 + 4} ry={8} fill="#000" opacity="0.3" />
      {/* left face */}
      <polygon
        points={`${cx - sw / 2},${cy} ${cx - sw / 2},${cy - sh} ${cx - sw / 2 + 14},${cy - sh - 10} ${cx - sw / 2 + 14},${cy - 10}`}
        fill="#15203F"
      />
      {/* front face */}
      <rect x={cx - sw / 2} y={cy - sh} width={sw} height={sh} fill="#1B2A4E" stroke={color} strokeWidth={selected ? 2.5 : 1.5} />
      {/* windows */}
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 3 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={cx - sw / 2 + 6 + c * (sw / 3)}
            y={cy - sh + 10 + r * (sh / 3)}
            width={sw / 3 - 8}
            height={sh / 3 - 10}
            fill={effectiveStatus === 'issue' ? '#220000' : color}
            opacity={0.3}
          />
        ))
      )}
      {/* glow when selected */}
      {selected && (
        <rect x={cx - sw / 2 - 3} y={cy - sh - 3} width={sw + 6} height={sh + 6} fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      )}
      {/* label */}
      <foreignObject x={cx - 55} y={cy - sh - 28} width="110" height="24">
        <div className="flex items-center justify-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold" style={{ borderColor: `${color}66`, background: `${color}1a`, color: '#fff' }}>
          {data.name}
          <SIcon className="h-3 w-3" style={{ color }} />
        </div>
      </foreignObject>
    </g>
  );
}

export default function DigitalTwinSVG({ onBuildingClick, selectedId }: { onBuildingClick: (id: string) => void; selectedId: string | null }) {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full">
      <rect width="400" height="260" fill="#0A1020" />
      {/* roads */}
      <rect x="0" y="120" width="400" height="10" fill="#15203F" />
      <rect x="195" y="0" width="10" height="260" fill="#15203F" />
      {/* track */}
      <ellipse cx="300" cy="210" rx="28" ry="18" fill="none" stroke="#F97316" strokeWidth="3" opacity="0.5" />
      <ellipse cx="300" cy="210" rx="20" ry="12" fill="#1a4a2a" opacity="0.4" />
      {buildings.map((b) => (
        <IsoBuilding key={b.id} data={b} selected={selectedId === b.id} onClick={() => onBuildingClick(b.id)} />
      ))}
    </svg>
  );
}
