# Turisoft app map stage - arquitectura

## Objetivo

Separar la maqueta monolítica en capas que permitan crecer hacia 100+ fichas, backend y base de datos sin seguir aumentando `app.js`.

## Capas

1. Front estático:
   - `index.html`
   - `styles.css`
   - `turisoft-ficha.css`
   - `app.js`

2. Datos locales:
   - `data/catalog.js`
   - Fuente temporal para desarrollo y fallback estático.

3. UI compartida:
   - `ui/icons.js`

4. API local:
   - `backend/server.mjs`
   - `backend/catalog-repository.mjs`

5. Persistencia futura:
   - `backend/db/schema.sql`
   - MariaDB como fuente real.

## Contrato API inicial

El front debe poder migrar a `fetch` sin cambiar la forma de los datos principales:

- Categorías: equivalentes a `layers`.
- Lugares: equivalentes a `places`.
- Veredas: equivalentes a `VEREDAS` normalizado.
- Eventos: base para analítica de vistas y clics.

## Ruta recomendada

1. Mantener `data/catalog.js` como fuente local mientras se limpian datos.
2. Cargar el esquema MariaDB en una base nueva `turisoft_map`.
3. Crear semillas desde `data/catalog.js`.
4. Cambiar `backend/catalog-repository.mjs` por un adaptador MariaDB.
5. Cambiar el front para usar `/api/catalog` con fallback local.
6. Ingerir datos públicos con trazabilidad en `public_sources` y `place_sources`.
