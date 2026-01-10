import { useState, useEffect } from "preact/hooks";
import RulesModal from "@/components/modal/RulesModal.tsx";
import InscripcionForm from "@/islands/home/InscripcionForm.tsx";

// Usamos el timestamp numérico directamente para comparar más rápido
const DEADLINE = new Date(2026, 0, 14, 23, 59).getTime();

const UI = {
  box: `bg-Blanco shadow-2xl flex flex-col justify-center w-full min-h-[220px] rounded-[2.5rem] p-7 gap-4 md:w-[42vw] md:h-[16vw] md:rounded-[2.5vw] md:p-[2.5vw] md:gap-[1.2vw]`,
  btnBase: `gothamU tracking-widest flex items-center justify-center w-full shrink-0 transition-transform duration-300 will-change-transform hover:-translate-y-1 active:scale-95`,
  btnDorado: `bg-Dorado text-Azul py-5 text-2xl rounded-2xl shadow-md md:py-[1.3vw] md:text-[2.2vw] md:rounded-[1vw]`,
  btnAzul: `flex-1 bg-Azul text-Blanco py-4 text-xl rounded-xl shadow-sm md:py-[0.9vw] md:text-[1.1vw] md:rounded-[0.7vw]`,
  btnDisabled: `opacity-60 cursor-not-allowed`,
};

export default function AboutButtons() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Comprobación inicial al montar el componente
    setIsExpired(Date.now() > DEADLINE);
  }, []);

  const close = () => setActiveModal(null);

  return (
    <section class="flex w-full justify-center md:justify-start items-center">
      <div class={UI.box}>
        {/* BOTÓN 1: Inscripción */}
        <button
          type="button"
          disabled={isExpired}
          onClick={() => setActiveModal("form")}
          class={`${UI.btnBase} ${UI.btnDorado} ${isExpired ? UI.btnDisabled : ""}`}
        >
          {isExpired ? "INSCRIPCIÓN CERRADA" : "INSCRIPCIÓN"}
        </button>

        <nav class="flex gap-4 md:gap-[1.2vw] w-full">
          {/* BOTÓN 2: Reglas */}
          <button
            type="button"
            onClick={() => setActiveModal("rules")}
            class={`${UI.btnBase} ${UI.btnAzul}`}
          >
            REGLAS
          </button>

          <button
            type="button"
            disabled
            class={`${UI.btnBase} ${UI.btnAzul} ${UI.btnDisabled}`}
          >
            TRAILER
          </button>
        </nav>
      </div>

      {/* Renderizado condicional para ahorrar RAM */}
      {activeModal === "rules" && <RulesModal open onClose={close} />}

      {activeModal === "form" && !isExpired && (
        <InscripcionForm isOpen onClose={close} />
      )}
    </section>
  );
}