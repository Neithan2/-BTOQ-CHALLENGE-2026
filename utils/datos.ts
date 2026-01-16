// utils/datos.ts
import { TORNEO_CONFIG } from "@/utils/config.ts";

export interface Jugador {
  id: number;
  base: {
    jugador: string;
    invocador: string;
    tag: string;
    rol: string;
    rols: string;
    region: string;
    canal: string;
  };
  lol: {
    posicion: number;
    rango: string;
    division: string;
    lp: number;
    victorias: number;
    derrotas: number;
    wr: number;
    tendencia: number;
  };
  twitch: {
    status: string;
    viewers: number;
    thumb: string | null;
    title: string | null;
  };
}

let cache: Jugador[] = [];
let lastFetch = 0;
let activePromise: Promise<Jugador[]> | null = null;

const TTL = 180000;
const REQUEST_TIMEOUT = 8000;

export async function obtenerDatos(): Promise<Jugador[]> {
  const ahora = Date.now();

  if (ahora > TORNEO_CONFIG.fechaFin && cache.length > 0) {
    return cache;
  }
  if (cache.length > 0 && (ahora - lastFetch < TTL)) {
    return cache;
  }
  if (activePromise) {
    return await activePromise;
  }

  activePromise = (async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const url = Deno.env.get("BACKEND_URL");
      if (!url) throw new Error("BACKEND_URL no definida en las variables de entorno");

      const resp = await fetch(url, { signal: controller.signal });
      if (!resp.ok) throw new Error(`Error en el servidor: ${resp.status}`);

      const data = await resp.json();

      if (Array.isArray(data)) {
        cache = data;
        lastFetch = Date.now();
      }
      return cache;
    } catch (err) {
      console.warn(
        "⚠️ Error al obtener datos. Usando caché previa:",
        err instanceof Error ? err.message : err,
      );
      return cache;
    } finally {
      clearTimeout(timeoutId);
      activePromise = null;
    }
  })();

  return await activePromise;
}
