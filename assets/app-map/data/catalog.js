export const MAP_CENTER = [4.7208, -73.9693];

/* Categorías derivadas del mapa oficial "La Calera.travel".
   Ver REFERENTE-mapa-lacalera.md. Coordenadas aproximadas por sector. */
export const layers = [
  { id: "naturaleza", label: "Naturaleza y paisaje", color: "#22c55e", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "aventura", label: "Aventura y deportes", color: "#f97316", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "rutas", label: "Rutas y senderos", color: "#2dd4bf", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "cultura", label: "Cultura y patrimonio", color: "#a855f7", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "gastronomia", label: "Gastronomía", color: "#f59e0b", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "alojamiento", label: "Alojamiento y camping", color: "#38bdf8", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "servicios", label: "Servicios", color: "#64748b", defaultOn: true, roles: ["traveler", "manager"] },
  { id: "veredas", label: "Veredas y centros poblados", color: "#14b8a6", defaultOn: false, roles: ["manager"] },
  { id: "uso", label: "Uso del territorio", color: "#D64545", defaultOn: true, roles: ["manager"], zones: true }
];

export const attractions = [
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
    description: "Corredor de restaurantes sobre la vía principal Bogotá-La Calera con variada oferta de comida." },
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
export const VEREDAS = [
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

export const veredaPlaces = VEREDAS.map((v, i) => ({
  id: 100 + i, name: "Vereda " + v[0], layerId: "veredas", vereda: v[0], lat: v[1], lng: v[2],
  activities: ["Vereda", "Territorio"],
  description: "Vereda del municipio de La Calera. Unidad territorial para gestión, inventario y planeación turística.",
  aprox: true
}));

export const places = attractions.concat(veredaPlaces);

export const ZONES = [
  { type: "permitido", name: "Zona de visita permitida", coords: [[4.715, -73.985], [4.732, -73.982], [4.736, -73.958], [4.712, -73.952], [4.702, -73.968]] },
  { type: "restringido", name: "Acceso restringido (motorsport / cantera)", coords: [[4.705, -73.945], [4.722, -73.935], [4.720, -73.908], [4.690, -73.912], [4.688, -73.935]] },
  { type: "sensible", name: "Ecosistema sensible (páramo y agua)", coords: [[4.742, -74.000], [4.760, -73.985], [4.752, -73.962], [4.733, -73.973]] }
];

export const ZONE_STYLE = {
  permitido: { color: "#2F9E5B", weight: 2, dashArray: null, className: "zone-permitido" },
  restringido: { color: "#E0A100", weight: 2, dashArray: "6 5", className: "zone-restringido" },
  sensible: { color: "#D64545", weight: 2, dashArray: "2 7", className: "zone-sensible" }
};

export const TAG_MAP = {
  naturaleza: ["Naturaleza", "Paisaje"], aventura: ["Aventura", "Aire libre"],
  rutas: ["Sendero", "Caminata"], cultura: ["Patrimonio", "Cultura"], gastronomia: ["Gastronomía", "Café"],
  alojamiento: ["Descanso", "Naturaleza"], servicios: ["Servicio"], veredas: ["Vereda", "Territorio"]
};

export const RNT = { 18: "28934", 22: "45821", 23: "50112", 24: "31207" };

export const ITINERARIES = {
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

export const catalog = {
  MAP_CENTER,
  layers,
  attractions,
  VEREDAS,
  veredaPlaces,
  places,
  ZONES,
  ZONE_STYLE,
  TAG_MAP,
  RNT,
  ITINERARIES
};
