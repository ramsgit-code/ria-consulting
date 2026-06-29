// Fondo global: mesh aurora animado + grid sutil + vignette.
// Sin JS — solo CSS (animaciones definidas en tailwind.config).
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* grid sutil */}
      <div className="grid-bg absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />

      {/* blobs aurora */}
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 animate-aurora-1 rounded-full bg-aurora1/20 blur-[140px]" />
      <div className="absolute -top-24 -left-32 h-[34rem] w-[34rem] animate-aurora-2 rounded-full bg-aurora2/20 blur-[150px]" />
      <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] animate-aurora-3 rounded-full bg-aurora3/[0.14] blur-[150px]" />

      {/* vignette inferior para fundir con el contenido */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
