// Fondo global: mesh aurora + grid sutil + vignette.
// En móvil las animaciones se desactivan (sm:) para no repintar en bucle.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* grid sutil */}
      <div className="grid-bg absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_75%)]" />

      {/* blobs aurora — estáticos en móvil, animados en sm+ */}
      <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-aurora1/20 blur-[110px] sm:h-[42rem] sm:w-[42rem] sm:animate-aurora-1" />
      <div className="absolute -top-24 -left-32 hidden h-[34rem] w-[34rem] rounded-full bg-aurora2/20 blur-[120px] sm:block sm:animate-aurora-2" />
      <div className="absolute top-1/3 -right-40 hidden h-[36rem] w-[36rem] rounded-full bg-aurora3/[0.14] blur-[120px] sm:block sm:animate-aurora-3" />

      {/* vignette inferior */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
