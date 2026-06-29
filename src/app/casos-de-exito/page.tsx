import type { Metadata } from "next";
import { CasosView } from "./CasosView";

export const metadata: Metadata = {
  title: "Casos reales",
  description: "Sistemas implementados en negocios reales con Go High Level.",
};

export default function CasosPage() {
  return <CasosView />;
}
