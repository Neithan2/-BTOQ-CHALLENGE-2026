// routes/_app.tsx
import { define } from "../utils.ts";

export default define.page(function App({ Component }) {
  return (
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* PRELOAD DE FUENTES: Soluciona el retraso de LCP y errores de TS */}
        <link
          rel="preload"
          href="/fonts/Gotham-Ultra.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Gotham-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Raleway.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link f-permanent rel="stylesheet" href="/styles.css" />
        <link f-permanent rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>BTOQ</title>
        <meta name="description" content="Torneo SoloQueue BTOQ - El evento de streamers y comunidad de betomin." />
      </head>
      <body
        className="bg-Azul text-Blanco flex min-h-screen flex-col"
        f-client-nav
      >
        <Component />
      </body>
    </html>
  );
});
