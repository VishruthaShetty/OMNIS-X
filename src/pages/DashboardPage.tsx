import { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard';
import DigitalTwinCard from '@/components/DigitalTwinCard';
import SystemHealthOverview from '@/components/SystemHealthOverview';
import { FailureDetectionCard, CascadingImpactCard, RecoveryPlannerCard } from '@/components/MidRowCards';
import { ResourceAvailabilityCard, UpcomingEventsCard, CampusMapCard } from '@/components/BottomRowCards';
import { DashboardSkeleton } from '@/components/Skeletons';
import { topStats } from '@/data/mock';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top row: five stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {topStats.map((s) => (
          <StatCard key={s.id} data={s} />
        ))}
      </div>

      {/* Main row: digital twin (wide) + system health (right) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DigitalTwinCard />
        </div>
        <SystemHealthOverview />
      </div>

      {/* Middle row: three cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <FailureDetectionCard />
        <CascadingImpactCard />
        <RecoveryPlannerCard />
      </div>

      {/* Bottom row: three cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <ResourceAvailabilityCard />
        <UpcomingEventsCard />
        <CampusMapCard />
      </div>
    </div>
  );
}
