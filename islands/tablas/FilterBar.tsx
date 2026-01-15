// islands/tablas/FilterBar.tsx
import { SearchIcon } from "@/components/tablas/Tablesui.tsx";
import { useState, useEffect } from "preact/hooks";
import { RefObject } from "preact";

interface FilterBarProps {
  q: string;
  setQ: (val: string) => void;
  rol: string;
  setRol: (val: string) => void;
  ordenWR: boolean;
  setOrdenWR: (val: boolean) => void;
  inputRef: RefObject<HTMLInputElement>;
}

const ROLES = ["TOP", "JG", "MID", "ADC", "SUP"];

export default function FilterBar({
  q, setQ, rol, setRol, ordenWR, setOrdenWR, inputRef
}: FilterBarProps) {
  const [rolesExpandido, setRolesExpandido] = useState(false);
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setQ("");
        setRol("TODOS");
        setOrdenWR(false);
        setRolesExpandido(false);
        inputRef.current?.blur();
      }
    };
    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [setQ, setRol, setOrdenWR, inputRef]);

  return (
    <div className="relative z-50 flex items-center justify-between gap-[1vw] bg-Azul/60 p-[1.5vw] rounded-t-[1.2vw] border-b border-Dorado/40 backdrop-blur-md">

      {/* 1. BUSCADOR ANIMADO */}
      <div className="flex items-center min-w-0">
        <div className={`relative flex items-center group transition-all duration-500 ease-in-out h-[3vw] ${
          q ? "w-[25vw]" : "w-[3vw] focus-within:w-[35vw]"
        }`}>
          <input
            ref={inputRef}
            type="text"
            id="search-player"
            name="search-player"
            aria-label="Buscar jugador"
            autoComplete="off"
            spellcheck={false}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            placeholder="BUSCAR JUGADOR...(ESC and /)"
            className={`
              block w-full h-full bg-Azul/90 border rounded-full outline-none
              text-[0.9vw] text-Blanco transition-all duration-500
              placeholder:text-transparent focus:placeholder:text-Blanco/30
              ${q
                ? "border-Dorado shadow-[0_0_1vw_rgba(196,160,82,0.3)] pl-[3vw] pr-[1.5vw]"
                : "border-Blanco/20 focus:border-Dorado focus:pl-[3vw] focus:pr-[1.5vw]"
              }
            `}
            value={q}
            onInput={(e) => setQ(e.currentTarget.value)}
          />

          {/* Icono Lupa */}
          <div className={`
            absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 text-Dorado z-10
            ${q
              ? "left-[1vw] translate-x-0 opacity-100"
              : "left-1/2 -translate-x-1/2 opacity-70 group-focus-within:left-[1vw] group-focus-within:translate-x-0 group-focus-within:opacity-100"
            }
          `}>
            <div className="w-[1.2vw] h-[1.2vw]">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTROLES DE FILTRO Y ORDEN */}
      <div className="flex items-center gap-[0.8vw] shrink-0">

        {/* SELECTOR DE ROLES */}
        <div className={`bg-Azul/80 relative flex h-[3vw] items-center rounded-full border transition-all duration-500 ease-out ${
          rolesExpandido ? "border-Dorado w-[18vw]" : "w-[3vw] justify-center border-Blanco/30"
        }`}>
          <button
            type="button"
            onClick={() => setRolesExpandido(!rolesExpandido)}
            className="absolute left-0 z-10 flex h-[2.8vw] w-[2.8vw] items-center justify-center rounded-full"
          >
            {rolesExpandido ? <span className="text-Dorado text-[1vw] font-black">✕</span> : (
              <img
                src={`/img/${(!rol || rol === "TODOS") ? "ALL" : rol.toUpperCase()}.svg`}
                className="h-[1.4vw] w-[1.4vw] brightness-0 invert opacity-90"
                alt="Filtro"
                draggable={false}
              />
            )}
          </button>

          <div className={`ml-[3vw] flex w-full items-center justify-around transition-opacity duration-300 ${
            rolesExpandido ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            {["TODOS", ...ROLES].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRol(r);
                  setRolesExpandido(false);
                }}
                className={`transition-all hover:scale-125 ${
                  (rol === r) || (r === 'TODOS' && (!rol || rol === "TODOS")) ? "opacity-100 scale-110" : "opacity-40"
                }`}
              >
                <img
                  src={`/img/${r === "TODOS" ? "ALL" : r.toUpperCase()}.svg`}
                  className="h-[1.2vw] w-[1.2vw] brightness-0 invert"
                  alt={r}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>

        {/* BOTÓN ORDENAR POR WR */}
        <button
          type="button"
          onClick={() => setOrdenWR(!ordenWR)}
          className={`h-[3vw] min-w-[3.5vw] px-[1vw] rounded-full text-[0.85vw] font-medium tracking-tighter transition-all duration-300 border ${
            ordenWR ? "bg-Dorado text-Azul border-Dorado shadow-[0_0_1vw_#C4A052]" : "bg-Azul/80 text-Blanco border-Blanco/30"
          }`}
        >
          WR
        </button>

        {/* BOTÓN RESETEAR TODO */}
        <button
          type="button"
          onClick={() => {
            setQ("");
            setRol("TODOS");
            setOrdenWR(false);
            setRolesExpandido(false);
          }}
          className="bg-Azul/80 text-Dorado flex h-[3vw] w-[3vw] items-center justify-center rounded-full border border-Blanco/30 hover:rotate-180 transition-all duration-500 hover:border-Dorado group"
        >
          <span className="text-[1.2vw] leading-none group-hover:scale-110">↺</span>
        </button>
      </div>
    </div>
  );
}