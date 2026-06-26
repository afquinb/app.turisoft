# Turisoft · Mapa La Calera — Estado visual y modelo de datos

Documento de repaso para pasar de la maqueta (datos demo) a una base de datos real.

## 1. Qué tenemos visualmente (hoy)

- **Mapa base** Leaflet + OpenStreetMap, con marca Turisoft (paleta Esmeralda/Vital/Bosque, tipografías Sora/Inter/JetBrains Mono, logo turisoft.org).
- **Brújula** (norte + recentrar) y controles de zoom estilizados.
- **Modos de uso:** Viajero y Gestor (la capa "Veredas" solo en Gestor).
- **Menú de capas** (panel izquierdo): 7 categorías con interruptor, contador y buscador.
- **Ficha al hacer clic** (tarjeta rica, sombra Bosque Nocturno):
  - Viajero → variante B; Gestor → variante C (héroe oscuro).
  - Foto, badges (Verificado/Comunitario/Accesible), rating + reseñas, categoría, título, ubicación, descripción, tags/actividades.
  - Perfil del recorrido (elevación), capacidad de carga, huella CO₂, compromisos, y CTAs (Reservar/WhatsApp/Mapa o Cómo llegar/Editar).
- **Estadísticas por perfil** (modal): Gestor (territorio) y Prestador (su desempeño), con KPIs, líneas y barras.

## 2. Entidades que ya maneja el front (campos actuales)

**Lugar / Punto** (`places`): id, name, layerId, vereda, lat, lng, rating, activities[], description, tips, image, phone, website, aprox.
**Categoría / Capa** (`layers`): id, label, color, defaultOn, roles[].
**Vereda**: nombre, lat, lng (30 registros).
**Datos demo de ficha** (`richData`): badges, accesibilidad, reviews, sendero{km,dif,dur,min,max,desnivel}, capacity{cur,max,today}, huella{kg,pct}, mitigaciones[].
**Estadísticas demo**: visitas/mes, conversiones, ranking.

## 3. Modelo de base de datos propuesto

Tablas principales. La versión aterrizada para este stage quedó en `backend/db/schema.sql` usando MariaDB:

- **categorias** — id, slug, nombre, color, orden, visible_por_rol.
- **veredas** — id, nombre, lat, lng, geometria (opcional).
- **lugares** — id, nombre, categoria_id, vereda_id, lat, lng, descripcion, direccion, telefono, sitio_web, accesibilidad, verificado(bool), comunitario(bool), aprox(bool), prestador_id(null), creado_en, actualizado_en.
- **actividades** — id, nombre, icono. **lugar_actividad** — lugar_id, actividad_id (N:N).
- **fotos** — id, lugar_id, url, orden, alt.
- **prestadores** — id, usuario_id, nombre_comercial, descripcion, lugar_id, contacto.
- **resenas** — id, lugar_id, usuario_id, rating, texto, verificada(bool), creado_en.
- **sendero** (1:1 con lugar de ruta) — lugar_id, km, dificultad, duracion, alt_min, alt_max, desnivel, perfil_json.
- **capacidad** — lugar_id, max_por_salida, cupos_hoy.
- **sostenibilidad** — lugar_id, huella_kg, pct_vs_promedio, mitigaciones[].
- **usuarios / perfiles** — id, email, rol (viajero|prestador|gestor), prestador_id(null).
- **eventos_analitica** — id, lugar_id, tipo (vista|clic_reservar|clic_whatsapp|clic_mapa), perfil, fecha. → de aquí salen las estadísticas reales.

Relaciones clave: lugar → categoría, vereda, prestador; lugar 1:N fotos/reseñas/eventos; lugar 1:1 sendero/capacidad/sostenibilidad; prestador 1:1 usuario.

## 4. Puntos de conexión (front ↔ API)

- `GET /categorias`, `GET /veredas` → poblar capas y la capa Veredas.
- `GET /lugares?categoria=&bbox=` → marcadores y lista.
- `GET /lugares/:id` → ficha completa (incluye fotos, sendero, capacidad, sostenibilidad, reseñas).
- `GET /estadisticas/gestor` y `GET /estadisticas/prestador/:id` → reemplazan `genMonthly`/`richData` demo.
- `POST /eventos` → registrar vista/clic (para alimentar analítica real).
- Auth por rol → define modo (Viajero/Gestor) y qué prestador ve cada quien.

## 5. Próximos pasos sugeridos
1. Crear una base nueva `turisoft_map` en MariaDB y aplicar `backend/db/schema.sql`.
2. Sembrar `categories`, `villages` y `places` desde `data/catalog.js`.
3. Reemplazar `backend/catalog-repository.mjs` por un adaptador MariaDB.
4. Cambiar el front para consumir `/api/catalog` con fallback local.
5. Conectar analítica real vía `analytics_events`.
6. Capturar coordenadas GPS reales para reemplazar las aproximadas.
