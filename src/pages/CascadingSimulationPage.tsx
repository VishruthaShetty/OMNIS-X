import { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { cascadeNodes, cascadeEdges, cascadeSummary } from '@/data/mock';
import type { CascadeNode } from '@/data/mock';
import { useStore } from '@/store/useStore';
import { Workflow, ChevronLeft, Info, Zap } from 'lucide-react';

const statusColors: Record<string, string> = {
  issue: '#FF4D4F',
  attention: '#F5A524',
  healthy: '#22D39A',
};

const hopBorder: Record<number, string> = {
  0: 'border-status-issue',
  1: 'border-status-issue/60',
  2: 'border-status-attention/60',
  3: 'border-accent-blue/50',
};

function CascadeNodeComponent({ data, selected }: NodeProps) {
  const node = data.node as CascadeNode;
  const color = statusColors[node.status];
  const isFailure = node.category === 'failure';

  return (
    <div
      className={`relative rounded-xl border-2 px-4 py-3 text-center shadow-glow transition-all ${
        hopBorder[node.hop] || 'border-navy-600'
      } ${selected ? 'scale-105 ring-2 ring-accent-blue' : ''}`}
      style={{
        background: isFailure ? `${color}20` : '#111935cc',
        borderColor: selected ? '#3B82F6' : `${color}80`,
        minWidth: 130,
      }}
    >
      {/* target handle for incoming edges (except failure center) */}
      {!isFailure && (
        <Handle type="target" position={Position.Top} style={{ background: color, width: 8, height: 8, border: 'none' }} />
      )}
      {/* source handle for outgoing edges (except leaf nodes) */}
      {node.hop < 3 && (
        <Handle type="source" position={Position.Bottom} style={{ background: color, width: 8, height: 8, border: 'none' }} />
      )}

      <p className="text-sm font-bold text-white">{node.label}</p>
      {isFailure ? (
        <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-status-issue">
          <Zap className="h-3 w-3" /> ROOT CAUSE
        </span>
      ) : (
        <p className="mt-1 text-[11px] tabular-nums text-slate-400">
          {node.affected} affected
        </p>
      )}
      <div className="mt-1 flex items-center justify-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[9px] uppercase tracking-wide" style={{ color }}>Hop {node.hop}</span>
      </div>
    </div>
  );
}

const nodeTypes = { cascade: CascadeNodeComponent };

export default function CascadingSimulationPage() {
  const [hoveredNode, setHoveredNode] = useState<CascadeNode | null>(null);
  const setActivePage = useStore((s) => s.setActivePage);
  const recoveryApplied = useStore((s) => s.recoveryApplied);
  const affectedStudents = useStore((s) => s.affectedStudents);

  const nodes: Node[] = useMemo(
    () =>
      cascadeNodes.map((n) => ({
        id: n.id,
        type: 'cascade',
        position: n.position,
        data: { node: n },
        draggable: false,
      })),
    []
  );

  const edges: Edge[] = useMemo(
    () =>
      cascadeEdges.map((e) => ({
        ...e,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#3B82F6', strokeWidth: 1.5, opacity: 0.6 },
      })),
    []
  );

  const onNodeMouseEnter = useCallback((_: React.MouseEvent, node: Node) => {
    const cn = cascadeNodes.find((n) => n.id === node.id);
    if (cn) setHoveredNode(cn);
  }, []);
  const onNodeMouseLeave = useCallback(() => setHoveredNode(null), []);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Cascading Impact Simulation</h2>
          <p className="text-sm text-slate-400">How a single failure propagates across campus subsystems (3 hops)</p>
        </div>
        <button onClick={() => setActivePage('dashboard')} className="btn-ghost">
          <ChevronLeft className="h-4 w-4" /> Back to Dashboard
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-glow p-4 text-center">
          <p className="text-2xl font-bold text-status-issue">{cascadeSummary.affectedSystems}</p>
          <p className="text-xs text-slate-400">Affected Systems</p>
        </div>
        <div className="card-glow p-4 text-center">
          <p className="text-2xl font-bold text-status-attention transition-all duration-700">{affectedStudents}</p>
          <p className="text-xs text-slate-400">
            Affected Students {recoveryApplied && <span className="text-status-healthy">(was 520)</span>}
          </p>
        </div>
        <div className="card-glow p-4 text-center">
          <p className="text-2xl font-bold text-white">{cascadeSummary.affectedFaculty}</p>
          <p className="text-xs text-slate-400">Affected Faculty</p>
        </div>
      </div>

      {/* Graph + detail panel */}
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="card-glow relative lg:col-span-3" style={{ height: 460 }}>
          <div className="flex items-center gap-2 border-b border-navy-700/60 px-4 py-3">
            <Workflow className="h-4 w-4 text-accent-blue" />
            <h3 className="text-sm font-bold text-white">Failure Propagation Graph</h3>
            <span className="ml-auto text-[11px] text-slate-500">Hover a node to see why it was affected</span>
          </div>
          <div className="h-[400px]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodeMouseEnter={onNodeMouseEnter}
              onNodeMouseLeave={onNodeMouseLeave}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              nodesConnectable={false}
              nodesDraggable={false}
              panOnDrag
              zoomOnScroll
            >
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1B2A4E" />
              <Controls showInteractive={false} className="!border-navy-700 !bg-navy-850" />
              <MiniMap
                className="!bg-navy-900 !border-navy-700"
                nodeColor={(n) => statusColors[(n.data?.node as CascadeNode)?.status || 'healthy']}
                maskColor="rgba(10,16,32,0.7)"
              />
            </ReactFlow>
          </div>
        </div>

        {/* Detail / hover panel */}
        <div className="card-glow p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
            <Info className="h-4 w-4 text-accent-blue" /> Node Detail
          </h3>
          {hoveredNode ? (
            <div className="animate-slideUp">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: statusColors[hoveredNode.status] }} />
                <p className="text-sm font-semibold text-white">{hoveredNode.label}</p>
              </div>
              <div className="mb-3 flex gap-2">
                <span className="badge bg-navy-700/50 text-slate-300">Hop {hoveredNode.hop}</span>
                <span className="badge bg-navy-700/50 text-slate-300 capitalize">{hoveredNode.status}</span>
                {hoveredNode.affected > 1 && (
                  <span className="badge bg-navy-700/50 text-slate-300">{hoveredNode.affected} affected</span>
                )}
              </div>
              <p className="rounded-lg bg-navy-800/50 p-3 text-xs leading-relaxed text-slate-300">
                {hoveredNode.reason}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Workflow className="mb-3 h-10 w-10 text-slate-600" />
              <p className="text-xs text-slate-500">Hover over any node in the graph to see why it was affected by the failure.</p>
            </div>
          )}

          {/* Legend */}
          <div className="mt-4 border-t border-navy-700/60 pt-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Legend</p>
            <div className="space-y-1.5">
              {[
                { label: 'Root cause', color: '#FF4D4F' },
                { label: 'Hop 1 – Direct impact', color: '#FF4D4F' },
                { label: 'Hop 2 – Indirect', color: '#F5A524' },
                { label: 'Hop 3 – Tertiary', color: '#3B82F6' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                  <span className="text-[11px] text-slate-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
