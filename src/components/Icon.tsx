import { lazy, Suspense, type ComponentType, type SVGProps } from 'react';
import * as Lucide from 'lucide-react';
import DigitalTwinSVG from '@/components/DigitalTwinSVG';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = (Lucide as unknown as Record<string, ComponentType<IconProps>>)[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}

const DigitalTwinCanvas = lazy(() => import('@/components/DigitalTwinCanvas'));

export function TwinCanvas(props: { onBuildingClick: (id: string) => void; selectedId: string | null }) {
  return (
    <Suspense fallback={<DigitalTwinSVG {...props} />}>
      <DigitalTwinCanvas {...props} />
    </Suspense>
  );
}
