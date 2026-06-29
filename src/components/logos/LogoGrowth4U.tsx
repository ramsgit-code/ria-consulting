// Growth4U — wordmark en negrita
export function LogoGrowth4U({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 168 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Growth4U"
    >
      <text
        x="0"
        y="31"
        fontFamily="Inter, Helvetica, Arial, sans-serif"
        fontSize="34"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="-1.2"
      >
        Growth4U
      </text>
    </svg>
  );
}
