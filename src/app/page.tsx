"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { SystemStatus } from "@/domain/types";
import { OverallBanner } from "@/components/OverallBanner";
import { ServiceCard } from "@/components/ServiceCard";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

async function fetchStatus(): Promise<SystemStatus> {
  const res = await fetch("/api/status", { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener estado");
  return res.json();
}

function StatusDashboard() {
  const { data, isLoading, isError } = useQuery<SystemStatus>({
    queryKey: ["system-status"],
    queryFn: fetchStatus,
    refetchInterval: 30_000,
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-20 animate-pulse rounded-xl bg-gray-200" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 px-6 py-5 text-red-700 text-sm">
        No se pudo obtener el estado del sistema. Reintentando...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <OverallBanner status={data.overall} checkedAt={data.checkedAt} />
      <div className="flex flex-col gap-3 mt-2">
        {data.services.map((result) => (
          <ServiceCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusDashboard />
    </QueryClientProvider>
  );
}
