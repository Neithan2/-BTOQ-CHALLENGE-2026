import { useEffect, useState } from "preact/hooks";

export default function Navbar({ url }: { url?: URL | string }) {
  // 1. Normalización inicial
  const initialPath = typeof url === "string"
    ? url
    : url?.pathname || (typeof window !== "undefined" ? globalThis.location.pathname : "/");

  const [path, setPath] = useState(initialPath);
  const [isOpen, setIsOpen] = useState(false);

  // 2. Sincronización cuando cambia la prop 'url' (desde el servidor)
  useEffect(() => {
    const newPath = typeof url === "string" ? url : url?.pathname;
    if (newPath) setPath(newPath);
  }, [url]);

  // 3. Sincronización con eventos de navegación de Fresh (Cliente)
  useEffect(() => {
    const sync = () => setPath(globalThis.location.pathname);

    // Eventos de Fresh para navegación parcial (Partials)
    globalThis.addEventListener("f-navigation", sync);
    globalThis.addEventListener("popstate", sync);

    return () => {
      globalThis.removeEventListener("f-navigation", sync);
      globalThis.removeEventListener("popstate", sync);
    };
  }, []);

  // --- CONFIGURACIÓN DE ESTILOS ---
  const txtStyles = "raleway text-[18px] tracking-[.2em] md:text-[1.1vw]";
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
          setPath(p); // Actualización optimista
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
    <header className="select-none [user-drag:none] [-webkit-user-drag:none] absolute top-0 left-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex h-20 w-full max-w-[95vw] items-center justify-between px-6 md:grid md:h-[7vw] md:grid-cols-[1fr_auto_1fr]">

        {/* Navegación Izquierda */}
        <nav className="hidden justify-end gap-[3vw] pr-8 md:flex">
          {NavLink("/", "INICIO")}
          {NavLink("/clasificacion", "CLASIFICACIÓN")}
        </nav>

        {/* Espaciador Logo (Aquí iría tu logo flotante) */}
        <div className="w-32 md:w-[15vw]" />

        {/* Navegación Derecha */}
        <nav className="hidden justify-start gap-[3vw] pl-8 md:flex">
          {NavLink("/streams", "STREAMS")}
          {NavLink("/showmatch", "SHOWMATCH")}
        </nav>

        {/* Botón Móvil */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="relative z-110 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          {Bar(isOpen ? "translate-y-2 rotate-45" : "")}
          {Bar(isOpen ? "opacity-0" : "")}
          {Bar(isOpen ? "-translate-y-2 -rotate-45" : "")}
        </button>
      </div>

      {/* Menú Desplegable Móvil */}
      <nav
        className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-10 bg-Azul/90 backdrop-blur-xl transition-all duration-500 md:hidden ${
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