import { Head } from "fresh/runtime";
import Hero from "@/components/home/Hero.tsx";
import AboutSection from "@/components/home/AboutSections.tsx";
import PrizesSection from "@/components/home/PrizeSection.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>BTOQ | Inicio</title>
        <meta name="description" content="Torneo de SoloQueue BTOQ" />
        {/* Optimizamos la carga de la imagen principal */}
        <link rel="preload" as="image" href="/img/Hero.webp" fetchpriority="high" />
      </Head>
      <Hero />
      <AboutSection />
      <PrizesSection />
    </>
  );
}