# Quickstart Turisoft

## Repositorio

Ruta local del workspace:

```text
/run/media/andresquin/0488A0BD88A0AE9C/Users/ANDRES/Documents/Turisoft
```

## Mapa local

Carpeta principal:

```text
assets/app-map
```

### Servidor estático

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

Abrir:

```text
http://127.0.0.1:8766/
```

### Backend local

```bash
npm run dev
```

Abrir:

```text
http://127.0.0.1:8770/
```

### Chequeo básico

```bash
npm run check
```

## Flujo de edición

1. Cambiar `index.html`, `app.js` y `styles.css` dentro de `assets/app-map/`.
2. Validar localmente en `8766` o `8770`.
3. Publicar el contenido de `assets/app-map/` en `app.turisoft.org`.
