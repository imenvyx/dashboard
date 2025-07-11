"use client";

import { useAuthStore } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/charts/bar-chart";
import { LineChart } from "@/components/charts/line-chart";

import { Loader } from "@/components/loader";
import { Icons } from "@/components/ui/icons";
import { QuickStats } from "./quick-stats";
import { RecentActivity } from "./recent-activity";
import { ReportSummary } from "./report-summary";

// Mock data for the dashboard
const dashboardData = {
  quickStats: {
    totalReports: 12,
    activeUsers: 24,
    pendingTasks: 3,
    dataSources: 5,
  },
  recentActivity: [
    {
      id: 1,
      user: "John Doe",
      action: "Created Sales Report",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated Inventory Data",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Added new data source",
      time: "1 day ago",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "Generated Quarterly Report",
      time: "1 day ago",
    },
    {
      id: 5,
      user: "Alex Thompson",
      action: "Assigned report to team",
      time: "2 days ago",
    },
  ],
  performanceChart: [
    { date: "Jan", value: 4000 },
    { date: "Feb", value: 3000 },
    { date: "Mar", value: 2000 },
    { date: "Apr", value: 2780 },
    { date: "May", value: 1890 },
    { date: "Jun", value: 2390 },
    { date: "Jul", value: 3490 },
  ],
  usageChart: [
    { category: "Reports", value: 45 },
    { category: "Analytics", value: 30 },
    { category: "Data Sources", value: 15 },
    { category: "Settings", value: 10 },
  ],
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      // Simulate data loading
      setTimeout(() => {
        setLoading(false);
        // In a real app, you would fetch actual reports data here
        setReports([]);
      }, 800);
    }
  }, [user, router]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user.email}. Here&#39;s what&#39;s happening today.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <Icons.logout className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <QuickStats stats={dashboardData.quickStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={dashboardData.performanceChart} height={300} />
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={dashboardData.recentActivity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportSummary reports={reports} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
