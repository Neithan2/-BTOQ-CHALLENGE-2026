interface SocialLink {
  id: string;
  href: string;
  label: string;
  viewBox: string;
  colorHover: string;
}

const PATHS: Record<string, string> = {
  tiktok: "M27.52,11.18v.02c0,.36.11,5.56,5.57,5.89,0,4.84,0,0,0,4.02-.41.02-3.59-.21-5.58-1.97v7.83c.04,3.54-1.93,7.02-5.62,7.72-1.03.2-1.97.22-3.53-.12-9.01-2.7-6.02-16.06,3.03-14.63,0,4.31,0,0,0,4.31-3.74-.55-4.99,2.56-3.99,4.79.9,2.03,4.62,2.47,5.92-.39.15-.56.22-1.2.22-1.91v-15.54h3.98Z",
  twitch: "M16.65,10.81l-4.75,4.75v17.08h5.7v4.75l4.74-4.75h3.8l8.54-8.54v-13.28h-18.04ZM32.78,23.15l-3.79,3.79h-3.8l-3.33,3.33v-3.33h-4.27v-14.24h15.19v10.44ZM28.04,16.03h1.91v5.7h-1.91ZM22.82,16.03h1.9v5.7h-1.9Z",
  instagram: "M23,13.31c3.16,0,3.53.01,4.78.07,1.15.05,1.78.24,2.19.41.55.21.95.47,1.36.88.41.41.67.81.88,1.36.16.42.35,1.04.41,2.19.06,1.25.07,1.62.07,4.78s-.01,3.53-.07,4.78c-.05,1.15-.24,1.78-.41,2.19-.21.55-.47.95-.88,1.36-.41.41-.81.67-1.36.88-.42.16-1.04.35-2.19.41-1.25.06-1.62.07-4.78.07s-3.53-.01-4.78-.07c-1.15-.05-1.78-.24-2.19-.41-.55-.21-.95-.47-1.36-.88-.41-.41-.67-.81-.88-1.36-.16-.42-.35-1.04-.41-2.19-.06-1.25-.07-1.62-.07-4.78s.01-3.53.07-4.78c.05-1.15.24-1.78.41-2.19.21-.55.47-.95.88-1.36.41-.41.81-.67,1.36-.88.42-.16,1.04-.35,2.19-.41,1.25-.06,1.62-.07,4.78-.07ZM23,11.18c-3.21,0-3.61.01-4.87.07-1.26.06-2.12.26-2.87.55-.78.3-1.44.71-2.09,1.36-.66.66-1.06,1.32-1.36,2.09-.29.75-.49,1.61-.55,2.87-.06,1.26-.07,1.66-.07,4.87s.01,3.61.07,4.87c.06,1.26.26,2.12.55,2.87.3.78.71,1.44,1.36,2.09.66.66,1.32,1.06,2.09,1.36.75.29,1.61.49,2.87.55,1.26.06,1.66.07,4.87.07s3.61-.01,4.87-.07c1.26-.06,2.12-.26,2.87-.55.78-.3,1.44-.71,2.09-1.36.66-.66,1.06-1.32,1.36-2.09.29-.75.49-1.61.55-2.87.06-1.26.07-1.66.07-4.87s-.01-3.61-.07-4.87c-.06-1.26-.26-2.12-.55-2.87-.3-.78-.71-1.44-1.36-2.09-.66-.66-1.32-1.06-2.09-1.36-.75-.29-1.61-.49-2.87-.55-1.26-.06-1.66-.07-4.87-.07ZM23,16.93c-3.35,0-6.07,2.72-6.07,6.07s2.72,6.07,6.07,6.07,6.07-2.72,6.07-6.07-2.72-6.07-6.07-6.07ZM23,26.94c-2.18,0-3.94-1.76-3.94-3.94s1.76-3.94,3.94-3.94,3.94,1.76,3.94,3.94-1.76,3.94-3.94,3.94ZM29.31,15.27c-.78,0-1.42.63-1.42,1.42s.63,1.42,1.42,1.42,1.42-.63,1.42-1.42-.63-1.42-1.42-1.42Z",
  youtube: "M34.8,17.07c-.29-1.07-1.1-1.89-2.17-2.18-1.91-.52-9.64-.52-9.64-.52,0,0-7.71,0-9.62.52-1.06.29-1.89,1.12-2.2,2.18-.5,1.9-.5,5.92-.5,5.92,0,0,0,4.01.5,5.94.31,1.04,1.14,1.89,2.2,2.17,1.91.52,9.62.52,9.62.52,0,0,7.73,0,9.64-.52,1.08-.29,1.89-1.13,2.17-2.17.52-1.93.52-5.94.52-5.94,0,0,0-4.02-.52-5.92ZM20.54,26.7v-7.4l6.39,3.69-6.39,3.71Z"
};

