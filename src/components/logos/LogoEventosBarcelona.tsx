// Eventos Barcelona — escudo/gota rojo con "eB" + texto
export function LogoEventosBarcelona({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 270 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EB Eventos Barcelona"
    >
      {/* ── Escudo / gota roja ──────────────────────────── */}
      {/*  Forma: óvalo superior, punta inferior izquierda  */}
      <path
        d="M10,2 C4,2 2,8 2,16 C2,32 8,44 18,52 C26,44 42,32 44,16 C44,8 40,2 34,2 Z"
        fill="#CC2929"
      />
      {/* ── "e" en cursiva ──────────────────────────────── */}
      <text
        x="7"
        y="34"
        fontFamily="Georgia, Times New Roman, serif"
        fontSize="22"
        fontWeight="400"
        fontStyle="italic"
        fill="white"
      >
        e
      </text>
      {/* ── "B" en bold ─────────────────────────────────── */}
      <text
        x="21"
        y="34"
        fontFamily="Arial Black, Arial, sans-serif"
        fontSize="20"
        fontWeight="900"
        fill="white"
      >
        B
      </text>

      {/* ── "eventos" ───────────────────────────────────── */}
      <text
        x="54"
        y="30"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-0.3"
      >
        eventos
      </text>

      {/* ── "BARCELONA" ─────────────────────────────────── */}
      <text
        x="55"
        y="46"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9"
        fontWeight="400"
        fill="currentColor"
        letterSpacing="3.5"
        opacity="0.75"
      >
        BARCELONA
      </text>

      {/* ── "Bringing ideas to life" ─────────────────────── */}
      <text
        x="56"
        y="57"
        fontFamily="Georgia, Times New Roman, serif"
        fontSize="7.5"
        fontStyle="italic"
        fill="currentColor"
        opacity="0.5"
        letterSpacing="0.2"
      >
        Bringing ideas to life
      </text>
    </svg>
  );
}
