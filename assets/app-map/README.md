# Mapa Turístico La Calera

Versión local editable del mapa para publicar en `app.turisoft.org`.

## Arquitectura local

- `app.js`: orquesta Leaflet, estado, filtros, fichas y render.
- `data/catalog.js`: inventario local reutilizable por front y backend.
- `ui/icons.js`: iconos SVG usados por la ficha.
- `routes.js`: trazas GPS expuestas en `window.ROUTES`.
- `backend/server.mjs`: API local sin dependencias y servidor estático.
- `backend/db/schema.sql`: modelo inicial MariaDB.

## Cómo editar datos

1. Abre `data/catalog.js`.
2. Cambia registros en `places`, `layers`, `VEREDAS`, `ZONES`, `RNT` o `ITINERARIES`.
3. Revisa el mapa local antes de subirlo.

## Cómo correr local estático

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

URL: `http://127.0.0.1:8766/`

## Cómo correr con backend local

```bash
npm run dev
```

URL: `http://127.0.0.1:8770/`

API:

- `GET /api/health`
- `GET /api/catalog`
- `GET /api/categories`
- `GET /api/veredas`
- `GET /api/places`
- `GET /api/places/:id`
- `POST /api/events`

## Chequeos

```bash
npm run check
```

La API usa `data/catalog.js` por ahora. El siguiente paso es reemplazar `backend/catalog-repository.mjs` por un repositorio MariaDB usando el esquema de `backend/db/schema.sql`.

La carpeta completa todavía se puede subir a un hosting estático. Para `app.turisoft.org`, la raíz publicada puede ser esta carpeta.

## Archivos necesarios

- `index.html`
- `styles.css`
- `app.js`
- `turisoft-logo.png`

La app usa Leaflet y OpenStreetMap desde CDN, por eso requiere internet para cargar el mapa base.
