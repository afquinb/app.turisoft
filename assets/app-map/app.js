import { MAP_CENTER, ITINERARIES, RNT, TAG_MAP, ZONES, ZONE_STYLE, layers, places } from "./data/catalog.js";
import { ICONS } from "./ui/icons.js";

const ROUTES = window.ROUTES || {};
const ROUTE_META = window.ROUTE_META || {};

const state = {
  mode: "traveler",
  query: "",
  activePlaceId: null,
  managerOnboarded: false,
  activeLayers: Object.fromEntries(layers.map(layer => [layer.id, layer.defaultOn]))
};

const map = L.map("map", { zoomControl: true }).setView(MAP_CENTER, 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* Brujula: marca el norte y recentra el mapa al hacer clic */
const Brujula = L.Control.extend({
  options: { position: "topright" },
  onAdd: function () {
    const el = L.DomUtil.create("button", "brujula");
    el.type = "button";
    el.setAttribute("aria-label", "Norte - recentrar mapa");
    el.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.5"/>' +
      '<polygon points="12,3.6 14.6,12 12,10.3 9.4,12" fill="#7BD14E"/>' +
      '<polygon points="12,20.4 9.4,12 12,13.7 14.6,12" fill="#EAF1EC" opacity="0.65"/></svg>' +
      '<span class="brujula-n" aria-hidden="true">N</span>';
    L.DomEvent.on(el, "click", function (e) {
      L.DomEvent.stop(e);
      map.flyTo(MAP_CENTER, 13, { duration: 0.6 });
    });
    return el;
  }
});
map.addControl(new Brujula());

/* ===== Capas base ===== */
const markerGroup = L.layerGroup().addTo(map);
const routeLayer = L.layerGroup().addTo(map);

/* ===== Uso del territorio (Brandbook): zonas con color + patrón (daltonismo).
   Gestor: visibles en todo el territorio (capa "Uso del territorio").
   Viajero: visibles al abrir un sendero. ===== */
const zonesLayer = L.layerGroup();
let usoLegendEl = null;

function injectZonePatterns() {
  setTimeout(function () {
    const svg = document.querySelector(".leaflet-overlay-pane svg");
    if (!svg || svg.querySelector("#z-defs")) return;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.setAttribute("id", "z-defs");
    defs.innerHTML =
      '<pattern id="pat-restringido" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="rgba(224,161,0,0.12)"/><line x1="0" y1="0" x2="0" y2="7" stroke="#E0A100" stroke-width="2"/></pattern>' +
      '<pattern id="pat-sensible" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="rgba(214,69,69,0.10)"/><circle cx="3" cy="3" r="1.2" fill="#D64545"/></pattern>';
    svg.insertBefore(defs, svg.firstChild);
  }, 50);
}

function drawZones() {
  zonesLayer.clearLayers();
  ZONES.forEach(function (z) {
    const st = ZONE_STYLE[z.type];
    L.polygon(z.coords, { color: st.color, weight: st.weight, dashArray: st.dashArray, fillOpacity: 1, className: st.className })
      .bindPopup("<strong>" + z.name + "</strong><br>Uso del territorio: " + z.type)
      .addTo(zonesLayer);
  });
  injectZonePatterns();
}

function updateZones() {
  const isManager = state.mode === "manager";
  const routeActive = !!(state.activePlaceId && hasRoute(state.activePlaceId));
  const show = (isManager && state.activeLayers["uso"]) || routeActive;
  if (show) {
    drawZones();
    if (!map.hasLayer(zonesLayer)) zonesLayer.addTo(map);
    if (usoLegendEl) usoLegendEl.style.display = "";
  } else {
    if (map.hasLayer(zonesLayer)) map.removeLayer(zonesLayer);
    if (usoLegendEl) usoLegendEl.style.display = "none";
  }
}

const UsoLegend = L.Control.extend({
  options: { position: "bottomright" },
  onAdd: function () {
    const el = L.DomUtil.create("div", "uso-legend");
    usoLegendEl = el;
    el.innerHTML =
      '<div class="uso-head"><span>Uso del territorio</span></div>' +
      '<div class="uso-item"><span class="uso-sw uso-sw--permitido"></span>Permitido</div>' +
      '<div class="uso-item"><span class="uso-sw uso-sw--restringido"></span>Restringido</div>' +
      '<div class="uso-item"><span class="uso-sw uso-sw--sensible"></span>Sensible</div>' +
      '<p style="margin:8px 0 0;font-size:10px;line-height:1.35;color:var(--muted);max-width:175px">Color + patrón (daltonismo) · nodos y rutas para senderos</p>';
    L.DomEvent.disableClickPropagation(el);
    el.style.display = "none";
    return el;
  }
});
map.addControl(new UsoLegend());
const layerList = document.querySelector("#layers");
const placeList = document.querySelector("#places");
const visibleCount = document.querySelector("#visible-count");
const searchInput = document.querySelector("#search");
const detail = document.querySelector("#detail");
const modeContext = document.querySelector("#mode-context");
const toggleLayersButton = document.querySelector("#toggle-layers");
const openLayersButton = document.querySelector("#open-layers");
const statsButton = document.querySelector("#stats-button");
const statsModal = document.querySelector("#stats");
const mobilePanelButtons = document.querySelectorAll("[data-mobile-panel]");
const modeButtons = document.querySelectorAll("[data-mode]");
document.body.dataset.mobilePanel = "map";
document.body.dataset.mode = state.mode;
document.body.dataset.leftPanel = "open";
if (openLayersButton) openLayersButton.hidden = true;

function isMobileLayout() {
  return window.matchMedia("(max-width: 820px)").matches;
}

function setMobilePanel(panel) {
  const target = panel === "detail" && detail.hidden ? "places" : panel;
  document.body.dataset.mobilePanel = target;
  if (target !== "map") setLeftPanelCollapsed(false);
  mobilePanelButtons.forEach(button => {
    button.classList.toggle("is-active", button.dataset.mobilePanel === target);
    button.setAttribute("aria-pressed", button.dataset.mobilePanel === target ? "true" : "false");
  });
  window.setTimeout(() => map.invalidateSize(), 80);
}

mobilePanelButtons.forEach(button => {
  button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
  button.addEventListener("click", () => setMobilePanel(button.dataset.mobilePanel));
});

toggleLayersButton?.addEventListener("click", () => setLeftPanelCollapsed(true));
openLayersButton?.addEventListener("click", () => setLeftPanelCollapsed(false));

modeButtons.forEach(button => {
  button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

searchInput.addEventListener("input", event => {
  state.query = event.target.value.trim().toLowerCase();
  renderPlaces();
});

statsButton.addEventListener("click", openStats);

document.querySelector("#rnt-modal").addEventListener("click", function (e) { if (e.target.id === "rnt-modal") closeRnt(); });

document.querySelector("#close-stats").addEventListener("click", () => {
  statsModal.hidden = true;
});

function render() {
  renderModeContext();
  renderLayers();
  renderPlaces();
  updateZones();
}

function setLeftPanelCollapsed(collapsed) {
  document.body.dataset.leftPanel = collapsed ? "collapsed" : "open";
  if (toggleLayersButton) toggleLayersButton.setAttribute("aria-expanded", collapsed ? "false" : "true");
  if (openLayersButton) openLayersButton.hidden = !collapsed;
  window.setTimeout(() => map.invalidateSize(), 120);
}

function setMode(mode) {
  state.mode = mode;
  if (mode === "manager" && !state.managerOnboarded) {
    state.activeLayers.veredas = true;
    state.activeLayers.uso = true;
    state.managerOnboarded = true;
  }
  document.body.dataset.mode = mode;
  modeButtons.forEach(item => {
    const isActive = item.dataset.mode === mode;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  statsButton.hidden = mode !== "manager";
  searchInput.placeholder = mode === "manager" ? "Buscar fichas, veredas o alertas..." : "Buscar experiencias...";
  if (state.activePlaceId) selectPlace(state.activePlaceId);
  render();
  updateZones();
}

function renderModeContext() {
  if (!modeContext) return;
  const visible = getVisiblePlaces();
  const activeLayerCount = getAllowedLayers().filter(layer => state.activeLayers[layer.id]).length;
  const rntCount = visible.filter(place => RNT[place.id]).length;
  const pendingCount = visible.filter(place => getDataQuality(place).status !== "complete").length;
  const routeCount = visible.filter(place => hasRoute(place.id) || richData(place).sendero).length;

  if (state.mode === "manager") {
    modeContext.innerHTML = `
      <div class="mode-copy">
        <strong>Gestor territorial</strong>
        <span>Inventario, cobertura, verificación y decisiones de operación.</span>
      </div>
      <div class="mode-kpis">
        <span><b>${visible.length}</b> fichas</span>
        <span><b>${pendingCount}</b> por revisar</span>
        <span><b>${activeLayerCount}</b> capas activas</span>
      </div>
    `;
    return;
  }

  modeContext.innerHTML = `
    <div class="mode-copy">
      <strong>Viajero</strong>
      <span>Experiencias, rutas y servicios listos para decidir la visita.</span>
    </div>
    <div class="mode-kpis">
      <span><b>${visible.length}</b> lugares</span>
      <span><b>${routeCount}</b> con ruta</span>
      <span><b>${rntCount}</b> RNT</span>
    </div>
  `;
}

function renderLayers() {
  layerList.innerHTML = "";
  getAllowedLayers().forEach(layer => {
    const count = layer.zones ? ZONES.length : places.filter(place => place.layerId === layer.id).length;
    const button = document.createElement("button");
    button.className = `layer-row ${state.activeLayers[layer.id] ? "is-on" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="layer-main">
        <span class="dot" style="background:${layer.color}"></span>
        <span class="layer-name">${layer.label}</span>
        <span class="badge">(${count})</span>
      </span>
      <span class="toggle" aria-hidden="true"></span>
    `;
    button.addEventListener("click", () => {
      state.activeLayers[layer.id] = !state.activeLayers[layer.id];
      render();
      updateZones();
    });
    layerList.appendChild(button);
  });
}

function renderPlaces() {
  markerGroup.clearLayers();
  placeList.innerHTML = "";
  const visiblePlaces = getVisiblePlaces();
  visibleCount.textContent = visiblePlaces.length;

  visiblePlaces.forEach(place => {
    const layer = getLayer(place.layerId);
    const marker = L.circleMarker([place.lat, place.lng], {
      radius: place.layerId === "veredas" ? 6 : 9,
      color: "#06100b", weight: 2, fillColor: layer.color, fillOpacity: 0.95
    }).addTo(markerGroup);
    marker.bindPopup(`<strong>${place.name}</strong><br>${layer.label}`);
    marker.on("click", () => selectPlace(place.id));

    const button = document.createElement("button");
    button.className = `place-row ${state.activePlaceId === place.id ? "is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      ${buildPlaceThumb(place, layer)}
      <strong class="place-copy">
        <span class="place-title">${place.name}</span>
        ${buildPlaceRowMeta(place, layer)}
      </strong>
    `;
    button.addEventListener("click", () => selectPlace(place.id));
    placeList.appendChild(button);
  });
}

function buildPlaceThumb(place, layer) {
  if (place.image) {
    return `
      <span class="place-thumb has-image" style="--thumb-color:${layer.color}">
        <img src="${place.image}" alt="${place.name}" loading="lazy" decoding="async">
      </span>
    `;
  }
  const initial = place.name ? place.name.trim().charAt(0).toUpperCase() : "•";
  return `
    <span class="place-thumb is-fallback" style="--thumb-color:${layer.color}">
      <span aria-hidden="true">${initial}</span>
    </span>
  `;
}

function buildPlaceRowMeta(place, layer) {
  const r = richData(place);
  const quality = getDataQuality(place);

  if (state.mode === "manager") {
    const source = place.aprox ? "GPS aprox." : "GPS base";
    const trust = RNT[place.id] ? "RNT" : quality.label;
    return `
      <span class="place-meta">${layer.label} · ${place.vereda || "La Calera"}</span>
      <span class="place-flags">
        <span class="place-chip ${quality.status === "complete" ? "is-ok" : "is-warn"}">${trust}</span>
        <span class="place-chip">${source}</span>
        <span class="place-chip">${quality.score}% datos</span>
      </span>
    `;
  }

  const rating = typeof place.rating === "number" ? ` · ★ ${place.rating.toFixed(1)}` : "";
  const route = r.sendero ? ` · ${r.sendero.km} km` : "";
  return `
    <span class="place-meta">${layer.label} · ${place.vereda || "La Calera"}${rating}${route}</span>
    <span class="place-flags">
      ${RNT[place.id] ? '<span class="place-chip is-ok">RNT</span>' : ""}
      ${r.capacity ? `<span class="place-chip">${r.capacity.today} cupos</span>` : ""}
      ${place.phone ? '<span class="place-chip">WhatsApp</span>' : ""}
    </span>
  `;
}

function getDataQuality(place) {
  const checks = [
    Boolean(place.name),
    Boolean(place.description),
    typeof place.lat === "number" && typeof place.lng === "number",
    Boolean(place.vereda),
    Boolean(place.image),
    Boolean(place.phone || place.website || RNT[place.id]),
    !place.aprox
  ];
  const passed = checks.filter(Boolean).length;
  const score = Math.round((passed / checks.length) * 100);
  const status = score >= 72 ? "complete" : score >= 50 ? "review" : "draft";
  const label = status === "complete" ? "Completa" : status === "review" ? "Revisar" : "Borrador";
  return { score, status, label };
}

function buildRolePanel(place, r, isGestor, isVereda) {
  const quality = getDataQuality(place);
  const routeLabel = hasRoute(place.id) ? "GPS real" : r.sendero ? "Perfil estimado" : "Sin sendero";

  if (isGestor) {
    const tasks = [
      { ok: !place.aprox, label: place.aprox ? "Ajustar coordenada GPS" : "GPS verificado" },
      { ok: Boolean(place.image), label: place.image ? "Foto principal cargada" : "Agregar foto principal" },
      { ok: Boolean(place.phone || place.website || RNT[place.id]), label: "Contacto / RNT" },
      { ok: Boolean(place.description), label: "Descripción pública" }
    ];
    return `
      <div class="role-panel role-panel--manager">
        <div class="role-panel-head">
          <span>Modo gestor</span>
          <strong>${quality.label}</strong>
        </div>
        <div class="role-meter" aria-label="Calidad de datos ${quality.score}%">
          <span style="width:${quality.score}%"></span>
        </div>
        <div class="manager-checklist">
          ${tasks.map(task => `<span class="${task.ok ? "is-ok" : "is-warn"}">${task.ok ? ICONS.check : ICONS.tip}${task.label}</span>`).join("")}
        </div>
        <div class="manager-actions">
          <button type="button">Validar datos</button>
          <button type="button">Fuente pública</button>
          <button type="button">Programar visita</button>
        </div>
      </div>
    `;
  }

  if (isVereda) {
    return `
      <div class="role-panel role-panel--traveler">
        <div class="role-panel-head">
          <span>Territorio</span>
          <strong>Referencia local</strong>
        </div>
        <div class="role-grid">
          <span><b>${place.aprox ? "Aprox." : "GPS"}</b><small>Ubicación</small></span>
          <span><b>Vereda</b><small>Unidad territorial</small></span>
        </div>
      </div>
    `;
  }

  return `
    <div class="role-panel role-panel--traveler">
      <div class="role-panel-head">
        <span>Para decidir</span>
        <strong>${routeLabel}</strong>
      </div>
      <div class="role-grid">
        <span><b>${r.sendero ? r.sendero.dur : "Abierto"}</b><small>Tiempo</small></span>
        <span><b>${r.capacity ? r.capacity.today : "Mapa"}</b><small>${r.capacity ? "Cupos hoy" : "Cómo llegar"}</small></span>
        <span><b>${r.huella.kg} kg</b><small>CO₂e estimado</small></span>
      </div>
    </div>
  `;
}

const PROFILE_PATH = "M10 86 L48 78 L86 64 L120 70 L156 52 L196 38 L236 26 L290 16";
const PROFILE_FILL = "M10 86 L48 78 L86 64 L120 70 L156 52 L196 38 L236 26 L290 16 L290 99 L10 99 Z";

function richData(p) {
  const id = p.id, L = p.layerId;
  const showSendero = (L === "naturaleza" || L === "aventura" || L === "rutas") && L !== "servicios";
  const badges = ["Verificado"];
  if (id % 2 === 1) badges.push("Comunitario");
  const acc = id % 3 === 0 ? "parcial" : (id % 3 === 1 ? "total" : null);
  const cur = 5 + (id % 6);
  return {
    badges, acc,
    reviews: 12 + (id * 7) % 38,
    distKm: (3 + (id % 9) * 2.1).toFixed(0),
    tags: (p.activities && p.activities.length) ? p.activities : (TAG_MAP[L] || ["Turismo"]),
    sendero: (typeof ROUTE_META !== "undefined" && ROUTE_META[id]) ? ROUTE_META[id] : (showSendero ? {
      km: (1.4 + (id % 7) * 0.5).toFixed(1), dif: ["Suave", "Moderada", "Exigente"][id % 3],
      dur: (1.5 + (id % 5) * 0.4).toFixed(1) + " h", min: 2400 + (id % 9) * 30, max: 2600 + (id % 9) * 35, desnivel: 180 + (id % 9) * 15
    } : null),
    capacity: showSendero ? { cur, max: 12, today: Math.max(1, 12 - cur) } : null,
    huella: { kg: (2 + (id % 9) * 0.3).toFixed(1).replace(".", ","), pct: 55 + (id * 4) % 30 },
    mit: ["Transporte compartido", "Insumos locales", "Cero plásticos", "1 árbol / visitante"].slice(0, 2 + id % 3)
  };
}

function hasRoute(id) { return typeof ROUTES !== "undefined" && ROUTES[id]; }

function drawRoute(place) {
  routeLayer.clearLayers();
  const line = hasRoute(place.id);
  if (!line) return;
  // Brandbook: "nodos y rutas" - casing Vital + traza Esmeralda + nodos inicio/fin
  L.polyline(line, { color: "#7BD14E", weight: 7, opacity: 0.45, lineJoin: "round", lineCap: "round" }).addTo(routeLayer);
  L.polyline(line, { color: "#0E5E5C", weight: 3.5, opacity: 0.96, lineJoin: "round", lineCap: "round" }).addTo(routeLayer);
  const a = line[0], b = line[line.length - 1];
  L.circleMarker(a, { radius: 6, color: "#fff", weight: 2, fillColor: "#7BD14E", fillOpacity: 1 }).addTo(routeLayer).bindPopup("Inicio del sendero");
  L.circleMarker(b, { radius: 6, color: "#fff", weight: 2, fillColor: "#0E5E5C", fillOpacity: 1 }).addTo(routeLayer).bindPopup("Fin del sendero");
  map.fitBounds(L.polyline(line).getBounds(), { padding: [70, 70], maxZoom: 16 });
  updateZones();
}

function clearRoute() { routeLayer.clearLayers(); updateZones(); }

function selectPlace(placeId) {
  const place = places.find(item => item.id === placeId);
  if (!place) return;
  const layer = getLayer(place.layerId);
  const r = richData(place);
  const isGestor = state.mode === "manager";
  const isVereda = place.layerId === "veredas";
  state.activePlaceId = placeId;
  if (hasRoute(place.id)) {
    drawRoute(place);
  } else {
    clearRoute();
    map.flyTo([place.lat, place.lng], Math.max(map.getZoom(), 14), { duration: 0.6 });
  }
  updateZones();

  const mediaStyle = place.image
    ? `--cat:${layer.color}; background-image:url('${place.image}');`
    : `--cat:${layer.color};`;

  const leftBadges = r.badges.map((b, i) =>
    i === 0
      ? `<span class="tsb-badge tsb-badge--impact">${ICONS.shield}${b}</span>`
      : `<span class="tsb-badge tsb-badge--light">${ICONS.users}${b}</span>`
  ).join("");
  const accBadge = r.acc ? `<span class="tsb-badge tsb-badge--warn">${ICONS.access}Accesible: ${r.acc}</span>` : "";
  const tagsHtml = r.tags.map(t => `<span class="tsb-tag">${t}</span>`).join("");
  const rolePanel = buildRolePanel(place, r, isGestor, isVereda);

  let dataSection = "";
  if (!isVereda && r.sendero) {
    const s = r.sendero;
    dataSection += `
      <div class="ficha-sec">
        <div class="ficha-sec-head">
          <span class="ficha-sec-label">Perfil del recorrido</span>
          <span class="ficha-sec-meta"><span class="v">${s.km} km</span> · ${s.dif} · ${s.dur}</span>
        </div>
        <svg class="ficha-prof" viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs><linearGradient id="alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#7BD14E" stop-opacity="0.32"/>
            <stop offset="1" stop-color="#7BD14E" stop-opacity="0"/></linearGradient></defs>
          <line x1="0" y1="99" x2="300" y2="99" stroke="#CBD5CF" stroke-width="1"/>
          <path d="${PROFILE_FILL}" fill="url(#alt)"/>
          <path d="${PROFILE_PATH}" fill="none" stroke="#0E5E5C" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="10" cy="86" r="3" fill="#0E5E5C"/>
          <circle cx="290" cy="16" r="3.5" fill="#5FB236" stroke="#fff" stroke-width="1.5"/>
        </svg>
        <div class="ficha-prof-foot">
          <span>${s.min.toLocaleString("es")} msnm</span>
          <span>Desnivel <span class="v">+${s.desnivel} m</span></span>
          <span>${s.max.toLocaleString("es")} msnm</span>
        </div>
      </div>`;
  }
  if (!isVereda && r.capacity) {
    const c = r.capacity, pct = Math.round((c.cur / c.max) * 100);
    dataSection += `
      <div class="ficha-sec">
        <div class="ficha-cap-row">
          <span style="display:inline-flex;align-items:center;gap:6px">${ICONS.foot}Capacidad de carga</span>
          <span class="v">${c.cur} / ${c.max} por salida</span>
        </div>
        <div class="tsb-meter"><div class="tsb-meter__fill" style="width:${pct}%"></div></div>
        <div class="ficha-cap-ok">${ICONS.check}${c.today} cupos disponibles hoy</div>
      </div>`;
  }
  if (isVereda || !r.sendero) {
    const rows = [];
    if (place.vereda) rows.push(`<div class="ficha-meta-row">${ICONS.pin}<span><span class="k">Vereda:</span> ${place.vereda}</span></div>`);
    if (place.schedule) rows.push(`<div class="ficha-meta-row">${ICONS.clock}<span><span class="k">Horario:</span> ${place.schedule}</span></div>`);
    if (place.phone) rows.push(`<div class="ficha-meta-row">${ICONS.phone}<a href="tel:${place.phone.replace(/\s+/g, "")}">${place.phone}</a></div>`);
    if (place.website) rows.push(`<div class="ficha-meta-row">${ICONS.globe}<a href="${place.website}" target="_blank" rel="noreferrer">Sitio web</a></div>`);
    if (rows.length) dataSection += `<div class="ficha-sec"><div class="ficha-meta">${rows.join("")}</div></div>`;
  }

  const huella = isVereda ? "" : `
    <div class="ficha-huella">
      <div>
        <div class="lbl">Huella estimada / visitante</div>
        <div class="big">${r.huella.kg} <span class="u">kg CO₂e</span></div>
      </div>
      <span class="tsb-badge tsb-badge--impact" style="font-size:13px;padding:5px 11px">${ICONS.trend}−${r.huella.pct}% vs promedio</span>
    </div>`;

  const mit = isVereda ? "" : `
    <div class="ficha-mit">
      <div class="mlabel">Compromisos del prestador</div>
      <div class="chips">${r.mit.map(m => `<span class="chip">${ICONS.leaf}${m}</span>`).join("")}</div>
    </div>`;

  const tip = place.tips
    ? `<div class="ficha-tip">${ICONS.tip}<span>${isGestor ? "Nota de gestión: " : ""}${place.tips}</span></div>`
    : "";
  const aprox = place.aprox
    ? `<div class="ficha-tip">${ICONS.tip}<span>Ubicación aproximada (referente del mapa oficial). Ajustar con GPS.</span></div>`
    : "";

  const rnt = RNT[place.id];
  const rntChip = rnt ? `<button class="ficha-rnt" type="button">${ICONS.shield}Prestador con RNT · ${rnt}</button>` : "";
  const itin = ITINERARIES[place.id];
  const carousel = itin ? `<div class="ficha-sec">${buildCarousel(itin)}</div>` : "";
  const reserveHref = place.website || `https://maps.google.com/?q=${place.lat},${place.lng}`;
  const waHref = place.phone ? `https://wa.me/${place.phone.replace(/[^0-9]/g, "")}` : null;
  const cta = isGestor
    ? `<div class="ficha-cta">
         <a class="tsb-btn tsb-btn--accent" href="https://maps.google.com/?q=${place.lat},${place.lng}" target="_blank" rel="noreferrer">${ICONS.map}Cómo llegar</a>
         <a class="tsb-btn tsb-btn--secondary" href="#" onclick="return false">${ICONS.edit}Editar ficha</a>
       </div>`
    : `<div class="ficha-cta">
         <a class="tsb-btn tsb-btn--accent" href="${reserveHref}" target="_blank" rel="noreferrer">${isVereda ? "Ver en mapa" : "Reservar"}${ICONS.arrow}</a>
         ${waHref ? `<a class="tsb-btn tsb-btn--secondary" style="padding:0 13px" href="${waHref}" target="_blank" rel="noreferrer" aria-label="WhatsApp">${ICONS.msg}</a>` : ""}
         <a class="tsb-btn tsb-btn--ghost" style="padding:0 12px" href="https://maps.google.com/?q=${place.lat},${place.lng}" target="_blank" rel="noreferrer">Mapa</a>
       </div>`;

  detail.hidden = false;
  detail.classList.add("is-ficha");
  detail.innerHTML = `
    <article class="ficha ${isGestor ? "ficha--gestor" : "ficha--viajero"}">
      <button class="ficha-close" type="button" aria-label="Cerrar ficha">&times;</button>
      <div class="ficha-media" style="${mediaStyle}">
        <div class="ficha-badges">
          <div class="grp">${leftBadges}</div>
          ${accBadge}
        </div>
        ${typeof place.rating === "number" ? `<div class="ficha-rating2">${ICONS.star}${place.rating.toFixed(1)}<span class="rev">· ${r.reviews} reseñas</span></div>` : ""}
      </div>
      <div class="ficha-body2">
        <div class="ficha-eyebrow2">${layer.label}</div>
        <h2 class="ficha-h">${place.name}</h2>
        <div class="ficha-loc2">${ICONS.pin}<span>${place.vereda || "La Calera, Cundinamarca"}</span><span style="color:var(--border-strong)">·</span><span class="km">${r.distKm} km</span></div>
        ${place.description ? `<p class="ficha-desc2">${place.description}</p>` : ""}
        <div class="ficha-tags">${tagsHtml}</div>
        ${rolePanel}
        ${rntChip}
        ${carousel}
        ${dataSection}
        ${huella}
        ${mit}
        ${tip}
        ${aprox}
        ${cta}
      </div>
    </article>
  `;
  detail.querySelector(".ficha-close").addEventListener("click", closeDetail);
  const rntBtn = detail.querySelector(".ficha-rnt");
  if (rntBtn) rntBtn.addEventListener("click", function () { openRnt(place); });
  initCarousel(detail.querySelector(".ficha-carousel"));
  if (isMobileLayout()) setMobilePanel("detail");
  renderPlaces();
  updateZones();
}

function closeDetail() {
  detail.hidden = true;
  detail.classList.remove("is-ficha");
  state.activePlaceId = null;
  clearRoute();
  if (isMobileLayout()) setMobilePanel("places");
  renderPlaces();
  updateZones();
}

function openRnt(place) {
  const card = document.querySelector("#rnt-card");
  card.innerHTML =
    '<button class="mini-close" id="rnt-close" aria-label="Cerrar">&times;</button>' +
    '<div class="mini-seal">' + ICONS.shield + '</div>' +
    '<p class="mini-eyebrow">Registro Nacional de Turismo</p>' +
    '<h3>' + place.name + '</h3>' +
    '<p class="mini-desc">Prestador de servicios turísticos inscrito y activo ante el RNT.</p>' +
    '<div class="mini-rnt"><span>RNT N°</span><strong>' + RNT[place.id] + '</strong></div>' +
    '<div><span class="mini-badge">Vigente</span></div>';
  document.querySelector("#rnt-modal").hidden = false;
  document.querySelector("#rnt-close").addEventListener("click", closeRnt);
}
function closeRnt() { document.querySelector("#rnt-modal").hidden = true; }

function buildCarousel(items) {
  const slides = items.map(function (it) {
    return '<article class="fc-slide"><span class="fc-step">' + it.t + '</span><h4>' + it.h + '</h4><p>' + it.d + '</p></article>';
  }).join("");
  const dots = items.map(function (it, i) {
    return '<button class="fc-dot' + (i === 0 ? ' is-on' : '') + '" type="button" aria-label="Paso ' + (i + 1) + '"></button>';
  }).join("");
  return '<div class="ficha-carousel">' +
    '<div class="fc-head"><span class="ficha-sec-label">Itinerario</span><span class="fc-count">1 / ' + items.length + '</span></div>' +
    '<div class="fc-viewport"><div class="fc-track">' + slides + '</div></div>' +
    '<div class="fc-nav"><button class="fc-prev" type="button" aria-label="Anterior">&#8249;</button><div class="fc-dots">' + dots + '</div><button class="fc-next" type="button" aria-label="Siguiente">&#8250;</button></div></div>';
}

function initCarousel(el) {
  if (!el) return;
  const track = el.querySelector(".fc-track");
  const slides = track.children.length;
  const dots = el.querySelectorAll(".fc-dot");
  const count = el.querySelector(".fc-count");
  let idx = 0;
  function go(n) {
    idx = (n + slides) % slides;
    track.style.transform = "translateX(" + (-idx * 100) + "%)";
    if (count) count.textContent = (idx + 1) + " / " + slides;
    dots.forEach(function (d, i) { d.classList.toggle("is-on", i === idx); });
  }
  el.querySelector(".fc-prev").addEventListener("click", function () { go(idx - 1); });
  el.querySelector(".fc-next").addEventListener("click", function () { go(idx + 1); });
  dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });
}

function getAllowedLayers() {
  return layers.filter(layer => layer.roles.includes(state.mode));
}

function getVisiblePlaces() {
  const allowed = new Set(getAllowedLayers().map(layer => layer.id));
  return places.filter(place => {
    const text = `${place.name} ${place.description ?? ""} ${place.vereda ?? ""}`.toLowerCase();
    return allowed.has(place.layerId) && state.activeLayers[place.layerId] && text.includes(state.query);
  });
}

function getLayer(layerId) {
  return layers.find(layer => layer.id === layerId) ?? layers[0];
}

/* ===== Estadísticas por perfil (Gestor / Prestador) — datos demo ===== */
state.statsProfile = "gestor";
state.statsPrestadorId = null;

function openStats() {
  if (!state.statsPrestadorId) {
    const first = places.find(p => p.layerId === "gastronomia" || p.layerId === "alojamiento");
    state.statsPrestadorId = first ? first.id : null;
  }
  state.statsProfile = state.statsProfile || "gestor";
  renderStats();
  statsModal.hidden = false;
}

function genMonthly(seed, base) {
  const out = [];
  for (let i = 0; i < 12; i++) {
    const f = 0.65 + 0.35 * Math.sin((i + seed) / 1.9) + ((seed * 7 + i * 13) % 11) / 30;
    out.push(Math.max(30, Math.round(base * f)));
  }
  return out;
}

function barRows(items) {
  const max = Math.max(1, ...items.map(i => i.value));
  return '<div class="st-bars">' + items.map(i =>
    '<div class="st-bar"><span class="st-bar-l" title="' + i.label + '">' + i.label + '</span>' +
    '<span class="st-bar-track"><span class="st-bar-fill" style="width:' + Math.round(i.value / max * 100) + '%;background:' + (i.color || "#0E5E5C") + '"></span></span>' +
    '<span class="st-bar-v">' + i.value + '</span></div>'
  ).join("") + '</div>';
}

function lineChart(values, color) {
  const w = 520, h = 132, pad = 10;
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = pad + i * (w - pad * 2) / (values.length - 1);
    const y = h - 22 - (v - min) / ((max - min) || 1) * (h - 42);
    return [x, y];
  });
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = "M" + pts[0][0].toFixed(1) + " " + (h - 22) + " " + line.slice(1) + " L" + pts[pts.length - 1][0].toFixed(1) + " " + (h - 22) + " Z";
  const labels = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const lab = pts.map((p, i) => '<text x="' + p[0].toFixed(1) + '" y="' + (h - 5) + '" text-anchor="middle" font-size="9" fill="rgba(234,241,236,.5)" font-family="JetBrains Mono, monospace">' + labels[i] + '</text>').join("");
  const dots = pts.map(p => '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="2.4" fill="' + color + '"/>').join("");
  return '<svg class="st-line" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none">' +
    '<defs><linearGradient id="stg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + color + '" stop-opacity="0.28"/><stop offset="1" stop-color="' + color + '" stop-opacity="0"/></linearGradient></defs>' +
    '<path d="' + area + '" fill="url(#stg)"/><path d="' + line + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round"/>' + dots + lab + '</svg>';
}

function kpi(label, value, sub) {
  return '<article class="st-kpi"><span class="st-kpi-l">' + label + '</span><strong class="st-kpi-v">' + value + '</strong>' + (sub ? '<span class="st-kpi-s">' + sub + '</span>' : "") + '</article>';
}

function statsTabs() {
  return '<div class="st-tabs" role="tablist">' +
    '<button class="st-tab ' + (state.statsProfile === "gestor" ? "is-active" : "") + '" data-sp="gestor">Gestor</button>' +
    '<button class="st-tab ' + (state.statsProfile === "prestador" ? "is-active" : "") + '" data-sp="prestador">Prestador</button></div>';
}

function renderStats() {
  const body = document.querySelector("#stats-body");
  body.innerHTML = state.statsProfile === "gestor" ? statsGestor() : statsPrestador();
  body.querySelectorAll("[data-sp]").forEach(b => b.addEventListener("click", () => { state.statsProfile = b.dataset.sp; renderStats(); }));
  const sel = body.querySelector("#st-prest");
  if (sel) sel.addEventListener("change", () => { state.statsPrestadorId = Number(sel.value); renderStats(); });
}

function statsGestor() {
  const rated = places.filter(p => typeof p.rating === "number");
  const avg = (rated.reduce((t, p) => t + p.rating, 0) / rated.length).toFixed(1);
  const activeLayers = Object.values(state.activeLayers).filter(Boolean).length;
  const perCat = layers.map(l => ({ label: l.label, value: places.filter(p => p.layerId === l.id).length, color: l.color }));
  const top = rated.slice().sort((a, b) => b.rating - a.rating).slice(0, 5).map(p => ({ label: p.name, value: p.rating, color: getLayer(p.layerId).color }));
  const monthly = genMonthly(3, 820);
  return statsTabs() +
    '<p class="eyebrow">Panel gestor · territorio</p><h1>Indicadores de La Calera</h1>' +
    '<div class="st-kpis">' +
      kpi("Lugares", places.length) +
      kpi("Categorías activas", activeLayers + " / " + layers.length) +
      kpi("Rating promedio", avg) +
      kpi("Visitas año", "9.920") + '</div>' +
    '<div class="st-2col">' +
      '<section class="st-card"><h2>Visitas por mes</h2>' + lineChart(monthly, "#7BD14E") + '</section>' +
      '<section class="st-card"><h2>Lugares por categoría</h2>' + barRows(perCat) + '</section></div>' +
    '<section class="st-card"><h2>Top atractivos por rating</h2>' + barRows(top) + '</section>';
}

function statsPrestador() {
  const prest = places.filter(p => p.layerId === "gastronomia" || p.layerId === "alojamiento");
  const p = places.find(x => x.id === state.statsPrestadorId) || prest[0];
  const id = p.id;
  const r = richData(p);
  const visits = genMonthly(id, 120);
  const total = visits.reduce((a, b) => a + b, 0);
  const ranked = prest.slice().sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const rank = ranked.findIndex(x => x.id === p.id) + 1;
  const reservas = 30 + (id * 11) % 90;
  const wa = 15 + (id * 7) % 60;
  const conv = Math.round((reservas / total) * 1000) / 10;
  const options = prest.map(x => '<option value="' + x.id + '"' + (x.id === p.id ? " selected" : "") + '>' + x.name + '</option>').join("");
  return statsTabs() +
    '<p class="eyebrow">Panel prestador</p><h1>Mi desempeño</h1>' +
    '<select id="st-prest" class="st-select" aria-label="Elegir prestador">' + options + '</select>' +
    '<div class="st-kpis">' +
      kpi("Visitas al perfil", total.toLocaleString("es"), "último año") +
      kpi("Rating", (p.rating || 0).toFixed(1), r.reviews + " reseñas") +
      kpi("Ranking", "#" + rank + " / " + prest.length, "prestadores") +
      kpi("Conversión", conv + "%", "visita a reserva") + '</div>' +
    '<div class="st-2col">' +
      '<section class="st-card"><h2>Visitas por mes</h2>' + lineChart(visits, "#0E5E5C") + '</section>' +
      '<section class="st-card"><h2>Acciones</h2>' + barRows([
        { label: "Clic Reservar", value: reservas, color: "#7BD14E" },
        { label: "Clic WhatsApp", value: wa, color: "#0E5E5C" },
        { label: "Ver mapa", value: Math.round(total * 0.2), color: "#A9B23F" }
      ]) + '</section></div>';
}

render();
