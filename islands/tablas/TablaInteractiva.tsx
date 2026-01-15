import { useState, useEffect, useRef } from "preact/hooks";
import { Jugador } from "@/utils/datos.ts";
import { PlayerRow } from "@/components/tablas/PlayerRow.tsx";
import { Th } from "@/components/tablas/Tablesui.tsx";
import FilterBar from "@/islands/tablas/FilterBar.tsx";

export default function TablaInteractiva({ jugadoresIniciales }: { jugadoresIniciales: Jugador[] }) {
  const [q, setQ] = useState("");
  const [rol, setRol] = useState("TODOS");
  const [ordenWR, setOrdenWR] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (typeof document === "undefined") return;
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    globalThis.addEventListener("keydown", handleKey);
    return () => globalThis.removeEventListener("keydown", handleKey);
  }, []);

  // Lógica de filtrado y orden
  let filtrados = jugadoresIniciales.filter((j: Jugador) => {
    const texto = q.toLowerCase().trim();
    const matchQ = !texto ||
                  j.base.jugador.toLowerCase().includes(texto) ||
                  j.base.invocador.toLowerCase().includes(texto);
    const matchRol = rol === "TODOS" || j.base.rol.toUpperCase() === rol.toUpperCase();
    return matchQ && matchRol;
  });

  if (ordenWR) {
    filtrados = [...filtrados].sort((a, b) => b.lol.wr - a.lol.wr);
  } else {
    filtrados = [...filtrados].sort((a, b) => a.lol.posicion - b.lol.posicion);
  }

  return (
    <div className="flex flex-col">
      <FilterBar
        q={q} setQ={setQ} inputRef={inputRef}
        rol={rol} setRol={setRol}
        ordenWR={ordenWR} setOrdenWR={setOrdenWR}
      />

      <div className="relative z-10 overflow-hidden bg-transparent border-x border-b border-Blanco/30 rounded-b-[1.2vw]">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-Azul/80 text-Dorado">
              <Th className="w-[3vw] pl-[3.4vw] text-left text-[1.04vw]">#</Th>
              <Th className="w-[17%] px-[0.5vw] text-left">Jugador</Th>
              <Th className="w-[18%] px-[0.5vw] text-left">Cuenta</Th>
              <Th className="w-[2.5vw] text-center">Rol</Th>
              <Th className="w-[7vw] text-center">Estado</Th>
              <Th className="w-[4vw] text-center">V/D</Th>
              <Th className="w-[4vw] text-center">WR</Th>
              <Th className="w-[4vw] text-center">Rango</Th>
              <Th className="w-[1.5vw] text-center">LP</Th>
              <Th className="w-[5vw] text-center"></Th>
            </tr>
          </thead>
          <tbody className="font-medium raleway text-Blanco">
            {filtrados.length > 0 ? (
              filtrados.map((p: Jugador) => (
                <PlayerRow key={p.id} p={p} index={p.lol.posicion - 1} />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="py-[10vh] text-center text-Blanco/60 italic bg-Negro/20">
                  No se encontraron jugadores que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}