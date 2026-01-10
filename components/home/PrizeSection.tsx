import { ComponentChildren } from "preact";
import { TORNEO_CONFIG } from "@/utils/config.ts";

// --- TIPOS DE DATOS ---
interface ConfigPremio {
  num?: string; suffix?: string; sponsor: string; img: string;
  title: string; desc: string; pos?: string; isSpecial?: boolean;
  label?: readonly string[]; footer?: string;
}

interface PrizeCardProps {
  label: ComponentChildren; sponsor: string; image: string;
  prizeTitle: string; prizeDesc: string; position: string;
  footerText?: string; isSpecial?: boolean;
}

// --- DATOS CONSTANTES (Fuera del componente para optimizar RAM en Deno) ---
const PREMIOS_DATA = TORNEO_CONFIG.premios as readonly ConfigPremio[];

const HEAVY = { textShadow: "0.01vw 0px 0px currentColor, -0.01vw 0px 0px currentColor" };

const UI = {
  card: "flex flex-col shrink-0 overflow-hidden bg-Blanco shadow-2xl transition-all duration-500 ease-out animate-fade-in-up hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] w-[75vw] aspect-[1/1.8] rounded-[8vw] md:w-[12.5vw] md:aspect-[1/2.1] md:rounded-[2.4vw]",
  circle: "overflow-hidden rounded-full ring-Azul ring-inset h-[35vw] w-[35vw] ring-[1.5vw] md:h-[7.9vw] md:w-[7.9vw] md:ring-[0.35vw]",
  prize: "flex flex-col items-center gap-[0.2vw] bg-Azul text-Blanco mt-[6vw] py-[4vw] md:mt-[1vw] md:py-[0.75vw]",
  medal: "flex items-center justify-center rounded-full shadow-xl border-[1vw] border-Blanco/30 gothamU text-Blanco h-[12vw] w-[12vw] text-[6vw] md:h-[3.1vw] md:w-[3.1vw] md:border-[0.25vw] md:text-[1.7vw]",
  grid: "flex flex-col items-center w-full gap-[10vw] md:flex-row md:flex-wrap md:justify-center md:max-w-[65vw] md:gap-x-[6vw] md:gap-y-[2vw]"
};

// --- COMPONENTES ATÓMICOS ---
const LabelText = ({ children, cls = "" }: { children: ComponentChildren; cls?: string }) => (
  <span className={`raleway font-black leading-none ${cls}`} style={HEAVY}>{children}</span>
);

function PrizeCard(props: PrizeCardProps) {
  const getMedalColor = (pos: string) => {
    const colors: Record<string, string> = { "1": "bg-[#dfb760]", "2": "bg-[#a8a8a8]", "3": "bg-[#a57138]" };
    return colors[pos] || "bg-Azul";
  };

return (
    <div className={`
      ${UI.card}
    `}>
      <div className="flex flex-col items-center pt-[12%] pb-[6%] mb-[8%] md:pt-[15%] md:mb-[10%]">
        <div className="gotham leading-none text-Azul text-center text-[5vw] md:text-[1.1vw]">
          {props.label}
        </div>
      </div>

      <div className="flex justify-center">
        <div className={UI.circle}>
          <img src={props.image} alt={props.sponsor} loading="lazy" className="h-full w-full object-cover pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col items-center pt-[5vw] md:pt-[1.5vw]">
        <span className="gotham font-bold text-Azul text-[4vw] md:text-[1vw]">{props.sponsor}</span>
      </div>

      <div className={UI.prize}>
        <span className="raleway px-2 text-center leading-none text-[3.5vw] md:text-[0.95vw]">{props.prizeTitle}</span>
        <span className="raleway px-2 text-center leading-none text-[3.5vw] md:text-[0.95vw]">{props.prizeDesc}</span>
      </div>

      <div className={`flex grow flex-col items-center justify-center ${!props.isSpecial ? "p-[3vw] md:p-[0.9vw]" : ""}`}>
        {props.isSpecial ? (
          <div className="raleway flex h-full w-full items-center justify-center bg-Dorado text-center font-bold text-Azul text-[3.5vw] md:p-[0.8vw] md:text-[0.8vw]">
            {props.footerText}
          </div>
        ) : (
          <div className={`${UI.medal} ${getMedalColor(props.position)}`}>
            {props.position}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PrizesSection() {
  const renderLabel = (p: ConfigPremio) => {
    const isSp = p.isSpecial;
    const base = "flex flex-col items-center";
    const mt = isSp ? "-mt-[2vw] md:-mt-[0.6vw]" : "-mt-[3vw] md:-mt-[0.8vw]";

    return (
      <span className={`${base} ${mt}`}>
        {isSp ? (
          p.label?.map((t: string) => (
            <LabelText key={t} cls="text-[4.5vw] md:text-[1em]">{t}</LabelText>
          ))
        ) : (
          <>
            <LabelText cls="text-[6vw] md:text-[1em]">{p.num}{p.suffix}</LabelText>
            <LabelText cls="text-[4vw] md:text-[1em]">LUGAR</LabelText>
          </>
        )}
      </span>
    );
  };

  return (
    <section id="premios" className="select-none [user-drag:none] [-webkit-user-drag:none] flex flex-col items-center w-full overflow-hidden bg-Azul py-[10vh] md:py-[12vh]">
      <div className="mb-[8vh] md:mb-[10vh] px-4 text-center">
        <h2 className="gothamU leading-none uppercase text-Blanco text-[12vw] md:text-[4.86vw]">PREMIOS</h2>
        <p className="gotham mt-4 font-bold text-Blanco/75 tracking-widest text-[3.5vw] md:text-[0.9vw]">SPONSOREADOS POR</p>
      </div>

      <div className={UI.grid}>
        {PREMIOS_DATA.map((p) => (
          <PrizeCard
            key={p.sponsor + p.title}
            sponsor={p.sponsor}
            image={p.img}
            prizeTitle={p.title}
            prizeDesc={p.desc}
            position={p.pos || "?"}
            isSpecial={p.isSpecial}
            footerText={p.footer}
            label={renderLabel(p)}
          />
        ))}
      </div>
    </section>
  );
}