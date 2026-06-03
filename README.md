# arellan-status-dashboard

Dashboard publico de estado operativo del ecosistema digital de la Clinica Automotriz Arellan Hnos. Muestra en tiempo real si los servicios estan activos, el historial de incidentes, y el tiempo de respuesta de la API.

## Como funciona

`arellan-status-dashboard` usa [Upptime](https://upptime.js.org), un monitor de uptime open-source basado en GitHub Actions. Cada 5 minutos, un workflow de GitHub realiza peticiones HTTP a los endpoints de cada servicio. Si un servicio no responde, se genera un issue automatico en este repositorio y la pagina de estado se actualiza reflejando la caida. Cuando el servicio se recupera, el issue se cierra automaticamente y el uptime se recalcula.

### Flujo de incidentes

1. GitHub Action ejecuta un health check cada 5 minutos
2. Si un endpoint falla, se abre un Issue con los detalles
3. La pagina estatica (`gh-pages`) se regenera con el nuevo estado
4. Cuando el servicio vuelve, el Issue se cierra y el porcentaje de uptime se actualiza

## Servicios monitoreados

| Servicio | Endpoint | Descripcion |
|---|---|---|
| API Principal | `https://api.arellan.pe/health` | Backend NestJS — health check |
| Panel Administrativo | `https://app.arellan.pe` | Frontend web administrativo |
| Portal Clientes | `https://cliente.arellan.pe` | Portal publico de clientes |
| App Gerencial | `https://mobile.arellan.pe` | PWA gerencial movil |
| App Taller | `https://taller.arellan.pe` | Interfaz de mecanicos |

## Informacion mostrada

- **Estado actual** — operativo / degradado / caido
- **Uptime** — porcentaje de disponibilidad (ultimos 30 dias)
- **Tiempo de respuesta** promedio por endpoint
- **Historial de incidentes** con fecha, descripcion y tiempo de resolucion
- **Mantenimientos programados** con aviso anticipado

## Stack

- **Upptime** como motor de monitoreo
- **GitHub Actions** para ejecutar los checks cada 5 minutos
- **GitHub Pages** (`gh-pages`) para servir la pagina estatica
- Costo: **$0/mes**

## Setup

1. Clonar este repositorio
2. Verificar que `.upptimerc.yml` tenga los endpoints correctos
3. Habilitar GitHub Pages en la rama `gh-pages` desde Settings > Pages
4. Configurar el CNAME `status.arellan.pe` en el proveedor DNS
5. El workflow se ejecuta automaticamente al hacer push a `main`

### Variables de entorno requeridas

| Variable | Proposito |
|---|---|
| `GH_PAT` | Personal Access Token para crear/cerrar issues y desplegar a `gh-pages` |

Agregarla en Settings > Secrets and variables > Actions.

## Dominio

`status.arellan.pe` — publico, sin autenticacion, siempre accesible incluso si los demas servicios estan caidos.

## Repos relacionados

- `arellan-platform` — expone el endpoint `/health` monitoreado
- `arellan-infrastructure` — alertas complementarias de CloudWatch/Grafana

## Licencia

Privado — © 2026 Arellan Hnos. Todos los derechos reservados.
