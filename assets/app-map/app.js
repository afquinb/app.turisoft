const MAP_CENTER = [4.7208, -73.9693];

/* Categorías derivadas del mapa oficial "La Calera.travel".
   Ver REFERENTE-mapa-lacalera.md. Coordenadas APROXIMADAS por sector. */
const layers = [
  { id: "naturaleza",  label: "Naturaleza y paisaje",        color: "#22c55e", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "aventura",    label: "Aventura y deportes",         color: "#f97316", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "rutas",       label: "Rutas y senderos",            color: "#2dd4bf", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "cultura",     label: "Cultura y patrimonio",        color: "#a855f7", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "gastronomia", label: "Gastronomía",                 color: "#f59e0b", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "alojamiento", label: "Alojamiento y camping",       color: "#38bdf8", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "servicios",   label: "Servicios",                   color: "#64748b", defaultOn: true,  roles: ["traveler", "manager"] },
  { id: "veredas",     label: "Veredas y centros poblados",  color: "#14b8a6", defaultOn: false, roles: ["manager"] },
  { id: "uso",         label: "Uso del territorio",          color: "#D64545", defaultOn: true,  roles: ["manager"], zones: true }
];

const attractions = [
  { id: 1, name: "La Calera · Casco Urbano", layerId: "cultura", vereda: "Casco urbano", lat: 4.7208, lng: -73.9693, rating: 4.6,
    activities: ["Patrimonio", "Gastronomía", "Punto de partida"],
    description: "Centro histórico y punto cero para iniciar recorridos, tomar café local y conectar con las rutas rurales.",
    tips: "Ideal como punto de señalización turística y códigos QR.", image: "./photos/parque-principal.jpg" },
  { id: 2, name: "Embalse San Rafael", layerId: "naturaleza", vereda: "San Rafael", lat: 4.7520, lng: -73.9920, rating: 4.8,
    activities: ["Caminatas", "Paisaje", "Avistamiento"],
    description: "Embalse de alto valor escénico asociado al agua, la montaña y la vista regional.",
    tips: "Verificar condiciones de acceso. Gran potencial para contemplación e interpretación ambiental.", image: "./photos/embalse-san-rafael.jpg" },
  { id: 3, name: "Cerro de la Pita · Parapente", layerId: "aventura", vereda: "La Toma", lat: 4.7350, lng: -73.9850, rating: 4.7,
    activities: ["Parapente", "Escalada", "Mirador"],
    description: "Cerro emblemático para vuelo en parapente y deportes de altura con panorámicas del valle." },
  { id: 4, name: "Pictogramas Indígenas", layerId: "cultura", vereda: "La Toma", lat: 4.7300, lng: -73.9760, rating: 4.5,
    activities: ["Patrimonio", "Arte rupestre"],
    description: "Vestigios de arte rupestre muisca; valor arqueológico y cultural del territorio." },
  { id: 5, name: "Ruinas Indígenas", layerId: "cultura", vereda: "San José de la Concepción", lat: 4.7600, lng: -73.9650, rating: 4.3,
    activities: ["Patrimonio", "Historia"],
    description: "Referente histórico precolombino dentro del corredor norte del municipio." },
  { id: 6, name: "Peña de las Águilas", layerId: "rutas", vereda: "Buenos Aires La Epifanía", lat: 4.73869, lng: -73.95158, rating: 4.6, route: true,
    activities: ["Escalada", "Mirador", "Cerro"],
    description: "Formación rocosa para escalada y observación de aves rapaces." },
  { id: 7, name: "Cascadas Tunjaque", layerId: "naturaleza", vereda: "Jerusalén", lat: 4.6650, lng: -73.9400, rating: 4.7,
    activities: ["Caminatas", "Cascada", "Baño"],
    description: "Conjunto de saltos de agua en el sur del municipio, rodeados de bosque.", image: "./photos/ruta-el-hato.jpg" },
  { id: 8, name: "Cascada Mundo Nuevo", layerId: "naturaleza", vereda: "Mundo Nuevo", lat: 4.6700, lng: -73.8950, rating: 4.5,
    activities: ["Caminatas", "Cascada"],
    description: "Salto de agua en el sector sur-oriental, cercano al límite con Fómeque." },
  { id: 9, name: "Peña Tunjaque", layerId: "naturaleza", vereda: "Tunjaque", lat: 4.6700, lng: -73.9450, rating: 4.4,
    activities: ["Escalada", "Cerro", "Mirador"],
    description: "Peñasco con rutas de escalada y vistas hacia el sur del territorio." },
  { id: 10, name: "Cerro Verde", layerId: "naturaleza", vereda: "El Volcán", lat: 4.7050, lng: -73.9300, rating: 4.5,
    activities: ["Caminatas", "Cerro", "Mirador"],
    description: "Cerro de la zona central-sur, ideal para caminatas de medio día." },
  { id: 11, name: "Humedal La Chucua", layerId: "naturaleza", vereda: "La Polonia", lat: 4.6900, lng: -73.8950, rating: 4.3,
    activities: ["Avistamiento", "Ecosistema"],
    description: "Humedal con biodiversidad asociada al límite con Fómeque." },
  { id: 12, name: "Laguna Brava", layerId: "naturaleza", vereda: "La Jangada", lat: 4.6800, lng: -73.8980, rating: 4.4,
    activities: ["Paisaje", "Avistamiento"],
    description: "Espejo de agua natural en el sector oriental del municipio." },
  { id: 13, name: "Mirador de la vía a Bogotá", layerId: "naturaleza", vereda: "Camino al Meta", lat: 4.6968, lng: -74.0003, rating: 4.7,
    activities: ["Mirador", "Fotografía"],
    description: "Parada con visuales amplias hacia el borde oriental de Bogotá.",
    tips: "Requiere manejo de parqueo y seguridad vial.", image: "./photos/mirador-bogota.jpg" },
  { id: 14, name: "Avistamiento de fauna · Guasca", layerId: "naturaleza", vereda: "San Cayetano", lat: 4.7500, lng: -73.9100, rating: 4.5,
    activities: ["Avistamiento", "Naturaleza"],
    description: "Sector de páramo y bosque alto con presencia de fauna nativa hacia el límite con Guasca." },
  { id: 15, name: "Zona Trial 4x4 · Cuatrimotos", layerId: "aventura", vereda: "El Rodeo", lat: 4.7150, lng: -73.9500, rating: 4.6,
    activities: ["Trial 4x4", "Cuatrimotos", "Enduro", "Buggies"],
    description: "Corredor de motorsport y vehículos todo terreno por vías terciarias." },
  { id: 16, name: "Ciclomontañismo · La Portada", layerId: "aventura", vereda: "La Portada", lat: 4.7250, lng: -73.9550, rating: 4.5,
    activities: ["Ciclomontañismo", "Enduro"],
    description: "Circuitos de bicicleta de montaña por el centro del municipio." },
  { id: 17, name: "Cabalgatas El Salitre", layerId: "aventura", vereda: "El Salitre", lat: 4.6850, lng: -73.9650, rating: 4.4,
    activities: ["Cabalgatas", "Paisaje"],
    description: "Recorridos a caballo por paisajes rurales del sur." },
  { id: 18, name: "Camping Buenos Aires Los Pinos", layerId: "alojamiento", vereda: "Buenos Aires Los Pinos", lat: 4.7250, lng: -73.9120, rating: 4.4,
    activities: ["Camping", "Caminatas"],
    description: "Zona de acampada y senderismo en el sector centro-oriental." },
  { id: 19, name: "Hacienda Marquez · Eventos", layerId: "cultura", vereda: "San José del Triunfo", lat: 4.7800, lng: -73.9650, rating: 4.5,
    activities: ["Eventos", "Patrimonio"],
    description: "Hacienda para eventos y referente del corredor norte (San José del Triunfo)." },
  { id: 20, name: "Iglesia de Tierra Nueva", layerId: "cultura", vereda: "Aurora Alta", lat: 4.7850, lng: -73.9900, rating: 4.3,
    activities: ["Patrimonio", "Religioso"],
    description: "Templo del centro poblado de Tierra Nueva, al noroccidente." },
  { id: 21, name: "Iglesia de Mundo Nuevo", layerId: "cultura", vereda: "Mundo Nuevo", lat: 4.6700, lng: -73.8900, rating: 4.2,
    activities: ["Patrimonio", "Religioso"],
    description: "Templo del centro poblado de Mundo Nuevo, al suroriente." },
  { id: 22, name: "Café de montaña", layerId: "gastronomia", vereda: "Casco urbano", lat: 4.7241, lng: -73.9676, rating: 4.4,
    phone: "+57 300 000 0000", activities: ["Café", "Cocina local"],
    description: "Prestador gastronómico de ejemplo para probar fichas, contacto y activación digital.",
    tips: "Reemplazar por un negocio real con la base oficial.", image: "./photos/cafe-montana.jpg" },
  { id: 23, name: "Ruta Gastronómica · Vía Principal", layerId: "gastronomia", vereda: "El Líbano", lat: 4.7100, lng: -73.9850, rating: 4.5,
    activities: ["Gastronomía", "Paisaje"],
    description: "Corredor de restaurantes sobre la vía principal Bogotá–La Calera con variada oferta de comida." },
  { id: 24, name: "Hospedaje rural · El Hato", layerId: "alojamiento", vereda: "El Hato", lat: 4.7000, lng: -74.0100, rating: 4.3,
    phone: "+57 310 000 0000", website: "https://turisoft.org/", activities: ["Alojamiento", "Naturaleza"],
    description: "Alojamiento rural de ejemplo cerca de Piedra Iglesia y la vía a Bogotá.",
    tips: "Reemplazar con datos verificados antes de publicar.", image: "./photos/hospedaje-rural.jpg" },
  { id: 25, name: "Punto de información turística", layerId: "servicios", vereda: "Casco urbano", lat: 4.7203, lng: -73.9701, rating: 4.2,
    activities: ["Información", "Atención"],
    description: "Atención al visitante, inventario y coordinación de información turística.",
    tips: "Capa de apoyo para gestores.", image: "./photos/punto-informacion.jpg" },
  { id: 26, name: "Peaje · vía a Bogotá", layerId: "servicios", vereda: "Camino al Meta", lat: 4.6950, lng: -74.0150,
    activities: ["Peaje"],
    description: "Punto de peaje sobre el corredor vial hacia Bogotá (Calle 85 · Carrera 7)." },
  { id: 27, name: "Estación de Servicio", layerId: "servicios", vereda: "Casco urbano", lat: 4.7180, lng: -73.9720,
    activities: ["Combustible"],
    description: "Estación de servicio para abastecimiento de combustible en el casco urbano." }
];

