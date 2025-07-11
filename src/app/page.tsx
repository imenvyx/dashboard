"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";
import { Loader } from "@/components/loader";

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // Redirect based on authentication state
    if (!isLoading) {
      if (user) {
        // If the user is authenticated, redirect to the dashboard
        router.push("/dashboard");
      } else {
        // If not authenticated, redirect to login
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  // Show a loader while checking authentication state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader className="mx-auto mb-4" />
      </div>
    </div>
  );
}
