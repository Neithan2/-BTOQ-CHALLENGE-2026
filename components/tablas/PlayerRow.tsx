// components/tablas/PlayerRow.tsx
import { memo } from "preact/compat";
import { useState } from "preact/hooks"; 
import { Jugador } from "@/utils/datos.ts";
import {
  TRADUCIR_RANGO,
  getWRStyles,
  TendenciaIcon,
  OpggBadge,
  BadgeEstado,
  DICCIONARIO_NOMBRES
} from "@/components/tablas/Tablesui.tsx";

export const PlayerRow = memo(({ p, index }: { p: Jugador; index: number }) => {
  const opggLink = `https://www.op.gg/es/lol/summoners/${p.base.region}/${p.base.invocador}-${p.base.tag}`;
  const [apodoElegido, setApodoElegido] = useState("");
  const entradaDiccionario = DICCIONARIO_NOMBRES[p.base.jugador];
  const manejarMouseEnter = () => {
    if (!entradaDiccionario) return;

    if (Array.isArray(entradaDiccionario)) {
      const indexAzar = Math.floor(Math.random() * entradaDiccionario.length);
      setApodoElegido(entradaDiccionario[indexAzar]);
    } else {
      setApodoElegido(entradaDiccionario);
    }
  };

  return (
    <tr
      onMouseEnter={manejarMouseEnter}
      className={`
        group/row transition-all duration-300 h-[4vw] border-b border-Blanco/5 last:border-0
        odd:bg-Azul/20 even:bg-Azul/40 hover:bg-Dorado/3
      `}
    >

      {/* 1. POSICIÓN */}
      <td className="w-[6vw] pl-[1.5vw]">
        <div className="flex items-center gap-[0.5vw]">
          <TendenciaIcon trend={p.lol.tendencia} />
          <span className="text-Blanco text-[1.1vw] gotham font-medium">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </td>

      {/* 2. JUGADOR  */}
      <td className="w-[14%] truncate pr-[0.5vw]">
        <span className="text-[1vw] text-Blanco font-medium tracking-widest raleway">
          {entradaDiccionario ? (
            <span className="relative">
              <span className="group-hover/row:hidden">{p.base.jugador}</span>
              <span className="hidden group-hover/row:inline">
                {apodoElegido || (Array.isArray(entradaDiccionario) ? entradaDiccionario[0] : entradaDiccionario)}
              </span>
            </span>
          ) : (
            p.base.jugador
          )}
        </span>
      </td>

      {/* 3. INVOCADOR */}
      <td className="w-[18%] truncate px-[0.1vw]">
        <div className="flex items-baseline gap-[0.2vw]">
          <span className="truncate text-[1vw] text-Blanco/95">{p.base.invocador}</span>
          <span className="text-Blanco/40 text-[0.9vw]">#{p.base.tag}</span>
        </div>
      </td>

      {/* 4. ROL */}
      <td className="w-[4vw] text-center">
        <img src={`/img/${p.base.rol.toUpperCase()}.svg`} className="mx-auto h-[1.4vw] brightness-0 invert opacity-60 group-hover/row:opacity-100 transition-opacity" alt={p.base.rol} />
      </td>

      {/* 5. ESTADO */}
      <td className="w-[8vw] text-center">
        <BadgeEstado estado={p.twitch.status} canal={p.base.canal} />
      </td>

      {/* 6. V/D */}
      <td className="w-[6vw] text-center text-[0.9vw] gotham">
        <span className="text-emerald-400 font-bold">{p.lol.victorias}</span>
        <span className="text-Blanco/40 mx-[0.2vw]">/</span>
        <span className="text-red-400 font-bold">{p.lol.derrotas}</span>
      </td>

      {/* 7. WINRATE */}
      <td className={`gotham w-[5vw] text-center text-[0.95vw] ${getWRStyles(p.lol.wr)}`}>
        {p.lol.wr > 0 ? `${p.lol.wr}%` : "-"}
      </td>

      {/* 8. RANGO */}
      <td className="w-[11vw] text-center">
        <div className="flex flex-col items-center leading-tight">
          <img src={`/img/${p.lol.rango.toLowerCase()}.webp`} className="h-[2.5vw] select-none object-contain" alt={p.lol.rango} />
          <span className="text-[0.69vw] tracking-widest text-Blanco/90">
            {TRADUCIR_RANGO[p.lol.rango.toUpperCase()] || p.lol.rango} {p.lol.division}
          </span>
        </div>
      </td>

      {/* 9. LP */}
      <td className="w-[5vw] text-center text-[0.9vw] gotham text-Blanco">
        {p.lol.lp}
      </td>

      {/* 10. OP.GG */}
      <td className="w-[4vw] text-center">
        <OpggBadge href={opggLink} />
      </td>
    </tr>
  );
});