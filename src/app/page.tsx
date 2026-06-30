import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";

export default function Home() {
  return (
    <>
      <Hero />
      {/* pasos: ocultos en móvil (home light), visibles en escritorio */}
      <div className="hidden sm:block">
        <Process />
      </div>
    </>
  );
}
