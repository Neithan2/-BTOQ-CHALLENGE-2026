// components/tablas/Streamers.tsx
import { useMemo } from "preact/hooks";
import { Jugador } from "@/utils/datos.ts";

const STYLES = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fadeInUp 0.4s ease-out; }

  @keyframes pulse-soft { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.3; } }
  .animate-pulse-soft { animation: pulse-soft 3s infinite ease-in-out; }

  @keyframes glow-red {
    0%, 100% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.4); }
    50% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.7); }
  }
  .animate-glow-red { animation: glow-red 2s infinite; }

  @keyframes cargaRayo {
    0% { transform: translateY(100px); }
    25% { transform: translateY(0px); }
    30% { filter: brightness(2); }
    90% { transform: translateY(0px); filter: brightness(2.5); opacity: 1; }
    100% { transform: translateY(0px); opacity: 0; }
  }
  @keyframes faseDorado {
    0%, 26% { opacity: 1; transform: translateY(0); }
    29%, 100% { opacity: 0; transform: translateY(-5px); }
  }
  @keyframes faseElectrica {
    0%, 28% { opacity: 0; transform: translateY(5px); }
    30% { opacity: 1; transform: translateY(0); }
    32%, 82% { opacity: 0.7; }
    34%, 90% { opacity: 1; }
    100% { opacity: 0; }
  }
  @keyframes shockwave {
    0%, 26% { opacity: 0; transform: scale(1); }
    30%, 90% { opacity: 1; transform: scale(1.1); stroke-width: 2; }
    35%, 95% { opacity: 0; transform: scale(1.8); stroke-width: 0.5; filter: blur(4px); }
    100% { opacity: 0; }
  }

  .animate-carga-rayo { animation: cargaRayo 24s infinite linear; }
  .animate-texto-dorado { animation: faseDorado 24s infinite; }
  .animate-texto-electrico { animation: faseElectrica 24s infinite; }
  .animate-shockwave { animation: shockwave 24s infinite; }
