// components/tablas/Tablesui.tsx
import { type ComponentChildren } from "preact";

export const TRADUCIR_RANGO: Record<string, string> = {
  DIAMOND: "DIAMANTE",
  EMERALD: "ESMERALDA",
  PLATINUM: "PLATINO",
  GOLD: "ORO",
  SILVER: "PLATA",
  BRONZE: "BRONCE",
  IRON: "HIERRO",
  UNRANKED: " "
};
export const DICCIONARIO_NOMBRES: Record<string, string | string[]> = {
  "Swordtoy": ["Espadita", "Femboy?"],
  "Tommy": "Betomifornite2019",
  "Luquetiii777": ["El Lechettis", "El DrToro"],
  "Reyshaquito": ["Los causas", "Shaquito"],
  "Ayelencitapp": ["La Fraka", "La Pepona"],
  "7sheckler": ["El Edater", "Busca Femboys"],
};

export const getWRStyles = (wr: number) => {
  if (isNaN(wr)) return "text-Blanco/70";
  if (wr >= 61) return "text-Dorado";
  if (wr >= 56) return "text-[#a2ffb3]";
  if (wr >= 52) return "text-[#26de81]";
  if (wr >= 49) return "text-[#d1d8e0]";
  if (wr >= 45) return "text-[#fd9644]";
  return "text-red-500";
};

export const UI = {
  wrapper: (customClass = "") => `
    w-full max-w-[80vw] mx-auto mb-[10vh] relative px-[2vw] py-[3vw] group
    bg-Negro/50 rounded-[2vw] backdrop-blur-xl border-[0.15vw] border-Dorado/80
    shadow-2xl mt-[15vh] overflow-hidden select-none ${customClass}
  `,
  tableCard: "overflow-x-auto rounded-[1.5vw] border border-Dorado/80 bg-Negro/90 relative z-10 mb-[2vw] backdrop-blur-md",
  nav: "flex items-center justify-between gap-[1vw] bg-Azul/60 p-[0.8vw] rounded-t-[1.2vw] border-x border-t border-Blanco/30",
  searchBar: (active: boolean) => `
    relative h-[3vw] transition-all duration-700 ease-in-out flex items-center
    bg-Azul/80 border border-Dorado/50 rounded-full overflow-hidden
    ${active ? "w-full pl-[1vw]" : "w-[3vw] focus-within:w-full focus-within:pl-[1vw]"}
    focus-within:border-Dorado focus-within:ring-1 focus-within:ring-Dorado/50
  `,
};

export const Corner = ({ pos }: { pos: string }) => (
  <div className={`absolute ${pos} pointer-events-none p-[1.2vw] opacity-60 transition-all duration-700 group-hover:opacity-100`}>
    <div className={`border-Dorado h-[1.5vw] w-[1.5vw] ${pos.includes("top") ? "border-t-[0.2vw]" : "border-b-[0.2vw]"} ${pos.includes("right") ? "border-r-[0.2vw]" : "border-l-[0.2vw]"} rounded-[0.2vw] shadow-[0_0_1vw_#C4A052]`} />
  </div>
);

export const SearchIcon = () => (
  <svg width="1.2vw" height="1.2vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-90">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const BadgeEstado = ({ estado, canal }: { estado: string; canal: string }) => {
  const estaEnVivo = estado.toLowerCase() === "online" || estado === "en vivo";
  return (
    <a href={`https://twitch.tv/${canal}`} target="_blank" rel="noopener noreferrer" className="group/status inline-flex justify-center">
      {estaEnVivo ? (
        <div className="flex min-w-[5.5vw] animate-pulse items-center justify-center gap-[0.3vw] rounded-[0.2vw] border border-red-600 bg-red-600/20 px-[0.6vw] py-[0.25vw] text-[0.65vw] font-black text-Blanco italic shadow-[0_0_1vw_rgba(220,38,38,0.4)]">
          <div className="h-[0.4vw] w-[0.4vw] rounded-full bg-red-500 shadow-[0_0_0.3vw_#ff0000]" /> EN VIVO
        </div>
      ) : (
        <div className="flex min-w-[5.5vw] items-center justify-center gap-[0.3vw] rounded-[0.2vw] border border-Blanco/30 bg-Blanco/10 px-[0.6vw] py-[0.25vw] text-[0.65vw] font-bold text-Blanco/75 transition-all group-hover/status:border-Blanco/50 group-hover/status:text-Blanco">
          OFFLINE
        </div>
      )}
    </a>
  );
};

export const Th = ({ children, className = "" }: { children?: ComponentChildren; className?: string }) => (
  <th className={`text-Dorado gotham border-b border-Blanco/20 py-[1.2vw] text-[0.7vw] font-bold tracking-widest uppercase ${className}`}>
    {children}
  </th>
);

export const TendenciaIcon = ({ trend }: { trend: number }) => {
  if (trend === 0) return <span className="text-[0.7vw] font-bold text-Blanco/30">—</span>;

  const esPositivo = trend > 0;

  return (
    <div className={`inline-flex items-center gap-[0.1vw] font-black text-[0.8vw] ${
      esPositivo ? "text-green-400" : "text-red-500"
    }`}>
      <span className="text-[0.6vw]">{esPositivo ? "▲" : "▼"}</span>
      <span>{Math.abs(trend)}</span>
    </div>
  );
};

export const BadgeVD = ({ win }: { win: boolean }) => (
  <div className={`px-[0.4vw] py-[0.1vw] rounded-[0.2vw] text-[0.6vw] font-black border ${
    win
      ? 'bg-green-500/20 text-green-400 border-green-500/60'
      : 'bg-red-500/20 text-red-400 border-red-500/60'
  }`}>
    {win ? 'V' : 'D'}
  </div>
);

export const OpggBadge = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center bg-Azul/80 hover:bg-Azul border border-Blanco/30 hover:border-Dorado px-[1.2vw] py-[0.5vw] rounded-[0.5vw] transition-all duration-300 group/opgg hover:shadow-[0_0_1.5vw_rgba(196,160,82,0.2)] hover:-translate-y-0.5"
    title="Ver perfil en OP.GG"
  >
    <svg
      width="60"
      height="22"
      viewBox="0 0 60 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[1.1vw] w-auto transition-transform duration-300 group-hover/opgg:scale-110"
    >
      <style>
        {`
        .opgg-text {
          font-family: 'Arial Black', sans-serif;
          font-weight: 900;
          font-size: 16px;
          letter-spacing: 0.5px;
        }
        .opgg-o {
          fill: #C4A052;
          transition: all 0.3s ease;
        }
        .opgg-pgg {
          fill: #FFFFFF;
          opacity: 0.9; /* Subido de 0.6 a 0.9 para contraste */
          transition: all 0.3s ease;
        }
        .group/opgg:hover .opgg-o {
          fill: #FFD700;
          filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
        }
        .group/opgg:hover .opgg-pgg {
          opacity: 1;
          fill: #FFFFFF;
        }
        `}
      </style>
      <text x="0" y="17" className="opgg-text">
        <tspan className="opgg-o">OP</tspan>
        <tspan className="opgg-pgg">.GG</tspan>
      </text>
    </svg>
  </a>
);