import { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { buildings } from '@/data/mock';
import type { BuildingData } from '@/data/mock';
import { useStore } from '@/store/useStore';
import { CheckCircle2, Wrench, AlertTriangle } from 'lucide-react';

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

function Building({ data, selected, onClick }: { data: BuildingData; selected: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const recoveryApplied = useStore((s) => s.recoveryApplied);

  // Block A turns amber after recovery
  const effectiveStatus = recoveryApplied && data.id === 'block-a' ? 'attention' : data.status;
  const color = statusColor[effectiveStatus];

  const SIcon = statusIcon[effectiveStatus];

  const windowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: effectiveStatus === 'issue' ? '#1a0a0a' : color,
        emissive: effectiveStatus === 'issue' ? '#220000' : color,
        emissiveIntensity: 0.15,
        roughness: 0.6,
        metalness: 0.1,
      }),
    [color, effectiveStatus]
  );

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1B2A4E',
        emissive: color,
        emissiveIntensity: hovered || selected ? 0.25 : 0.08,
        roughness: 0.7,
        metalness: 0.15,
      }),
    [color, hovered, selected]
  );

  const [w, h, d] = data.size;

  return (
    <group position={data.position}>
      {/* building body */}
      <mesh
        castShadow
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        material={bodyMaterial}
      >
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* roof */}
      <mesh position={[0, h / 2 + 0.08, 0]} material={bodyMaterial}>
        <boxGeometry args={[w + 0.1, 0.16, d + 0.1]} />
      </mesh>

      {/* windows — grid of small emissive boxes on front face */}
      {Array.from({ length: Math.floor(h / 0.7) }).map((_, row) =>
        Array.from({ length: Math.floor(w / 0.6) }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-w / 2 + 0.35 + col * 0.6, -h / 2 + 0.45 + row * 0.7, d / 2 + 0.001]}
            material={windowMaterial}
          >
            <planeGeometry args={[0.32, 0.4]} />
          </mesh>
        ))
      )}

      {/* glow ring at base when selected */}
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -h / 2 - 0.01, 0]}>
          <ringGeometry args={[w * 0.7, w * 0.85, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      )}

      {/* floating label badge */}
      <Html position={[0, h / 2 + 0.9, 0]} center distanceFactor={8} occlude={false}>
        <div
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md transition-all ${
            selected ? 'scale-110' : 'scale-100'
          }`}
          style={{
            borderColor: `${color}66`,
            background: `${color}1a`,
            color: '#fff',
          }}
        >
          {data.name}
          <SIcon className="h-3 w-3" style={{ color }} />
          <span style={{ color }}>
            {effectiveStatus === 'healthy' ? 'Healthy' : effectiveStatus === 'attention' ? 'Maintenance' : 'Issue'}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 0.4, 6]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.6, 0]}>
        <coneGeometry args={[0.28, 0.55, 7]} />
        <meshStandardMaterial color="#1f5c3a" emissive="#1f5c3a" emissiveIntensity={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}

function Ground() {
  return (
    <>
      {/* ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -1.35, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0E1428" roughness={1} />
      </mesh>
      {/* roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.34, 1.5]}>
        <planeGeometry args={[16, 1.2]} />
        <meshStandardMaterial color="#15203F" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.34, -1.5]}>
        <planeGeometry args={[16, 0.6]} />
        <meshStandardMaterial color="#15203F" roughness={0.9} />
      </mesh>
      {/* running track */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.33, 3.5]}>
        <ringGeometry args={[1.1, 1.5, 32]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.05} roughness={0.8} />
      </mesh>
      {/* sports field inside track */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.33, 3.5]}>
        <circleGeometry args={[1.08, 32]} />
        <meshStandardMaterial color="#1a4a2a" emissive="#1a4a2a" emissiveIntensity={0.08} roughness={0.9} />
      </mesh>
    </>
  );
}

export default function DigitalTwinCanvas({ onBuildingClick, selectedId }: { onBuildingClick: (id: string) => void; selectedId: string | null }) {
  const controlsRef = useRef<any>(null);

  const treePositions: [number, number, number][] = useMemo(
    () => [
      [-5.5, -1.2, -3], [5.5, -1.2, -3], [-5.8, -1.2, 1], [5.8, -1.2, 1],
      [-4.5, -1.2, 3], [4.5, -1.2, 3], [-2, -1.2, 5], [2, -1.2, 5],
    ],
    []
  );

  return (
    <Canvas
      shadows
      camera={{ position: [7, 6, 8], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.3} color="#3B82F6" />
      <hemisphereLight args={['#2E4374', '#0A1020', 0.4]} />

      <Ground />
      {buildings.map((b) => (
        <Building
          key={b.id}
          data={b}
          selected={selectedId === b.id}
          onClick={() => onBuildingClick(b.id)}
        />
      ))}
      {treePositions.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={5}
        maxDistance={18}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
      />
    </Canvas>
  );
}
