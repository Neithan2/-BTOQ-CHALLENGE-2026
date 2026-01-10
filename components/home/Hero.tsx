// components/home/Hero.tsx
export default function Hero({
  children,
  isGate = false // Propiedad nueva
}: {
  children?: preact.ComponentChildren;
  isGate?: boolean
}) {
  return (
    <div className="bg-Azul relative h-screen w-full shrink-0 overflow-hidden">
      <img
        src="/img/Hero.webp"
        fetchpriority="high"
        loading="eager"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover object-[50%_10%]"
        alt="Hero Btoq"
        /* APLICAMOS LA MÁSCARA SOLO SI ES MODO GATE */
        style={isGate ? {
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
        } : {}}
      />

      <div className="relative z-20 flex h-full items-center justify-center">
        {children}
      </div>

      {/* Degradado inferior dinámico: más alto si es Gate */}
      <div className={`
        absolute inset-x-0 bottom-0 bg-linear-to-t from-Azul to-transparent z-10
        ${isGate ? "h-[60vh]" : "h-32"}
      `} />
    </div>
  );
}