import Footer from "@/components/Footer.tsx";
import Navbar from "@/islands/Navbar.tsx";
import { type MyContext } from "@/utils.ts";
import { Partial } from "fresh/runtime";


export default function BasicLayout({ Component, url }: MyContext) {
  return (
    <div className="flex flex-col min-h-screen bg-Azul" f-client-nav>
      <header>
        <Navbar url={url.pathname} />
      </header>
      <Partial name="body">
        <main id="main-content">
          <Component />
        </main>
      </Partial>


      <Footer />
    </div>
  );
}