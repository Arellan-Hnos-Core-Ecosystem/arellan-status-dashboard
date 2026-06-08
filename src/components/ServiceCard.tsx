import type { HealthCheckResult } from "@/domain/types";
import { StatusBadge } from "./StatusBadge";

interface ServiceCardProps {
  result: HealthCheckResult;
}

export function ServiceCard({ result }: ServiceCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-gray-900">{result.label}</span>
        <span className="text-xs text-gray-400 font-mono">{result.url}</span>
        {result.error && (
          <span className="text-xs text-red-500 mt-1">{result.error}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {result.latencyMs !== null && (
          <span className="text-sm text-gray-500 tabular-nums">
            {result.latencyMs}
            <span className="text-xs ml-0.5 text-gray-400">ms</span>
          </span>
        )}
        <StatusBadge status={result.status} />
      </div>
    </div>
  );
}
