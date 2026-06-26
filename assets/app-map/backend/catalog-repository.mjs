import { VEREDAS, catalog, layers, places } from "../data/catalog.js";

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function parseBBox(value) {
  if (!value) return null;
  const parts = String(value).split(",").map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return null;
  const [west, south, east, north] = parts;
  return { west, south, east, north };
}

function isInsideBBox(place, bbox) {
  if (!bbox) return true;
  return place.lng >= bbox.west && place.lng <= bbox.east && place.lat >= bbox.south && place.lat <= bbox.north;
}

export function getCatalog() {
  return catalog;
}

export function listCategories() {
  return layers;
}

export function listVeredas() {
  return VEREDAS.map(([name, lat, lng], index) => ({ id: index + 1, name, lat, lng }));
}

export function listPlaces(params = {}) {
  const category = params.category || params.layerId;
  const bbox = parseBBox(params.bbox);
  const query = normalizeText(params.q || params.search);

  return places.filter((place) => {
    if (category && place.layerId !== category) return false;
    if (!isInsideBBox(place, bbox)) return false;
    if (!query) return true;

    const haystack = normalizeText([
      place.name,
      place.description,
      place.vereda,
      ...(place.activities || [])
    ].join(" "));
    return haystack.includes(query);
  });
}

export function getPlace(id) {
  const numericId = Number(id);
  return places.find((place) => place.id === numericId) || null;
}
