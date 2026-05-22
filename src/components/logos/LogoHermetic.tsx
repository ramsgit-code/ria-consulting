// Lederle Hermetic — engranaje semicircular + LEDERLE / Hermetic
export function LogoHermetic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 210 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lederle Hermetic"
    >
      {/* ── Engranaje ──────────────────────────────────── */}
      <g transform="translate(2, 1)">
        {/* Aro exterior */}
        <circle cx="22" cy="24" r="16" stroke="currentColor" strokeWidth="2.2" fill="none" />
        {/* Agujero central */}
        <circle cx="22" cy="24" r="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
        {/* Dientes rectangulares — 10 dientes */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 * Math.PI) / 180;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const x1 = 22 + 16 * cos;
          const y1 = 24 + 16 * sin;
          const x2 = 22 + 22 * cos;
          const y2 = 24 + 22 * sin;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            />
          );
        })}
      </g>

      {/* ── Línea divisoria horizontal ──────────────────── */}
      <line x1="50" y1="24" x2="208" y2="24" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />

      {/* ── LEDERLE ─────────────────────────────────────── */}
      <text
        x="52"
        y="20"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="8"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="3.5"
        opacity="0.8"
      >
        LEDERLE
      </text>

      {/* ── Hermetic ────────────────────────────────────── */}
      <text
        x="50"
        y="42"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Hermetic
      </text>
    </svg>
  );
}
