// src/components/dashboard/report-summary.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface Report {
  id: string | number;
  name: string;
  // Add other fields as needed, e.g. lastUpdated?: string;
}

export function ReportSummary({ reports }: { reports: Report[] }) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div>
            <p className="font-medium">{report.name}</p>
            <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
          </div>
          <Link href={`/report/${report.id}`}>
            <Button variant="outline" size="sm">
              <Icons.eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
        </div>
      ))}

      <div className="mt-6">
        <Link href="/admin">
          <Button variant="secondary" className="w-full">
            <Icons.plus className="h-4 w-4 mr-2" />
            Create New Report
          </Button>
        </Link>
      </div>
    </div>
  );
}
