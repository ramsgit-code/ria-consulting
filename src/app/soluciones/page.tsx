import type { Metadata } from "next";
import { SolucionesView } from "./SolucionesView";

export const metadata: Metadata = {
  title: "Soluciones por sector",
  description:
    "Sistemas de automatización para clínicas, eventos, formación y servicios profesionales en Go High Level.",
};

export default function SolucionesPage() {
  return <SolucionesView />;
}
