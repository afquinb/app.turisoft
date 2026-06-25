# Estado actual del mapa Turisoft - La Calera

Fecha de revision: 2026-06-25  
Carpeta base: `C:\Users\ANDRES\Documents\Turisoft\assets\app-map`

## 1. Resumen ejecutivo

El mapa ya esta en estado de prototipo funcional local. No es solo un iframe del Replit: ahora existe una version propia, editable y lista para subir como sitio estatico a `app.turisoft.org`.

Funciona como primera version demostrable para mostrar:

- Mapa turistico de La Calera con Leaflet + OpenStreetMap.
- Capas turisticas por categoria.
- Modo Viajero y modo Gestor.
- Fichas enriquecidas de lugares.
- Fotos locales.
- Ruta GPS para Pena de las Aguilas.
- Capa de veredas y uso del territorio para gestion.
- Modal de estadisticas demo por perfil.

## 2. Archivos principales

- `index.html`: estructura de la app y carga de dependencias.
- `app.js`: datos, marcadores, capas, fichas, modo gestor/viajero y estadisticas.
- `routes.js`: traza GPS real asociada al lugar `id: 6`.
- `styles.css`: layout general, paneles, mapa, controles y estadisticas.
- `turisoft-ficha.css`: estilo de ficha visual avanzada.
- `photos/`: imagenes locales usadas por fichas.
- `turisoft-logo.png`: logo autocontenido para despliegue.
- `REFERENTE-mapa-lacalera.md`: transcripcion del mapa turistico base.
- `ESTADO-VISUAL-Y-MODELO-DB.md`: propuesta visual y modelo de datos futuro.
- `README.md`: instrucciones basicas de edicion y ejecucion.

## 3. Estado funcional verificado

Revision local por HTTP:

- `http://127.0.0.1:8765/` responde `200`.
- `routes.js` responde `200`.
- `turisoft-ficha.css` responde `200`.
- `photos/embalse-san-rafael.jpg` responde `200`.

Estado observado en codigo:

- 9 capas definidas:
  - Naturaleza y paisaje.
  - Aventura y deportes.
  - Rutas y senderos.
  - Cultura y patrimonio.
  - Gastronomia.
  - Alojamiento y camping.
  - Servicios.
  - Veredas y centros poblados.
  - Uso del territorio.
- 27 atractivos/lugares principales.
- 30 veredas agregadas como puntos de gestion.
- Total aproximado mostrado por datos locales: 57 puntos.
- 1 ruta GPS en `routes.js`: Pena de las Aguilas.

## 4. Lo que ya esta listo para demo

El mapa sirve para una presentacion funcional. Ejemplo practico: un visitante puede activar capas, buscar "Embalse", abrir la ficha, ver foto, descripcion y abrir el lugar en Google Maps. Un gestor puede cambiar al modo Gestor, ver veredas, uso del territorio y estadisticas demo.

Tambien sirve como base de trabajo para alcaldia, prestadores o inventario turistico, porque ya separa conceptos importantes: lugar, capa, vereda, ruta, imagen, ficha y rol.

## 5. Estado de despliegue

Hay un ZIP anterior listo en:

`C:\Users\ANDRES\Documents\Turisoft\tmp\turisoft-app-map.zip`

Importante: ese ZIP fue creado antes de los cambios mas recientes observados en `app.js`, `styles.css`, `routes.js`, `turisoft-ficha.css` y `photos/`. Antes de subir a `app.turisoft.org`, conviene regenerar el ZIP para incluir el estado actual.

La carpeta que debe publicarse como raiz del subdominio es:

`C:\Users\ANDRES\Documents\Turisoft\assets\app-map`

## 6. Pendientes antes de produccion

1. Regenerar ZIP final con la carpeta actual.
2. Subir contenido a la raiz de `app.turisoft.org` desde cPanel.
3. Confirmar que `index.html` queda como archivo inicial del subdominio.
4. Probar en navegador publico:
   - `https://app.turisoft.org/`
   - carga de Leaflet.
   - carga de fotos.
   - carga de `routes.js`.
   - modo Gestor.
   - fichas.
5. Reemplazar datos demo por inventario validado:
   - telefonos reales.
   - sitios web reales.
   - coordenadas GPS reales.
   - nombres oficiales.
   - fotos autorizadas.
6. Revisar textos con caracteres especiales si el servidor no entrega UTF-8 correctamente.
7. Definir si se queda como app estatica o si se conecta a base de datos.

## 7. Riesgos actuales

- Los datos de coordenadas son aproximados, salvo la ruta GPS incluida.
- Algunos prestadores son de ejemplo y no deben publicarse como oferta real sin validacion.
- La app depende de internet para cargar Leaflet, fuentes de Google y tiles de OpenStreetMap.
- Si el hosting bloquea archivos `.js`, `.css` o imagenes por configuracion, el mapa puede cargar incompleto.
- Si se sube el ZIP anterior sin regenerar, se pierde parte del avance reciente.

## 8. Recomendacion

El siguiente paso correcto es cerrar un paquete de despliegue actualizado y subirlo a `app.turisoft.org`.

Para trabajar ordenado:

1. Regenerar `tmp\turisoft-app-map.zip` desde `assets\app-map`.
2. Subirlo por cPanel al subdominio.
3. Probar la URL publica.
4. Crear una segunda tarea para limpiar datos demo y reemplazarlos por inventario oficial.

