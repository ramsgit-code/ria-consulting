import type { Metadata } from "next";
import { ServiciosView } from "./ServiciosView";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Lead Qualification, Proposal Automation y CRM Automation en Go High Level.",
};

export default function ServiciosPage() {
  return <ServiciosView />;
}
