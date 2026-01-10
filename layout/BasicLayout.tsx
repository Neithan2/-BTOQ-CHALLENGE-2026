import Footer from "@/components/Footer.tsx";
import Navbar from "@/islands/Navbar.tsx";
import { type MyContext } from "@/utils.ts";
import { Partial } from "fresh/runtime"; // Importante: importar Partial


export default function BasicLayout({ Component, url }: MyContext) {
  return (
    <div className="flex flex-col min-h-screen bg-Azul" f-client-nav>
      {/* f-client-nav activa la navegación fluida sin recargar la página */}

      <Navbar url={url.pathname} />

      <main className="grow select-none overflow-x-hidden">
        {/* Envolvemos el Component en el mismo Partial que usas en las rutas */}
        <Partial name="body">
          <Component />
        </Partial>
      </main>

      <Footer />
    </div>
  );
}
