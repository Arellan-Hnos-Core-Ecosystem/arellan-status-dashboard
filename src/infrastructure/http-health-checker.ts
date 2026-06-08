import type {
  IHealthChecker,
  ServiceConfig,
  HealthCheckResult,
  HealthStatus,
} from "@/domain/types";

export class HttpHealthChecker implements IHealthChecker {
  async check(service: ServiceConfig): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      const res = await fetch(service.url, {
        method: "GET",
        signal: AbortSignal.timeout(service.outageAboveMs + 500),
        cache: "no-store",
        headers: { "X-Health-Check": "arellan-status-dashboard" },
      });
      const latencyMs = Date.now() - start;

      let status: HealthStatus = "operational";
      if (!res.ok) status = "outage";
      else if (latencyMs >= service.outageAboveMs) status = "outage";
      else if (latencyMs >= service.degradedAboveMs) status = "degraded";

      return {
        id: service.id,
        label: service.label,
        url: service.url,
        status,
        latencyMs,
        statusCode: res.status,
        checkedAt: new Date().toISOString(),
        error: null,
      };
    } catch (err) {
      return {
        id: service.id,
        label: service.label,
        url: service.url,
        status: "outage",
        latencyMs: null,
        statusCode: null,
        checkedAt: new Date().toISOString(),
        error: err instanceof Error ? err.message : "Unreachable",
      };
    }
  }

  async checkAll(services: ServiceConfig[]): Promise<HealthCheckResult[]> {
    return Promise.all(services.map((s) => this.check(s)));
  }
}