export default function Footer() {
  // Orden: Twitch/Instagram/TikTok/YouTube
  const socialLinks: SocialLink[] = [
    { id: "twitch", href: "https://www.twitch.tv/betomin", label: "Twitch", viewBox: "0 0 46 46", colorHover: "group-hover:bg-[#9146FF]" },
    {
      id: "instagram",
      href: "https://www.instagram.com/betomin._",
      label: "Instagram",
      viewBox: "0 0 46 46",
      colorHover: "group-hover:bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fd5949_30%,#d6249f_50%,#BC2A8D_80%)]"
    },
    { id: "tiktok", href: "https://www.tiktok.com/@betominok", label: "TikTok", viewBox: "0 0 46 46", colorHover: "group-hover:bg-black" },
    { id: "youtube", href: "https://www.youtube.com/@betomin23", label: "YouTube", viewBox: "0 0 46 46", colorHover: "group-hover:bg-red-600" },
  ];

  const labelCls = "gotham text-sm tracking-tight text-white mb-1 md:text-[1.1vw] md:mb-[0.2vw]";
  const textCls = "raleway font-light text-xs text-white md:text-[1vw]";
  const dotSpan = "font-bold text-yellow-500/60 md:text-[1vw] inline-block mx-2";

  return (
    <footer className="mt-auto w-full shrink-0 border-t border-white/20 bg-Azul shadow-[0_-8px_20px_rgba(0,0,0,0.3)]">
      <div className="mx-auto flex w-[90vw] flex-col items-center justify-between gap-6 py-8 md:relative md:h-[10vw] md:flex-row md:py-0">

        {/* 1. BRANDING */}
        <div className="select-none pointer-events-none flex flex-col items-center md:items-start shrink-0 w-fit">
          <div className="w-32 md:w-[10vw]">
            <img
              src="/img/Logo.svg"
              alt="Logo"
              className="h-auto w-full brightness-110"
            />
          </div>

          <p className="select-none raleway text-[7px] tracking-widest text-white md:text-[0.6vw] w-full text-center">
            ORGANIZADO POR BETOMIN
          </p>
        </div>

        {/* 2. CRÉDITOS */}
        <section className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-[5vw]">
          <div className="flex flex-col items-center md:items-start">
            <span className={`${labelCls} select-none`}>EMAIL</span>
            <span className={textCls}>betomindelpueblo@gmail.com</span>
          </div>
          <div className="select-none pointer-events-none flex flex-col items-center md:items-start">
            <span className={labelCls}>ART & DESIGN</span>
            <span className={textCls}>Beto <span className={dotSpan}>•</span> Lumy</span>
          </div>
          <div className="select-none pointer-events-none flex flex-col items-center md:items-start">
            <span className={labelCls}>DEVELOPMENT</span>
            <span className={textCls}>Neithan <span className={dotSpan}>•</span> Shadow</span>
          </div>
        </section>

        {/* 3. SOCIAL LINKS */}
        <div className="flex items-center gap-2 shrink-0 md:translate-y-[0.7vw] md:gap-[0.7vw]">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
              className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-[3px] border-white transition-all duration-300 hover:scale-110 hover:border-transparent md:h-[2.8vw] md:w-[2.8vw]"
            >
              <div className={`absolute inset-0 scale-0 rounded-full transition-transform duration-300 z-0 group-hover:scale-100 ${link.colorHover}`} />

              <svg
                viewBox={link.viewBox}
                className="relative z-10 w-8 h-8 text-white transition-colors duration-300 md:w-[2.2vw] md:h-[2.2vw]"
              >
                <path
                  fill="currentColor"
                  d={PATHS[link.id]}
                />
              </svg>
            </a>
          ))}
        </div>

        {/* PISO: COPYRIGHT */}
        <div className="select-none w-full text-center mt-6 md:absolute md:bottom-[0.4vw] md:left-0 md:flex md:justify-center md:mt-0">
          <p className="raleway text-[8px] tracking-[0.3em] text-white/50 md:text-[0.55vw] uppercase">
            © BTOQ CHALLENGE 2026 — TODOS LOS DERECHOS RESERVADOS
          </p>
        </div>

      </div>
    </footer>
  );
}