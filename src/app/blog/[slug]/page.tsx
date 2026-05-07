import React from "react";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://ramiroperez.com";

interface PostData {
  title: string;
  description: string;
  date: string;
  tags: string[];
  body: string;
}

async function getPost(slug: string): Promise<PostData | null> {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  try {
    const content = await fs.readFile(path.join(blogDir, `${slug}.mdx`), "utf-8");
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) return null;
    const fm = frontmatterMatch[1];
    const body = frontmatterMatch[2];
    const get = (key: string) => fm.match(new RegExp(`${key}: "?([^"\n]+)"?`))?.[1] ?? "";
    const tagsMatch = fm.match(/tags: \[([^\]]+)\]/);
    const tags = tagsMatch
      ? tagsMatch[1].split(",").map((t) => t.trim().replace(/"/g, ""))
      : [];
    return { title: get("title"), description: get("description"), date: get("date"), tags, body };
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string, limit = 3) {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  try {
    const files = await fs.readdir(blogDir);
    const others = files.filter((f) => f.endsWith(".mdx") && f !== `${currentSlug}.mdx`);
    const posts = await Promise.all(
      others.map(async (f) => {
        const content = await fs.readFile(path.join(blogDir, f), "utf-8");
        const fm = content.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
        const get = (k: string) => fm.match(new RegExp(`${k}: "?([^"\n]+)"?`))?.[1] ?? "";
        return { slug: f.replace(".mdx", ""), title: get("title"), description: get("description"), date: get("date") };
      })
    );
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
  } catch {
    return [];
  }
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let last = 0;
  let match;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[2])
      parts.push(<strong key={key++} className="font-semibold text-foreground">{match[2]}</strong>);
    else if (match[3])
      parts.push(<code key={key++} className="text-xs bg-white/10 rounded px-1.5 py-0.5 font-mono">{match[3]}</code>);
    else if (match[4] && match[5])
      parts.push(
        <a key={key++} href={match[5]} className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors" target={match[5].startsWith("http") ? "_blank" : undefined} rel={match[5].startsWith("http") ? "noopener noreferrer" : undefined}>
          {match[4]}
        </a>
      );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function renderMarkdown(body: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = body.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      nodes.push(
        <h2 key={key++} className="text-xl md:text-2xl font-bold text-foreground mt-12 mb-4 leading-snug">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
    } else if (line.startsWith("### ")) {
      nodes.push(
        <h3 key={key++} className="text-lg font-semibold text-foreground mt-8 mb-3">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(
          <li key={items.length} className="flex gap-2 items-start">
            <span className="text-accent mt-1.5 shrink-0 text-xs">→</span>
            <span>{renderInline(lines[i].slice(2))}</span>
          </li>
        );
        i++;
      }
      nodes.push(
        <ul key={key++} className="flex flex-col gap-2 my-4 text-foreground-muted">
          {items}
        </ul>
      );
    } else if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      let n = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(
          <li key={items.length} className="flex gap-3 items-start">
            <span className="text-accent font-mono text-xs mt-1.5 shrink-0">{String(n++).padStart(2, "0")}</span>
            <span>{renderInline(lines[i].replace(/^\d+\. /, ""))}</span>
          </li>
        );
        i++;
      }
      nodes.push(
        <ol key={key++} className="flex flex-col gap-2 my-4 text-foreground-muted">
          {items}
        </ol>
      );
    } else if (line.startsWith("> ")) {
      nodes.push(
        <blockquote key={key++} className="border-l-2 border-accent/40 pl-4 my-4 italic text-foreground-muted">
          {renderInline(line.slice(2))}
        </blockquote>
      );
      i++;
    } else if (line === "---") {
      nodes.push(<hr key={key++} className="border-border my-10" />);
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      nodes.push(
        <p key={key++} className="mb-4 leading-relaxed text-foreground-muted">
          {renderInline(line)}
        </p>
      );
      i++;
    }
  }

  return nodes;
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  try {
    const files = await fs.readdir(blogDir);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => ({ slug: f.replace(".mdx", "") }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Artículo no encontrado" };

  const ogUrl = `/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.tags[0] ?? "Blog")}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${BASE_URL}/blog/${params.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${params.slug}`,
      publishedTime: post.date,
      authors: ["Ramiro Perez"],
      tags: post.tags,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, related] = await Promise.all([getPost(params.slug), getRelatedPosts(params.slug)]);
  if (!post) notFound();

  const minutes = readingTime(post.body);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Ramiro Perez",
      url: BASE_URL,
    },
    publisher: { "@id": `${BASE_URL}/#person` },
    url: `${BASE_URL}/blog/${params.slug}`,
    inLanguage: "es-ES",
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${params.slug}` },
  };

  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-2xl mx-auto px-6">
        <Link
          href="/blog"
          className="text-sm text-foreground-muted hover:text-foreground transition-colors mb-10 inline-flex items-center gap-1.5"
        >
          ← Volver al blog
        </Link>

        {/* Header */}
        <header className="mt-6 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="text-xs font-mono text-accent/80 border border-accent/20 rounded px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-foreground-muted text-lg leading-relaxed mb-6">{post.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted border-t border-border pt-5">
            <span>Por <span className="text-foreground-muted">Ramiro Perez</span></span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{minutes} min de lectura</span>
          </div>
        </header>

        {/* Body */}
        <article className="text-[15px]">
          {renderMarkdown(post.body)}
        </article>

        {/* CTA */}
        <div className="mt-14 border border-accent/20 bg-accent/5 rounded-2xl p-8">
          <p className="text-lg font-semibold text-foreground mb-2">
            ¿Quieres aplicar esto en tu negocio?
          </p>
          <p className="text-foreground-muted text-sm mb-5">
            En 30 minutos analizo tu proceso comercial y te digo exactamente que sistema necesitas.
          </p>
          <Link href="/diagnostico" className="btn-primary">
            Solicita tu diagnostico gratuito →
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <p className="text-xs text-muted uppercase tracking-wider mb-6">Más artículos</p>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-border hover:border-accent/30 transition-colors"
                >
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
