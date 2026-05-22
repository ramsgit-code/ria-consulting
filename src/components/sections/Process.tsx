import { processSteps } from "@/lib/site-content";

export function Process() {
  return (
    <section>
      <div className="section">
        <p className="tag">Como trabajo</p>
        <h2 className="section-title mb-8">Cuatro pasos. Sin sorpresas.</h2>

        <ol className="flex flex-col gap-6">
          {processSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="text-sm font-medium text-accent shrink-0 w-6">{i + 1}.</span>
              <div>
                <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-foreground-muted">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
