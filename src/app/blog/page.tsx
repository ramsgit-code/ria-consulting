import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guias sobre automatizacion comercial y Go High Level.",
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: {
    slug: string;
    title: string;
    description: string;
    publishedAt: Date | null;
    tags: string[];
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        description: true,
        publishedAt: true,
        tags: true,
      },
    });
  } catch {
    // DB not configured
  }

  return (
    <>
      <PageShell
        tag="Blog"
        title="Guias practicas"
        description="Automatizacion comercial y Go High Level. Sin teoria vacia."
        wide
      >
        {posts.length === 0 ? (
          <p className="text-sm text-muted">Proximamente nuevos articulos.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card group flex h-full flex-col"
                >
                  <h2 className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mb-4 mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {post.description}
                  </p>
                  <p className="text-xs text-muted">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("es-ES")
                      : ""}
                    {post.tags.length > 0 &&
                      ` · ${post.tags.slice(0, 2).join(", ")}`}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </PageShell>
      <PageCTA />
    </>
  );
}
