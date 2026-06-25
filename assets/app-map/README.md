# Mapa Turístico La Calera

Versión local editable del mapa para publicar en `app.turisoft.org`.

## Cómo editar

1. Abre `app.js`.
2. Cambia los registros del arreglo `places`.
3. Para crear una nueva capa, agrega un objeto en `layers` y usa ese `id` en los lugares.
4. Revisa el mapa local antes de subirlo.

## Cómo correr local

Con el runtime incluido en Codex:

```powershell
C:\Users\ANDRES\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe ..\..\tools\dev-server.mjs
```

También se puede subir la carpeta completa a un hosting estático. Para `app.turisoft.org`, la raíz publicada puede ser esta carpeta.

## Archivos necesarios

- `index.html`
- `styles.css`
- `app.js`
- `turisoft-logo.png`

La app usa Leaflet y OpenStreetMap desde CDN, por eso requiere internet para cargar el mapa base.
