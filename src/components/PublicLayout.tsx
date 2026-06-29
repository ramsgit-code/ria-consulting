"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { AuroraBackground } from "@/components/AuroraBackground";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <AuroraBackground />
      <AnalyticsTracker />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
