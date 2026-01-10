import { useEffect } from "preact/hooks";
import { ComponentChildren } from "preact";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ComponentChildren;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidth = "max-w-5xl" }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Bloqueo de scroll eficiente
    const originalStyle = globalThis.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    globalThis.addEventListener("keydown", handleEsc);

    return () => {
      globalThis.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      {/* OVERLAY: Usamos CSS puro para la transición de entrada */}
      <div
        className="absolute inset-0 bg-Azul/85 backdrop-blur-md cursor-pointer transition-opacity"
        onClick={onClose}
      />

      {/* CONTENEDOR */}
      <div className={`relative w-full ${maxWidth} bg-[#1a2e42] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-Dorado/30 animate-scale-up`}>
        {children}
      </div>
    </div>
  );
}