/* Las 30 veredas del municipio (coordenadas aproximadas por sector). */
const VEREDAS = [
  ["Altamar", 4.740, -73.945], ["Aurora Alta", 4.785, -73.990], ["Aurora Baja", 4.778, -73.992],
  ["Buenos Aires La Epifanía", 4.722, -73.930], ["Buenos Aires Los Pinos", 4.726, -73.912], ["Camino al Meta", 4.690, -74.000],
  ["El Hato", 4.700, -74.010], ["El Líbano", 4.712, -73.990], ["El Manzano", 4.690, -73.900],
  ["El Rodeo", 4.715, -73.960], ["El Salitre", 4.682, -73.962], ["El Volcán", 4.702, -73.930],
  ["Frailejonal", 4.675, -73.950], ["Jerusalén", 4.668, -73.942], ["La Hoya", 4.652, -73.935],
  ["La Jangada", 4.660, -73.912], ["La Junia", 4.642, -73.930], ["La Polonia", 4.682, -73.910],
  ["La Portada", 4.725, -73.952], ["La Toma", 4.742, -73.988], ["Marquez", 4.790, -73.972],
  ["Mundo Nuevo", 4.672, -73.892], ["Quisquiza", 4.690, -73.922], ["San Cayetano", 4.762, -73.930],
  ["San José de la Concepción", 4.762, -73.978], ["San José del Triunfo", 4.780, -73.962], ["San Rafael", 4.732, -73.992],
  ["Santa Helena", 4.722, -73.978], ["Treinta y Seis", 4.662, -73.940], ["Tunjaque", 4.660, -73.928]
];

