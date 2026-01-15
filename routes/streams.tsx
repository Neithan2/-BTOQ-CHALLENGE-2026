// routes/streamers.tsx
import { Head } from "fresh/runtime";
import { obtenerDatos, type Jugador } from "@/utils/datos.ts";
import { TableLayout } from "@/components/tablas/TableLayout.tsx";
import { SeccionStreamers } from "@/components/tablas/Streamers.tsx";
import { TORNEO_CONFIG } from "@/utils/config.ts";
import Gate from "@/components/Gate.tsx";

export default async function StreamersPage(_req: Request) {
  const ahora = Date.now();
  const haEmpezado = ahora >= TORNEO_CONFIG.fechaInicio;
  if (!haEmpezado) {
    return (
      <>
        <Head>
          <title>BTOQ | Streams</title>
          <meta name="description" content="BTOQ CHALLENGE 2026 Streams de los participantes" />
        </Head>
        <div className="relative min-h-screen flex items-center justify-center">
          <Gate type="streams" />
        </div>
      </>
    );
  }

  const jugadores: Jugador[] = await obtenerDatos();

  return (
    <>
      <Head>
        <title>BTOQ | Streams</title>
        <meta name="description" content="BTOQ CHALLENGE 2026 Streams de los participantes" />
      </Head>

      <TableLayout title="Streamers del BTOQ2">
        <div className="w-full max-w-[70vw] mx-auto animate-fade-in">
          <SeccionStreamers jugadores={jugadores} />
        </div>
      </TableLayout>
    </>
  );
}