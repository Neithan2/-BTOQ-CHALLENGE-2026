// routes/clasificacion.tsx
import { Head } from "fresh/runtime";
import { TORNEO_CONFIG } from "@/utils/config.ts";
import Gate from "@/components/Gate.tsx";
import { obtenerDatos, type Jugador } from "@/utils/datos.ts";
import { TableLayout } from "@/components/tablas/TableLayout.tsx";
import TablaInteractiva from "@/islands/tablas/TablaInteractiva.tsx";

export default async function Clasificacion(_req: Request) {
  const ahora = Date.now();
  const DIECIOCHO_HORAS = 64800000;
  const fechaHabilitacion = TORNEO_CONFIG.fechaInicio - DIECIOCHO_HORAS;

  const estaHabilitado = ahora >= fechaHabilitacion;

  if (!estaHabilitado) {
    return (
      <>
        <Head>
          <title>BTOQ | Clasificación</title>
          <meta name="description" content="BTOQ CHALLENGE 2026 Tabla de posiciones" />
        </Head>
        <div className="relative flex min-h-[80vh] items-center justify-center">
          <Gate type="clasificacion" />
        </div>
      </>
    );
  }

  const todosLosJugadores: Jugador[] = await obtenerDatos();

  return (
    <>
      <Head>
        <title>BTOQ | Clasificación</title>
        <meta name="description" content="BTOQ CHALLENGE 2026 Tabla de posiciones" />
      </Head>
      <div className="w-full animate-fade-in">
        <TableLayout title="Clasificación BTOQ2">
          <div className="flex flex-col gap-[1vw]">
            <TablaInteractiva jugadoresIniciales={todosLosJugadores} />
          </div>
        </TableLayout>
      </div>
    </>
  );
}