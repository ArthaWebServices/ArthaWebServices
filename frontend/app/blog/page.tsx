import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { posts } from "@/data/posts";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Blog & Insights | Artha Web Services",
  description:
    "Explore web design strategy, Next.js engineering guides, and conversion rate optimization tips from Artha Web Services.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Artha Web Services Insights",
    description: "Web development, design systems, and conversion optimization insights.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 lg:pb-28">
      <JsonLd data={blogListJsonLd} />

      <div className="container-site">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Sparkles className="h-4 w-4" /> Insights & Strategy
          </span>
          <h1 className="h-display mt-3">
            Engineering & Design{" "}
            <span className="bg-gradient-to-r from-brand-500 to-indigo-400 bg-clip-text text-transparent">
              Knowledge Base
            </span>
          </h1>
          <p className="lead mt-6">
            Actionable articles on Next.js performance, custom UI/UX design systems, and conversion
            rate optimization to grow your business online.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card card-hover flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-ink/50 dark:text-ink-100/50">
                  <span className="inline-flex items-center rounded-full bg-brand-500/10 px-2.5 py-1 font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-ink/70 dark:text-ink-100/70 line-clamp-3">
                  {post.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {post.author.avatar}
                  </span>
                  <span className="text-xs font-medium text-ink/80 dark:text-ink-100/80">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400"
                >
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
