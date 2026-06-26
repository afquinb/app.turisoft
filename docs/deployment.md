# Deployment Turisoft

## Objetivo

Publicar la app del mapa sin mezclarla con otras carpetas del workspace.

## Origen

La fuente editable vive en:

```text
assets/app-map
```

## Destino

Subdominio público:

```text
https://app.turisoft.org/
```

## Archivos mínimos

- `index.html`
- `styles.css`
- `app.js`
- `turisoft-ficha.css`
- `data/catalog.js`
- `ui/icons.js`
- `backend/`
- `photos/`
- `turisoft-logo.png`

## Reglas prácticas

- No publicar datos demo como definitivos.
- Mantener el contenido del mapa versionado antes de subir al hosting.
- Si cambia la estructura del front, actualizar `assets/app-map/README.md`.

## Pendiente técnico

El backend local todavía usa catálogo local. El siguiente paso es conectar MariaDB y dejar un repositorio real para el catálogo.
