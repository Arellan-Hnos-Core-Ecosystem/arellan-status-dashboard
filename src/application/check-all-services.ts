import type { IHealthChecker, SystemStatus } from "@/domain/types";
import { deriveOverallStatus } from "@/domain/types";
import { MONITORED_SERVICES } from "./services-config";

export async function checkAllServices(
  checker: IHealthChecker
): Promise<SystemStatus> {
  const services = await checker.checkAll(MONITORED_SERVICES);
  return {
    overall: deriveOverallStatus(services),
    services,
    checkedAt: new Date().toISOString(),
  };
}
