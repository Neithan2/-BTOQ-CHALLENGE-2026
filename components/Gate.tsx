// components/home/Gate.tsx
import { TORNEO_CONFIG } from "@/utils/config.ts";
import Hero from "@/components/home/Hero.tsx";

const GATE_CONTENT = {
  clasificacion: { title: "CLASIFICACIÓN", subtitle: "Tabla de posiciones y estadísticas" },
  showmatch: { title: "SHOWMATCH", subtitle: "Partidas de Exhibición de la comunidad" },
  streams: { title: "STREAMS", subtitle: "Transmisiones en vivo" },
};

export default function Gate({ type, isSoon }: { type: "clasificacion" | "showmatch" | "streams", isSoon?: boolean }) {
  const { title, subtitle } = GATE_CONTENT[type] || GATE_CONTENT.showmatch;

  const fecha = new Date(TORNEO_CONFIG.fechaInicio);
  const diaMes = fecha.toLocaleDateString("es-AR", { day: "numeric", month: "long" }).toUpperCase();

  const hora = fecha.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Argentina/Buenos_Aires"
  }).replace("AM", "a. m.").replace("PM", "p. m.");

  const Corner = ({ pos }: { pos: string }) => (
    <div className={`absolute ${pos} p-[3vw] md:p-[1.2vw] opacity-30 transition-all duration-300 group-hover:opacity-100`}>
      <div className={`
        border-Dorado h-[3vw] w-[3vw] md:h-[1vw] md:w-[1vw]
        ${pos.includes("top") ? "border-t-[0.4vw] md:border-t-[0.15vw]" : "border-b-[0.4vw] md:border-b-[0.15vw]"}
        ${pos.includes("right") ? "border-r-[0.4vw] md:border-r-[0.15vw]" : "border-l-[0.4vw] md:border-l-[0.15vw]"}
        rounded-sm`}
      />
    </div>
  );

  return (
    <Hero mode="gate">
      <div className={`
        select-none
        bg-Azul/50 border-Dorado/30 animate-fade-in group relative
        w-[90vw] md:max-w-[42vw] overflow-hidden rounded-[6vw] md:rounded-[1.4vw]
        border-[0.5vw] md:border-[0.15vw] p-[10vw] md:p-[2.8vw] text-center backdrop-blur-xl
        shadow-[0_4vw_10vw_-2vw_rgba(0,0,0,0.8)] z-30
      `}>

        <h1 className="gothamU text-Blanco mb-[2vw] md:mb-[1vw] text-[9vw] md:text-[3vw] font-black tracking-tighter leading-none ">
          {title}
        </h1>

        <div className="bg-Dorado mx-auto mb-[6vw] md:mb-[1.5vw] h-[0.6vw] md:h-[0.2vw] w-[15vw] md:w-[5vw] opacity-70 transition-all duration-500 group-hover:w-[30vw] md:group-hover:w-[10vw]" />

        <p className="raleway text-Blanco/90 mb-[8vw] md:mb-[2.5vw] px-[4vw] text-[4.2vw] md:text-[1.1vw] font-medium leading-tight">
          "{subtitle}"
        </p>

        <div className="border-Blanco/10 relative overflow-hidden rounded-[5vw] md:rounded-[1.2vw] border-[0.3vw] md:border-[0.1vw] bg-black/60 px-[6vw] py-[6vw] md:px-[2vw] md:py-[1.8vw] group-hover:border-Dorado/20 transition-colors">
          {isSoon ? (
            <div className="flex items-center justify-center py-[1vw]">
              <span className="gotham text-Blanco text-[6.5vw] md:text-[2vw] font-black tracking-[0.3em] uppercase italic animate-pulse">
                Coming soon
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-Dorado/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-[2vw] md:gap-[0.8vw]">
              <div className="flex items-center gap-[2vw] md:gap-[0.8vw]">
                <time className="gotham text-Blanco text-[6.5vw] md:text-[1.8vw] font-black tracking-tighter">
                  {diaMes}
                </time>
                <span className="hidden md:inline text-Dorado text-[1.8vw] font-black">/</span>
              </div>
              <div className="flex items-center gap-[4vw] md:gap-[0.8vw]">
                <time className="gotham text-Blanco text-[6.5vw] md:text-[1.8vw] font-black tracking-tighter">
                  {hora}
                </time>
                <div className="w-[8vw] md:w-[2.2vw] drop-shadow-[0_0_0.4vw_rgba(255,255,255,0.3)]">
                  <svg viewBox="0 0 768 480" className="h-auto w-full rounded-[0.5vw] md:rounded-[0.1vw]">
                    <path fill="#74acdf" d="M0 0h768v160H0z"/><path fill="#fff" d="M0 160h768v160H0z"/><path fill="#74acdf" d="M0 320h768v160H0z"/><circle fill="#f6b433" cx="384" cy="240" r="34"/>
                    <g fill="#f6b433"><path d="M384 193l6 31h-12zM384 287l6-31h-12zM431 240l-31 6v-12zM337 240l31 6v-12z"/></g>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <Corner pos="top-0 right-0" />
        <Corner pos="bottom-0 left-0" />
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Hero>
  );
}