`;

export function SeccionStreamers({ jugadores }: { jugadores: Jugador[] }) {
  const { activos, totalV } = useMemo(() => {
    const filtrados = jugadores.filter(
      (j) => j.twitch.status.toLowerCase() === "online" || j.twitch.status === "en vivo"
    );

    return {
      activos: filtrados.sort(() => Math.random() - 0.5),
      totalV: filtrados.reduce((acc, curr) => acc + curr.twitch.viewers, 0)
    };
  }, [jugadores]);

  return (
    <section className="flex flex-col -mx-[2.9vw] w-[calc(100%+5.7vw)] overflow-x-hidden">
      <style>{STYLES}</style>

      <nav className="relative z-20 flex items-center justify-between bg-Azul/95 p-[1.2vw] border-b border-Dorado/60 w-full backdrop-blur-xl">
        <div className="flex items-center gap-[1.5vw]">
          <div className="flex items-center gap-[0.8vw]">
            <span className="text-Blanco/90 text-[0.75vw] raleway tracking-widest uppercase font-bold">
              Personas viendo el BTOQ2:
            </span>
            <div className="flex items-center gap-[0.6vw] bg-Azul/60 px-[1vw] py-[0.4vw] rounded-full border border-Blanco/20">
              <span className="text-Blanco/90 font-black text-[1.1vw] tabular-nums leading-none">
                {totalV.toLocaleString()}
              </span>
              <div className="relative flex h-[0.6vw] w-[0.6vw]">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-[0.6vw] w-[0.6vw] bg-red-500 shadow-[0_0_0.5vw_#ef4444]"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[0.6vw] bg-Blanco/15 border border-Blanco/30 px-[1vw] py-[0.5vw] rounded-[0.4vw] select-none shadow-md">
          <span className="gotham text-Blanco font-bold text-[0.8vw] tracking-[0.2em] uppercase">
            CLIPS
          </span>
          <svg viewBox="0 0 24 24" className="w-[0.8vw] h-[0.8vw] fill-Blanco">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.5vw] p-[2vw] bg-Azul/60 w-full border-b border-Blanco/10 min-h-[40vh]">
        {activos.length > 0 ? (
          activos.map((p, index) => (
            <a
              key={p.id}
              href={`https://twitch.tv/${p.base.canal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card animate-fade-in-up flex flex-col bg-Azul/80 border border-Blanco/20 rounded-[1vw] overflow-hidden hover:border-Dorado transition-all duration-500 no-underline shadow-lg"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
            >
              <div className="relative w-full aspect-video bg-Negro overflow-hidden">
                {p.twitch.thumb ? (
                  <img src={p.twitch.thumb.replace("{width}", "600").replace("{height}", "338")} alt={p.base.jugador} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                ) : (
                  <div className="flex h-full items-center justify-center text-Blanco/20 gotham text-[0.8vw] tracking-widest uppercase">Sin Previa</div>
                )}
                <div className="absolute top-0 left-0 z-10">
                  <div className="relative flex items-center gap-[0.5vw] bg-red-600 px-[1vw] py-[0.5vw] rounded-br-[1vw] border-r border-b border-Blanco/30 animate-glow-red">
                    <div className="relative flex h-[0.5vw] w-[0.5vw]">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-Blanco opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-[0.5vw] w-[0.5vw] bg-Blanco"></span>
                    </div>
                    <span className="text-[0.7vw] font-black text-Blanco uppercase tracking-widest drop-shadow-lg">EN VIVO</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-Azul to-transparent opacity-70" />
              </div>
              <div className="p-[1vw] flex flex-col gap-[0.6vw]">
                <div className="flex items-center justify-between gap-[0.5vw]">
                  <span className="text-Blanco font-bold text-[1.1vw] uppercase truncate group-hover/card:text-Dorado transition-colors">{p.base.jugador}</span>
                  <div className="flex items-center gap-[0.3vw] bg-red-500/20 px-[0.7vw] py-[0.25vw] rounded-md border border-red-500/40">
                    <svg viewBox="0 0 20 20" className="w-[0.9vw] h-[0.9vw] fill-red-400">
                        <path d="M10 4.5C5.83 4.5 2.27 7.11 1 10c1.27 2.89 4.83 5.5 9 5.5s7.73-2.61 9-5.5c-1.27-2.89-4.83-5.5-9-5.5zm0 9.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-1.38 0-2.5 1.12-2.5 2.5S8.62 12.5 10 12.5s2.5-1.12 2.5-2.5S11.38 7.5 10 7.5z"/>
                    </svg>
                    <span className="text-red-400 font-black text-[0.95vw] tabular-nums leading-none">{p.twitch.viewers.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-Blanco/70 text-[0.75vw] line-clamp-1 font-medium border-t border-Blanco/10 pt-[0.6vw]">
                  {p.twitch.title || "Transmitiendo ahora"}
                </p>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-[8vw] animate-fade-in-up">
            <div className="relative w-[12vw] h-[12vw] mb-[2.5vw]">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <defs>
                  <mask id="rayoMask"><path d="M58 5 L30 50 L50 50 L42 90 L75 45 L50 45 Z" fill="white" /></mask>
                </defs>
                <path d="M58 5 L30 50 L50 50 L42 90 L75 45 L50 45 Z" className="fill-Blanco/5 stroke-Blanco/10" strokeWidth="0.5" />
                <g mask="url(#rayoMask)">
                  <rect x="0" y="0" width="100" height="100" fill="#C4A052" className="animate-carga-rayo" />
                </g>
                <path d="M58 5 L30 50 L50 50 L42 90 L75 45 L50 45 Z" fill="none" stroke="#22d3ee" strokeWidth="1.5" className="animate-shockwave opacity-0" style={{ transformOrigin: 'center' }} />
              </svg>
            </div>

            <div className="relative h-[3vw] flex flex-col items-center justify-center text-center">
              <div className="relative animate-texto-dorado">
                <div className="absolute inset-0 bg-Dorado/10 blur-[2vw] rounded-full animate-pulse-soft" />
                <h2 className="gotham text-Blanco/50 text-[1.4vw] font-bold tracking-[0.6em] uppercase select-none">
                  PARTICIPANTES <span className="text-Blanco/70">OFFLINE</span>
                </h2>
              </div>

              <h2 className="absolute gotham text-[#22d3ee] text-[1.2vw] font-bold tracking-[0.6em] uppercase opacity-0 animate-texto-electrico drop-shadow-[0_0_10px_#22d3ee] select-none">
                BUSCANDO SEÑAL
              </h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}