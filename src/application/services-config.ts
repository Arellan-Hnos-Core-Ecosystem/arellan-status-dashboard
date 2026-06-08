import type { ServiceConfig } from "@/domain/types";

const degradedMs = Number(process.env.DEGRADED_ABOVE_MS ?? 500);
const outageMs = Number(process.env.OUTAGE_ABOVE_MS ?? 2000);

export const MONITORED_SERVICES: ServiceConfig[] = [
  {
    id: "api",
    label: "API Principal",
    url: process.env.MONITOR_API_URL ?? "https://api.arellan.pe/api/v1/health",
    degradedAboveMs: degradedMs,
    outageAboveMs: outageMs,
  },
  {
    id: "admin",
    label: "Panel Administrativo",
    url: process.env.MONITOR_ADMIN_URL ?? "https://app.arellan.pe",
    degradedAboveMs: degradedMs,
    outageAboveMs: outageMs,
  },
  {
    id: "mechanic",
    label: "App Taller",
    url: process.env.MONITOR_MECHANIC_URL ?? "https://taller.arellan.pe",
    degradedAboveMs: degradedMs,
    outageAboveMs: outageMs,
  },
  {
    id: "client-portal",
    label: "Portal Clientes",
    url: process.env.MONITOR_CLIENT_PORTAL_URL ?? "https://cliente.arellan.pe",
    degradedAboveMs: degradedMs,
    outageAboveMs: outageMs,
  },
  {
    id: "mobile",
    label: "App Gerencial",
    url: process.env.MONITOR_MOBILE_URL ?? "https://mobile.arellan.pe",
    degradedAboveMs: degradedMs,
    outageAboveMs: outageMs,
  },
];
