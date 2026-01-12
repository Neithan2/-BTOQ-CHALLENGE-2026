// routes/index.tsx (o home.tsx)
import { Head } from "fresh/runtime";
import { define } from "@/utils.ts";
import Hero from "@/components/home/Hero.tsx";
import AboutSection from "@/components/home/AboutSections.tsx";
import PrizesSection from "@/components/home/PrizeSection.tsx";

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>BTOQ | Inicio</title>
        <meta name="description" content="Inicio del BTOQ CHALLENGE 2026" />
        <link rel="prefetch" href="/img/FormHeader.webp" as="image" />
        <link rel="prefetch" href="/img/FormFooter.webp" as="image" />
      </Head>

      <Hero />
      <AboutSection />
      <PrizesSection />
    </>
  );
});