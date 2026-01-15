// components/tablas/TableLayout.tsx
import { ComponentChildren } from "preact";
import { Corner, UI } from "@/components/tablas/Tablesui.tsx";
import Hero from "@/components/home/Hero.tsx";

interface Props {
  children: ComponentChildren;
  title: string;
  category?: string;
  isFinished?: boolean;
}

export function TableLayout({ children, title, isFinished }: Props) {
  return (
    <div className="min-h-screen w-full bg-Azul relative flex flex-col items-center overflow-x-hidden">

      <div className="absolute top-0 left-0 w-full h-screen z-0">
        <Hero />
        <div className="absolute inset-x-0 bottom-0 h-[85vh] bg-linear-to-t from-Azul via-Azul/90 to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center px-[2vw] mt-[40vh] pb-[10vh]">

        <div className={`${UI.wrapper(isFinished ? "border-Dorado shadow-[0_0_3vw_rgba(196,160,82,0.3)]" : "border-Dorado/40")} relative bg-Azul shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8)] isolate`}>

          <div className="absolute inset-0 bg-Azul -z-10" aria-hidden="true" />

          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos) => (
            <Corner key={pos} pos={pos} />
          ))}

          <header className="relative z-10 mb-[2.5vw] text-center pt-[2.5vw] px-[3vw]">
            {/* El div 'group' ahora envuelve solo al título y la línea para que el hover sea local */}
            <div className="group inline-block">
              <h1 className="gothamU text-[3.8vw] tracking-tighter uppercase text-Blanco leading-none">
                {title}
              </h1>

              <div className="mx-auto mt-[1vw] h-[0.15vw] w-[10vw] bg-linear-to-r from-transparent via-Blanco to-transparent opacity-40 transition-all duration-700 ease-in-out group-hover:w-[40vw] group-hover:opacity-100 group-hover:via-Dorado" />
            </div>
          </header>

          <div className={UI.tableCard}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}