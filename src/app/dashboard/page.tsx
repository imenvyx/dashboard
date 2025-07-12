"use client";

import { useAuthStore } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/loader";
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
