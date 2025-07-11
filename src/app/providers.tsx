"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  // Inicializar el estado de autenticación desde localStorage
  useAuthStore.persist.rehydrate();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
