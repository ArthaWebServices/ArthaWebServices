import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Sparkles } from "lucide-react";
import { posts } from "@/data/posts";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Artha Web Services`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.legalName,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <article className="pt-28 pb-20 sm:pt-36 lg:pb-28">
      <JsonLd data={postJsonLd} />

      <div className="container-site max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition-colors hover:text-brand-600 dark:text-ink-100/60 dark:hover:text-brand-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
        </Link>

        <header className="mt-6">
          <div className="flex items-center gap-3 text-xs text-ink/50 dark:text-ink-100/50">
            <span className="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 font-semibold text-brand-600 dark:bg-brand-500/20 dark:text-brand-300">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="h-display mt-4">{post.title}</h1>

          {/* Author Badge */}
          <div className="mt-6 flex items-center gap-3 border-y border-ink/10 py-4 dark:border-white/10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/30">
              {post.author.avatar}
            </span>
            <div>
              <p className="text-sm font-bold text-ink dark:text-white">{post.author.name}</p>
              <p className="text-xs text-ink/60 dark:text-ink-100/60">{post.author.role}</p>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-lg dark:prose-invert mt-8 max-w-none space-y-6 text-ink/80 dark:text-ink-100/80 leading-relaxed">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={idx} className="mt-10 text-2xl font-bold text-ink dark:text-white">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={idx} className="list-disc space-y-2 pl-6">
                  {paragraph.split("\n").map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.match(/^\d+\./)) {
              return (
                <ol key={idx} className="list-decimal space-y-2 pl-6">
                  {paragraph.split("\n").map((item, itemIdx) => (
                    <li key={itemIdx}>{item.replace(/^\d+\.\s*/, "")}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* CTA Banner */}
        <div className="card mt-16 p-8 text-center sm:p-12">
          <Sparkles className="mx-auto h-8 w-8 text-brand-500" />
          <h2 className="mt-4 text-2xl font-bold">Ready to elevate your digital presence?</h2>
          <p className="lead mx-auto mt-2 max-w-xl text-sm sm:text-base">
            Let&apos;s build a website tailored to your brand goals, engineering speed, and audience conversion.
          </p>
          <Button href="/start-a-project" size="lg" className="mt-6">
            Start a project
          </Button>
        </div>
      </div>
    </article>
  );
}
