const ENV = {
  BACKEND_URL: Deno.env.get("BACKEND_URL") || "",
};
export const BACKEND_URL = ENV.BACKEND_URL;

