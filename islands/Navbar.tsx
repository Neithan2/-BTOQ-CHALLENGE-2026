import { useEffect, useState } from "preact/hooks";

export default function Navbar({ url }: { url?: URL | string }) {
  const initialPath = typeof url === "string"
    ? url
    : url?.pathname || (typeof window !== "undefined" ? globalThis.location.pathname : "/");

  const [path, setPath] = useState(initialPath);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const newPath = typeof url === "string" ? url : url?.pathname;
    if (newPath) setPath(newPath);
  }, [url]);

  useEffect(() => {
    const sync = () => setPath(globalThis.location.pathname);
    globalThis.addEventListener("f-navigation", sync);
    globalThis.addEventListener("popstate", sync);
    return () => {
      globalThis.removeEventListener("f-navigation", sync);
      globalThis.removeEventListener("popstate", sync);
    };
  }, []);

  const txtStyles = "raleway text-[16px] tracking-[.2em] md:text-[1.1vw]";
  const boxStyles = "relative inline-block transition-all duration-300";
  const lineBase = "after:absolute after:bottom-[-5px] after:left-0 after:h-[2px]";
  const lineAnim = "after:w-full after:bg-Dorado after:transition-all after:duration-300";

  const NavLink = (p: string, label: string) => {
    const current = path === "/" ? "/" : path.replace(/\/$/, "");
    const target = p === "/" ? "/" : p.replace(/\/$/, "");
    const isActive = current === target;

    const activeState = isActive
      ? "scale-105 font-bold text-Dorado after:scale-x-100"
      : "font-light text-Blanco hover:text-Dorado after:scale-x-0 hover:after:scale-x-100";

    return (
      <a
        href={p}
        onClick={() => {
          setPath(p);
          setIsOpen(false);
        }}
        className={`${txtStyles} ${boxStyles} ${lineBase} ${lineAnim} ${activeState}`}
      >
        {label}
      </a>
    );
  };

  const Bar = (cls: string) => (
    <span className={`h-0.5 w-7 bg-Blanco transition-all duration-300 ${cls}`} />
  );

return (
  <header className="select-none absolute top-0 left-0 z-50 w-full bg-transparent">
    <div className="mx-auto flex w-full max-w-[95vw] items-start justify-between px-6 md:grid md:grid-cols-[1fr_auto_1fr] pt-6 md:pt-[1vw]">

      {/* 1. ESPACIADOR IZQUIERDO  */}
      <div className="w-10 md:hidden" />

      {/* 2. NAV IZQUIERDA (Desktop) */}
      <nav className="hidden justify-end gap-[3vw] pr-[5.5vw] md:flex items-start pt-[1.6vw]">
        {NavLink("/", "INICIO")}
        {NavLink("/clasificacion", "CLASIFICACIÓN")}
      </nav>

      {/* 3. LOGO CENTRAL */}
      <div className="flex items-start justify-center">
          <img
            src="/img/Casco.webp"
            alt="BTOQ Logo"
            className="h-20 w-auto object-contain md:h-[11vw] select-none pointer-events-none "
          />
      </div>

      {/* 4. NAV DERECHA */}
      <nav className="hidden justify-start gap-[3vw] pl-[5.5vw] md:flex items-start pt-[1.6vw]">
        {NavLink("/streams", "STREAMS")}
        {NavLink("/showmatch", "SHOWMATCH")}
      </nav>

      {/* 5. BOTÓN MÓVIL  */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="relative z-110 flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
      >
        {/* Usamos items-end para que las barras se alineen al borde derecho */}
        {Bar(isOpen ? "translate-y-2 rotate-45" : "w-8")}
        {Bar(isOpen ? "opacity-0" : "w-6")}
        {Bar(isOpen ? "-translate-y-2 -rotate-45" : "w-8")}
      </button>

    </div>

    {/* Menú Desplegable Móvil */}
    <nav
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-10 bg-Azul/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      {NavLink("/", "INICIO")}
      {NavLink("/clasificacion", "CLASIFICACIÓN")}
      {NavLink("/streams", "STREAMS")}
      {NavLink("/showmatch", "SHOWMATCH")}
    </nav>
  </header>
);
}