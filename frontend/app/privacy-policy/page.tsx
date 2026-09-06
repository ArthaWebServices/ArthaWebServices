import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Artha Web Services collects, uses, and protects information from visitors of arthawebservices.dev.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description:
      "How Artha Web Services collects, uses, and protects information from visitors of arthawebservices.dev.",
    url: `${siteConfig.url}/privacy-policy`,
  },
};

const lastUpdated = "2026-09-06";

export default function PrivacyPolicyPage() {
  return (
    <article className="pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="h-display mt-3">Privacy Policy</h1>
          <p className="mt-4 text-sm text-ink/50 dark:text-ink-100/50">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-custom mt-10 space-y-8 text-base leading-relaxed text-ink/80 dark:text-ink-100/80">
            <section>
              <h2 className="h-section text-2xl">Overview</h2>
              <p>
                This Privacy Policy explains how {siteConfig.legalName} (&ldquo;we&rdquo;,
                &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares
                information when you visit {siteConfig.url} (the
                &ldquo;Site&rdquo;) or use our contact form. We collect the minimum
                information needed to operate the Site and respond to your enquiry, and
                we don&apos;t sell your data to anyone.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Information we collect</h2>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <strong>Information you provide directly</strong>: when you submit
                  our <Link href="/start-a-project" className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300">project enquiry form</Link>,
                  we receive the fields you fill in (typically name, email, phone,
                  company, project description) plus any file attachments and links to
                  Google Docs or Dropbox folders you choose to share.
                </li>
                <li>
                  <strong>Server logs</strong>: our hosting provider (Vercel) records
                  basic request metadata — IP address, user-agent, requested URL,
                  response status — for security and operational purposes. Logs are
                  retained for a short rolling window per Vercel&apos;s policy.
                </li>
                <li>
                  <strong>Cookies</strong>: the Site itself does not set tracking
                  cookies. If analytics is enabled (see below), the analytics provider
                  may set first-party cookies or use local storage as described in
                  their own policy.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h-section text-2xl">Analytics</h2>
              <p>
                The Site may load Google Analytics 4 or Plausible Analytics only when
                the corresponding environment variable is set
                (<code>NEXT_PUBLIC_GA_ID</code> or <code>NEXT_PUBLIC_PLAUSIBLE_DOMAIN</code>).
                In production deployments these are not set, so no third-party
                analytics runs. If enabled, the provider receives anonymised usage
                data subject to their own terms:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>
                  <a className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics privacy</a>
                </li>
                <li>
                  <a className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300" href="https://plausible.io/data-policy" target="_blank" rel="noopener noreferrer">Plausible data policy</a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h-section text-2xl">How we use your information</h2>
              <p>We use the information we collect to:</p>
              <ul className="ml-5 list-disc space-y-2">
                <li>Respond to your project enquiry and provide a proposal.</li>
                <li>Operate, secure, and improve the Site.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p>
                We do not sell, rent, or share your personal information with third
                parties for their own marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">How long we keep your information</h2>
              <p>
                Enquiry submissions are retained in our inbox and project management
                tools for as long as we have an active business relationship with you,
                plus a reasonable period afterwards for record-keeping. You can ask us
                to delete your enquiry at any time (see contact below).
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Your rights</h2>
              <p>
                Depending on where you live, you may have the right to access, correct,
                delete, or port the personal information we hold about you. To exercise
                any of these rights, email us at{" "}
                <a
                  className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
                . We respond to verified requests within 30 days.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Security</h2>
              <p>
                The Site is served over HTTPS. Form submissions are transmitted over
                TLS to our backend, which applies rate limiting and basic input
                validation. No system is perfectly secure, but we take reasonable
                steps to protect your information.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Children</h2>
              <p>
                The Site is not directed at children under 13, and we do not knowingly
                collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The
                &ldquo;Last updated&rdquo; date at the top of this page reflects when
                it was last revised. Material changes will be noted on this page.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">Contact</h2>
              <p>
                Questions about this policy? Email{" "}
                <a
                  className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
