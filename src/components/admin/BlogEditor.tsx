"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slug";

type BlogPostInput = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string;
  published: boolean;
};

export function BlogEditor({ initial }: { initial?: BlogPostInput }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostInput>(
    initial ?? {
      title: "",
      slug: "",
      description: "",
      content: "",
      tags: "",
      published: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof BlogPostInput, value: string | boolean) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "title" && !initial?.id) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const url = initial?.id ? `/api/admin/blog/${initial.id}` : "/api/admin/blog";
    const method = initial?.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Error al guardar");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  };

  const inputClass =
    "w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent";

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 max-w-2xl">
      <div>
        <label className="text-xs text-muted block mb-1">Titulo</label>
        <input
          className={inputClass}
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Slug</label>
        <input
          className={inputClass}
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Descripcion</label>
        <input
          className={inputClass}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Tags (separados por coma)</label>
        <input
          className={inputClass}
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          placeholder="automatizacion, gohighlevel"
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Contenido (markdown)</label>
        <textarea
          className={`${inputClass} min-h-[280px] font-mono`}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="rounded border-border"
        />
        Publicado
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className="btn-primary w-fit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
