import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PageShellProps = {
  tag: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  wide?: boolean;
  showCta?: boolean;
};

export function PageShell({
  tag,
  title,
  description,
  children,
  wide = false,
  showCta = false,
}: PageShellProps) {
  const widthClass = wide ? "section-wide" : "section";

  return (
    <div className="pt-24 pb-16">
      <div className={widthClass}>
        <p className="tag">{tag}</p>
        <h1 className="section-title mb-3">{title}</h1>
        {description && (
          <p className="text-foreground-muted mb-10 max-w-xl">{description}</p>
        )}
        {showCta && (
          <Link href="/diagnostico" className="btn-primary mb-10 inline-flex">
            Solicitar diagnostico
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
      <div className={widthClass}>{children}</div>
    </div>
  );
}
