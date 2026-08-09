import type { Metadata } from "next";
import { ProjectForm } from "@/components/ProjectForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell us about your project — strategy, design, and development under one roof. Reply within one business day.",
  alternates: { canonical: "/start-a-project" },
  openGraph: {
    title: `Start a Project | ${siteConfig.name}`,
    description:
      "Tell us about your project — strategy, design, and development under one roof. Reply within one business day.",
    url: `${siteConfig.url}/start-a-project`,
  },
};

export default function StartProjectPage() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[110px] dark:bg-brand-600/20" />
      </div>

      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">Start a project</span>
          <h1 className="h-display">Tell us about your project</h1>
          <p className="lead mt-5">
            Share a few details and we&apos;ll reply within one business day with a clear next
            step — and an honest recommendation on whether we&apos;re the right fit.
          </p>

          <div className="card mt-10 p-6 sm:p-8">
            <ProjectForm />
          </div>
        </div>
      </div>
    </section>
  );
}
