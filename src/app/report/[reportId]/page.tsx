"use client";

import { fetchReport } from "@/lib/data";
import { KpiCard, KpiCardSkeleton } from "@/components/charts/kpi-card";
import { LineChart, LineChartSkeleton } from "@/components/charts/line-chart";
import { BarChart, BarChartSkeleton } from "@/components/charts/bar-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const params = useParams();
  const reportId = params?.reportId as string;
  const { data, isLoading } = useQuery({
    queryKey: ["report", params?.reportId],
    queryFn: () => fetchReport(reportId),
  });
  console.log(data);
  return isLoading && !data ? (
    <ReportPageLoading />
  ) : (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        {data?.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <KpiCard
          title="Total"
          value={data?.cards?.total}
          currency={true}
        />
        <KpiCard
          title="Average"
          value={data?.cards?.average}
          currency={true}
        />
      </div>

      <div className="mb-8">
        <LineChart data={data?.line} height={400} />
      </div>

      <div>
        <BarChart data={data?.bar} height={400} />
      </div>
    </div>
  );
}

// Optional: Loading state component
export function ReportPageLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </div>

      <div className="mb-8">
        <LineChartSkeleton height={400} />
      </div>

      <div>
        <BarChartSkeleton height={400} />
      </div>
    </div>
  );
}
