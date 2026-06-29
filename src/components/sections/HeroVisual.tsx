"use client";

import { Sparkles, MessageCircle, Send, Mail, LayoutGrid } from "lucide-react";
import type { LucideIcon } from "lucide-react";

function Chip({
  className,
  icon: Icon,
  label,
  delay,
}: {
  className: string;
  icon: LucideIcon;
  label: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute ${className} flex animate-float items-center gap-1.5 rounded-full border border-white/10 bg-background/70 px-2.5 py-1.5 text-xs font-medium text-foreground-muted shadow-glass backdrop-blur-md`}
      style={{ animationDelay: delay }}
    >
      <Icon size={13} className="text-accent" />
      {label}
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[15rem] sm:max-w-[19rem] lg:max-w-[26rem]">
      {/* glow de fondo */}
      <div className="absolute inset-[10%] rounded-full bg-accent/10 blur-[60px]" />

      {/* anillo exterior giratorio (lento) */}
      <div className="absolute inset-[4%] animate-spin rounded-full border border-dashed border-white/10 [animation-duration:30s]" />
      {/* anillos concéntricos */}
      <div className="absolute inset-[20%] rounded-full border border-white/[0.07]" />
      <div className="absolute inset-[36%] rounded-full border border-white/[0.05]" />

      {/* núcleo IA */}
      <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-glow-pulse items-center justify-center rounded-2xl border border-accent/30 bg-accent/[0.1] text-accent shadow-glow backdrop-blur-md">
        <Sparkles size={30} />
      </div>

      {/* canales orbitando */}
      <Chip className="left-1/2 top-0 -translate-x-1/2" icon={MessageCircle} label="WhatsApp" delay="0s" />
      <Chip className="right-0 top-1/2 -translate-y-1/2" icon={Send} label="Telegram" delay="1.2s" />
      <Chip className="bottom-0 left-1/2 -translate-x-1/2" icon={Mail} label="Email" delay="0.6s" />
      <Chip className="left-0 top-1/2 -translate-y-1/2" icon={LayoutGrid} label="CRM" delay="1.8s" />
    </div>
  );
}
