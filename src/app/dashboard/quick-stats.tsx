// src/components/dashboard/quick-stats.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

type QuickStatsProps = {
  stats: {
    totalReports: number;
    activeUsers: number;
    pendingTasks: number;
    dataSources: number;
  };
};

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Reports"
        value={stats.totalReports}
        icon={<Icons.report className="h-6 w-6" />}
        color="bg-blue-100 text-blue-600"
      />
      <StatCard
        title="Active Users"
        value={stats.activeUsers}
        icon={<Icons.users className="h-6 w-6" />}
        color="bg-green-100 text-green-600"
      />
      <StatCard
        title="Pending Tasks"
        value={stats.pendingTasks}
        icon={<Icons.tasks className="h-6 w-6" />}
        color="bg-yellow-100 text-yellow-600"
      />
      <StatCard
        title="Data Sources"
        value={stats.dataSources}
        icon={<Icons.database className="h-6 w-6" />}
        color="bg-purple-100 text-purple-600"
      />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`rounded-full p-3 ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
