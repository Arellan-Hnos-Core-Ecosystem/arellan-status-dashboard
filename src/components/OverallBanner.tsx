import type { HealthStatus } from "@/domain/types";

const CONFIG: Record<HealthStatus, { message: string; classes: string }> = {
  operational: {
    message: "Todos los sistemas operativos",
    classes: "bg-green-600 text-white",
  },
  degraded: {
    message: "Algunos sistemas con rendimiento degradado",
    classes: "bg-yellow-500 text-white",
  },
  outage: {
    message: "Interrupción detectada en uno o más sistemas",
    classes: "bg-red-600 text-white",
  },
  unknown: {
    message: "Verificando estado de los sistemas...",
    classes: "bg-gray-500 text-white",
  },
};

interface OverallBannerProps {
  status: HealthStatus;
  checkedAt: string;
}

export function OverallBanner({ status, checkedAt }: OverallBannerProps) {
  const { message, classes } = CONFIG[status];
  const time = new Date(checkedAt).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className={`rounded-xl px-6 py-5 ${classes}`}>
      <p className="text-lg font-semibold">{message}</p>
      <p className="text-sm opacity-80 mt-1">Última verificación: {time}</p>
    </div>
  );
}