const veredaPlaces = VEREDAS.map((v, i) => ({
  id: 100 + i, name: "Vereda " + v[0], layerId: "veredas", vereda: v[0], lat: v[1], lng: v[2],
  activities: ["Vereda", "Territorio"],
  description: "Vereda del municipio de La Calera. Unidad territorial para gestión, inventario y planeación turística.",
  aprox: true
}));

const places = attractions.concat(veredaPlaces);

const state = {
  mode: "traveler",
  query: "",
  activePlaceId: null,
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
const ZONES = [
  { type: "permitido",   name: "Zona de visita permitida",                coords: [[4.715,-73.985],[4.732,-73.982],[4.736,-73.958],[4.712,-73.952],[4.702,-73.968]] },
  { type: "restringido", name: "Acceso restringido (motorsport / cantera)", coords: [[4.705,-73.945],[4.722,-73.935],[4.720,-73.908],[4.690,-73.912],[4.688,-73.935]] },
  { type: "sensible",    name: "Ecosistema sensible (páramo y agua)",      coords: [[4.742,-74.000],[4.760,-73.985],[4.752,-73.962],[4.733,-73.973]] }
];
const ZONE_STYLE = {
  permitido:   { color: "#2F9E5B", weight: 2, dashArray: null,  className: "zone-permitido" },
  restringido: { color: "#E0A100", weight: 2, dashArray: "6 5", className: "zone-restringido" },
  sensible:    { color: "#D64545", weight: 2, dashArray: "2 7", className: "zone-sensible" }
};
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
const statsButton = document.querySelector("#stats-button");
const statsModal = document.querySelector("#stats");

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach(item => item.classList.toggle("is-active", item === button));
    statsButton.hidden = state.mode !== "manager";
    if (state.activePlaceId) selectPlace(state.activePlaceId);
    render();
    updateZones();
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
  renderLayers();
  renderPlaces();
  updateZones();
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
      <span class="dot" style="background:${layer.color}"></span>
      <strong>${place.name}<span>${layer.label}</span></strong>
    `;
    button.addEventListener("click", () => selectPlace(place.id));
    placeList.appendChild(button);
  });
}

const ICONS = {
  pin: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  star: '<svg width="15" height="15" viewBox="0 0 24 24" fill="#7BD14E" stroke="#7BD14E" stroke-width="1.5" stroke-linejoin="round"><polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"/></svg>',
  clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  phone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.1 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z"/></svg>',
  globe: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/></svg>',
  map: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/></svg>',
  shield: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
  users: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/></svg>',
  access: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="1.6"/><path d="M5 7h14M12 7v6m0 0 3 6m-3-6-3 6"/></svg>',
  foot: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16a2 2 0 1 0 4 0c0-1-.5-2-1-3s-1-2-1-4a2 2 0 1 1 4 0c0 3-2 5-2 7"/><path d="M16 18a2 2 0 1 0 4 0c0-1-.5-2-1-3s-1-2-1-4a2 2 0 1 1 4 0c0 3-2 5-2 7"/></svg>',
  check: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m9 12 2 2 4-4"/></svg>',
  trend: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17 13.5 8.5l-4 4L2 5"/><path d="M16 17h6v-6"/></svg>',
  leaf: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 7-11 16-11 0 9-5 16-11 16Z"/><path d="M4 21c2-4 5-7 9-9"/></svg>',
  arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  msg: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12 7.5L3 21l2-6a8.4 8.4 0 1 1 16-3.5Z"/></svg>',
  edit: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  tip: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z"/><path d="M9 21h6"/></svg>'
};

const PROFILE_PATH = "M10 86 L48 78 L86 64 L120 70 L156 52 L196 38 L236 26 L290 16";
const PROFILE_FILL = "M10 86 L48 78 L86 64 L120 70 L156 52 L196 38 L236 26 L290 16 L290 99 L10 99 Z";

const TAG_MAP = {
  naturaleza: ["Naturaleza", "Paisaje"], aventura: ["Aventura", "Aire libre"],
  rutas: ["Sendero", "Caminata"], cultura: ["Patrimonio", "Cultura"], gastronomia: ["Gastronomía", "Café"],
  alojamiento: ["Descanso", "Naturaleza"], servicios: ["Servicio"], veredas: ["Vereda", "Territorio"]
};

const RNT = { 18: "28934", 22: "45821", 23: "50112", 24: "31207" };

const ITINERARIES = {
  6: [
    { t: "Inicio", h: "Encuentro - Buenos Aires", d: "Registro de visitantes y briefing de seguridad antes de iniciar." },
    { t: "+1.0 km", h: "Quebrada y puente", d: "Cruce de quebrada y primer tramo de bosque de niebla." },
    { t: "+2.4 km", h: "Mirador de niebla", d: "Pausa de avistamiento de aves rapaces y fotografía." },
    { t: "Cima", h: "Peña de las Águilas", d: "Cumbre rocosa con vista panorámica del valle." },
    { t: "Retorno", h: "Descenso guiado", d: "Regreso al punto de encuentro por la misma ruta." }
  ],
  7: [
    { t: "Inicio", h: "Acceso a la quebrada", d: "Punto de partida hacia las cascadas de Tunjaque." },
    { t: "Tramo 1", h: "Sendero de bosque", d: "Caminata entre vegetación nativa y miradores." },
    { t: "Cascada", h: "Salto principal", d: "Llegada a la caída de agua, zona de baño y descanso." },
    { t: "Retorno", h: "Regreso", d: "Camino de vuelta con interpretación ambiental." }
  ]
};

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
  routeActive = true;
  updateZones();
}

function clearRoute() { routeLayer.clearLayers(); routeActive = false; updateZones(); }

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
  renderPlaces();
  updateZones();
}

function closeDetail() {
  detail.hidden = true;
  detail.classList.remove("is-ficha");
  state.activePlaceId = null;
  clearRoute();
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
