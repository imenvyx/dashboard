import { fetchReport } from "@/lib/data";
import { KpiCard, KpiCardSkeleton } from "@/components/charts/kpi-card";
import { LineChart, LineChartSkeleton } from "@/components/charts/line-chart";
import { notFound } from "next/navigation";
import { BarChart, BarChartSkeleton } from "@/components/charts/bar-chart";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ReportPage({
  params,
}: {
  params: { reportId: string };
}) {
  const report = await fetchReport(params.reportId);

  if (!report) {
    return notFound();
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{report.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <KpiCard title="Total" value={report.cards.total} currency={true} />
        <KpiCard title="Average" value={report.cards.average} currency={true} />
      </div>

      <div className="mb-8">
        <LineChart data={report.line} height={400} />
      </div>

      <div>
        <BarChart data={report.bar} height={400} />
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
