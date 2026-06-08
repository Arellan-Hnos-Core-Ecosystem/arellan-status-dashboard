import type { HealthStatus } from "@/domain/types";

const CONFIG: Record<HealthStatus, { label: string; classes: string; dot: string }> = {
  operational: {
    label: "Operacional",
    classes: "bg-green-100 text-green-800 ring-green-500/20",
    dot: "bg-green-500",
  },
  degraded: {
    label: "Degradado",
    classes: "bg-yellow-100 text-yellow-800 ring-yellow-500/20",
    dot: "bg-yellow-400 animate-pulse",
  },
  outage: {
    label: "Caído",
    classes: "bg-red-100 text-red-800 ring-red-500/20",
    dot: "bg-red-500 animate-pulse",
  },
  unknown: {
    label: "Desconocido",
    classes: "bg-gray-100 text-gray-600 ring-gray-400/20",
    dot: "bg-gray-400",
  },
};

interface StatusBadgeProps {
  status: HealthStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, classes, dot } = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
