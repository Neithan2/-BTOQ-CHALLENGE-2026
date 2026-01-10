import { Head } from "fresh/runtime";
import { PageProps } from "fresh";
import { TORNEO_CONFIG } from "@/utils/config.ts";
import Gate from "@/components/Gate.tsx";

export default function StreamsPage(_props: PageProps) {
  const ahora = Date.now();
  const haEmpezado = ahora >= TORNEO_CONFIG.fechaInicio;

  return (
    <>
      <Head>
        <title>BTOQ | Streams</title>
      </Head>

      <div className="relative flex min-h-[80vh] items-center justify-center">
        {!haEmpezado ? (
          <Gate type="streams" />
        ) : (
          <main className="animate-fade-in relative z-10 text-white font-bold text-4xl italic gothamU text-center">
            STREAMS
          </main>
        )}
      </div>
    </>
  );
}