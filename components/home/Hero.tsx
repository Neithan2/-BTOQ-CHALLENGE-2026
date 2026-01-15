// components/home/Hero.tsx
import { ComponentChildren } from "preact";

interface HeroProps {
  children?: ComponentChildren;
  mode?: "base" | "gate" | "full";
  showDecor?: boolean;
}

export default function Hero({ children, mode = "base", showDecor = false }: HeroProps) {
  const masks = {
    base: "linear-gradient(to bottom, black 60%, rgba(0,0,0,0.2) 100%)",
    gate: "linear-gradient(to bottom, black 50%, transparent 100%)",
    full: "linear-gradient(to bottom, black 30%, transparent 100%)",
  };

  const overlayHeights = {
    base: "h-32",
    gate: "h-[40vh]",
    full: "h-[60vh]",
  };

  return (
    <div className="bg-Azul relative h-[65vh] md:h-screen w-full shrink-0 overflow-hidden">
      {/* 1. IMAGEN DE FONDO  */}
      <img
        src="/img/BTO.webp"
        fetchpriority="high"
        loading="eager"
        alt="Btoq BANNER"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          maskImage: masks[mode],
          WebkitMaskImage: masks[mode],
        }}
      />

      {/* 2. TEXTO DECORATIVO  */}
      {showDecor && (
        <img
          src="/img/Texto.svg"
          loading="lazy"
          alt="Texto decorativo"
          className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{
            bottom: "14%",
            width: "80vw",
            maxWidth: "40vw"
          }}
        />
      )}

      {/* 3. DEGRADADO AZUL INFERIOR */}
      <div className={`
        absolute inset-x-0 bottom-0 bg-linear-to-t from-Azul to-transparent z-10 pointer-events-none
        ${overlayHeights[mode]}
      `} />

      {/* 4. CONTENIDO (Nítido) */}
      <div className="relative z-30 flex h-full items-center justify-center pt-24 px-4">
        {children}
      </div>
    </div>
  );
}
