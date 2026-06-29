import type { Metadata } from "next";
import { SobreMiView } from "./SobreMiView";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Especialista en sistemas de captación y automatización comercial con Go High Level.",
};

export default function SobreMiPage() {
  return <SobreMiView />;
}
