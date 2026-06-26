import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCatalog, getPlace, listCategories, listPlaces, listVeredas } from "./catalog-repository.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const appRoot = resolve(__dirname, "..");
const port = Number(process.env.PORT || 8770);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(body, null, 2));
}

function sendError(response, status, message) {
  sendJson(response, status, { error: message });
}

function serveStatic(request, response, pathname) {
  const cleanPath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const target = resolve(appRoot, cleanPath === "/" ? "index.html" : cleanPath.slice(1));

  if (!target.startsWith(appRoot) || !existsSync(target) || !statSync(target).isFile()) {
    sendError(response, 404, "not_found");
    return;
  }

  response.writeHead(200, {
    "content-type": contentTypes[extname(target)] || "application/octet-stream",
    "cache-control": target.endsWith("index.html") ? "no-store" : "public, max-age=300"
  });
  createReadStream(target).pipe(response);
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
    if (Buffer.concat(chunks).length > 64 * 1024) {
      throw new Error("payload_too_large");
    }
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function routeApi(request, response, url) {
  if (url.pathname === "/api/health") {
    sendJson(response, 200, {
      ok: true,
      app: "turisoft-map",
      source: "local-catalog",
      db: "pending-mariadb-adapter"
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/catalog") {
    sendJson(response, 200, getCatalog());
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/categories") {
    sendJson(response, 200, listCategories());
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/veredas") {
    sendJson(response, 200, listVeredas());
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/places") {
    sendJson(response, 200, listPlaces(Object.fromEntries(url.searchParams)));
    return true;
  }

  const placeMatch = url.pathname.match(/^\/api\/places\/(\d+)$/);
  if (request.method === "GET" && placeMatch) {
    const place = getPlace(placeMatch[1]);
    if (!place) sendError(response, 404, "place_not_found");
    else sendJson(response, 200, place);
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/events") {
    const payload = await readJsonBody(request);
    sendJson(response, 202, {
      accepted: true,
      mode: "memory-only",
      event: {
        type: payload.type || "unknown",
        placeId: payload.placeId || null,
        createdAt: new Date().toISOString()
      }
    });
    return true;
  }

  return false;
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

    if (url.pathname.startsWith("/api/")) {
      const handled = await routeApi(request, response, url);
      if (!handled) sendError(response, 404, "api_route_not_found");
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      sendError(response, 405, "method_not_allowed");
      return;
    }

    serveStatic(request, response, url.pathname);
  } catch (error) {
    const message = error.message === "payload_too_large" ? "payload_too_large" : "internal_error";
    sendError(response, message === "payload_too_large" ? 413 : 500, message);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Turisoft map stage: http://127.0.0.1:${port}/`);
  console.log(`API health: http://127.0.0.1:${port}/api/health`);
});
