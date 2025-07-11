"use client";

import { useAuthStore } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Icons } from "@/components/ui/icons";
import { ReportSummary } from "./report-summary";
import { useQuery } from "@tanstack/react-query";
import { fetchReports } from "@/lib/data";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchReports(),
  });
  console.log(data?.reports);
  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="px-8 py-20 h-full">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user.email}. Here&#39;s what&#39;s happening today.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={reports.line} height={300} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={dashboardData.usageChart} height={300} />
          </CardContent>
        </Card>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportSummary reports={data?.reports} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
