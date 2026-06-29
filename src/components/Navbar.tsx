"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/casos-de-exito", label: "Casos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-mi", label: "Sobre mi" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 md:px-5 ${
          scrolled
            ? "border border-white/10 bg-background/70 shadow-glass backdrop-blur-xl"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-foreground"
        >
          RIA Consulting<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                pathname === l.href
                  ? "text-foreground"
                  : "text-foreground-muted hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/diagnostico" className="btn-primary ml-2 px-4 py-2">
            Diagnostico
            <ArrowRight size={15} />
          </Link>
        </nav>

        <button
          className="rounded-lg p-1 text-foreground-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl border border-white/10 bg-background/90 p-3 shadow-glass backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-white/5 hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/diagnostico"
            className="btn-primary mt-1 w-full"
            onClick={() => setOpen(false)}
          >
            Diagnostico
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </header>
  );
}
