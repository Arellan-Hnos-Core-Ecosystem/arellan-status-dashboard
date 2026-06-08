import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Estado del Sistema — Arellan Hnos",
  description: "Estado operativo en tiempo real de los servicios de Clínica Automotriz Arellan Hnos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-brand tracking-tight uppercase">
                Arellan Hnos
              </span>
              <p className="text-xs text-gray-500">Estado del Sistema</p>
            </div>
            <a
              href="https://status.arellan.pe/history"
              className="text-xs text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline"
            >
              Historial de incidentes
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
        <footer className="text-center py-6 text-xs text-gray-400">
          © {new Date().getFullYear()} Arellan Hnos · Actualización automática cada 30 segundos
        </footer>
      </body>
    </html>
  );
}
