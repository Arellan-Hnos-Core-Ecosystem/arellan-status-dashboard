# arellan-status-dashboard

Dashboard público de estado operativo del ecosistema digital de la Clínica Automotriz Arellan Hnos. Muestra si los servicios están activos, historial de incidentes y tiempo de respuesta de la API.

## Descripción

`arellan-status-dashboard` es la página de transparencia operativa del sistema. Cualquier persona — cliente, mecánico, o el equipo técnico — puede consultar si los servicios digitales están funcionando correctamente. Es un producto **completamente independiente** del resto del ecosistema: puede estar disponible incluso cuando los demás servicios están en mantenimiento.

## Por qué es un repo independiente

- Puede operar cuando el sistema principal está en mantenimiento
- Requiere un dominio separado (`status.arellan.pe`)
- Su audiencia es distinta: clientes y equipo técnico
- Herramienta crítica para comunicar incidencias sin acceso al sistema principal
- Stack diferente: máxima simplicidad y disponibilidad

## Stack Tecnológico

**MVP:** Upptime (GitHub-hosted, costo $0)
- Powered by GitHub Actions
- Checks automáticos de uptime cada 5 minutos
- Historial de incidentes en GitHub Issues
- Página estática generada automáticamente

**Fase 2 (si se requiere más control):** Next.js estático + API proxy con caché agresivo

## Servicios Monitoreados

| Servicio | URL monitorizada | Descripción |
|---------|-----------------|-------------|
| API Principal | `https://api.arellan.pe/health` | Backend NestJS |
| Portal Administrativo | `https://app.arellan.pe` | Frontend web admin |
| Portal Clientes | `https://cliente.arellan.pe` | Portal público |
| App Gerencial | `https://mobile.arellan.pe` | PWA móvil |
| App Taller | `https://taller.arellan.pe` | Mechanic UI |
| Base de Datos | Check interno vía API | PostgreSQL + Supabase |

## Información Mostrada

- **Uptime** de cada servicio (último 30 días, porcentaje)
- **Tiempo de respuesta** promedio de la API
- **Historial de incidentes** con fecha, descripción y resolución
- **Estado actual** — operativo / degradado / caído
- **Mantenimientos programados** con aviso anticipado

## Configuración Upptime (`.upptimerc.yml`)

```yaml
owner: arellan-tech
repo: arellan-status-dashboard
sites:
  - name: API Principal
    url: https://api.arellan.pe/health
  - name: Portal Administrativo
    url: https://app.arellan.pe
  - name: Portal Clientes
    url: https://cliente.arellan.pe
  - name: App Taller (Mechanic UI)
    url: https://taller.arellan.pe
status-website:
  cname: status.arellan.pe
  name: Arellan Hnos — Estado del Sistema
  introTitle: Estado de los servicios digitales
  introMessage: Esta página muestra el estado en tiempo real de la plataforma digital de la Clínica Automotriz Arellan Hnos.
```

## Alertas de Incidentes

Cuando un servicio cae:
1. GitHub Action detecta el error en el check periódico
2. Se crea un Issue automático en este repo con el detalle
3. La página de status se actualiza automáticamente
4. Se envía notificación por email al equipo técnico

## Dominio

`status.arellan.pe` — Público, sin autenticación. Siempre accesible.

## Repos Relacionados

- `arellan-platform` — Expone el endpoint `/health` que este dashboard monitorea
- `arellan-infrastructure` — Alertas de CloudWatch/Grafana complementarias

## Costo

- **MVP con Upptime:** $0/mes (GitHub Actions + GitHub Pages)
- **Fase 2 con Next.js:** incluido en plan de Vercel

## Licencia

Privado — © 2026 Arellan Hnos. Todos los derechos reservados.
