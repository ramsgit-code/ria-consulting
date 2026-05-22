export function renderMarkdown(body: string) {
  return body.split("\n").map((line, i) => {
    if (line.startsWith("## "))
      return (
        <h2 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">
          {line.slice(3)}
        </h2>
      );
    if (line.startsWith("### "))
      return (
        <h3 key={i} className="text-lg font-medium text-foreground mt-6 mb-2">
          {line.slice(4)}
        </h3>
      );
    if (line.startsWith("- "))
      return (
        <li key={i} className="ml-4 mb-1 text-foreground-muted text-sm">
          {line.slice(2)}
        </li>
      );
    if (line.startsWith("**") && line.endsWith("**"))
      return (
        <p key={i} className="font-medium text-foreground my-2">
          {line.slice(2, -2)}
        </p>
      );
    if (line.trim() === "") return <br key={i} />;
    return (
      <p key={i} className="mb-3 text-sm text-foreground-muted leading-relaxed">
        {line}
      </p>
    );
  });
}
