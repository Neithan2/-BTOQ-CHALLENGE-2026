// routes/clasificacion.tsx
import { Head } from "fresh/runtime";
import { PageProps } from "fresh"; // Cambiado a "fresh" para evitar errores de resolución
import { TORNEO_CONFIG } from "@/utils/config.ts";
import Gate from "@/components/Gate.tsx";

export default function Clasificacion(_props: PageProps) {
  const ahora = Date.now();
  const haEmpezado = ahora >= TORNEO_CONFIG.fechaInicio;

  return (
    <>
      <Head>
        <title>BTOQ | Clasificación</title>
        <meta
          name="description"
          content="Consulta la tabla de posiciones del BTOQ 2026."
        />
      </Head>

      <div className="relative flex min-h-[80vh] items-center justify-center">
        {!haEmpezado ? (
          <Gate type="clasificacion" />
        ) : (
          <main className="animate-fade-in relative z-10 text-white font-bold text-4xl italic gothamU">
            SCOREBOARD
          </main>
        )}
      </div>
    </>
  );
}