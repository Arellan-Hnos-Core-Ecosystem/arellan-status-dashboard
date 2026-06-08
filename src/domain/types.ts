export type ServiceId = "api" | "admin" | "mechanic" | "client-portal" | "mobile";

export type HealthStatus = "operational" | "degraded" | "outage" | "unknown";

export interface ServiceConfig {
  id: ServiceId;
  label: string;
  url: string;
  degradedAboveMs: number;
  outageAboveMs: number;
}

export interface HealthCheckResult {
  id: ServiceId;
  label: string;
  url: string;
  status: HealthStatus;
  latencyMs: number | null;
  statusCode: number | null;
  checkedAt: string;
  error: string | null;
}

export interface SystemStatus {
  overall: HealthStatus;
  services: HealthCheckResult[];
  checkedAt: string;
}

export interface IHealthChecker {
  check(service: ServiceConfig): Promise<HealthCheckResult>;
  checkAll(services: ServiceConfig[]): Promise<HealthCheckResult[]>;
}

export function deriveOverallStatus(results: HealthCheckResult[]): HealthStatus {
  if (results.every((r) => r.status === "operational")) return "operational";
  if (results.some((r) => r.status === "outage")) return "outage";
  if (results.some((r) => r.status === "degraded")) return "degraded";
  return "unknown";
}
