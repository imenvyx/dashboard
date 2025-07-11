"use client";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { useAuthStore } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuthStore();

  // Handle case where user is not authenticated
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 border rounded-lg bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
          <p className="mb-6">Please log in again to continue</p>
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header email={user?.email} onLogout={logout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar reports={user?.reports || []} />
        <div className="flex-1 overflow-y-auto pt-16 pl-64">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
