import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions governing your use of arthawebservices.dev and any services we provide.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description:
      "The terms and conditions governing your use of arthawebservices.dev and any services we provide.",
    url: `${siteConfig.url}/terms`,
  },
};

const lastUpdated = "2026-09-06";

export default function TermsPage() {
  return (
    <article className="pt-28 pb-20 sm:pt-36 lg:pb-28">
      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="h-display mt-3">Terms of Service</h1>
          <p className="mt-4 text-sm text-ink/50 dark:text-ink-100/50">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-custom mt-10 space-y-8 text-base leading-relaxed text-ink/80 dark:text-ink-100/80">
            <section>
              <h2 className="h-section text-2xl">1. Agreement</h2>
              <p>
                By accessing {siteConfig.url} (the &ldquo;Site&rdquo;) or engaging
                {" "}{siteConfig.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) for any service, you agree to these Terms of Service
                (&ldquo;Terms&rdquo;). If you do not agree, please do not use the Site.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">2. Use of this Site</h2>
              <p>
                The Site and its content are provided for general information about
                our services. You agree not to:
              </p>
              <ul className="ml-5 list-disc space-y-2">
                <li>Use the Site for any unlawful purpose.</li>
                <li>Attempt to interfere with the Site&apos;s security or operation.</li>
                <li>
                  Scrape, mirror, or republish our content without written permission.
                </li>
                <li>
                  Submit false, misleading, or harmful information through our contact
                  forms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="h-section text-2xl">3. Intellectual property</h2>
              <p>
                All content on this Site — including text, graphics, code, logos, and
                design — is owned by {siteConfig.legalName} or our licensors and is
                protected by copyright and other applicable laws. You may view and
                share links to our content for non-commercial use; any other use
                requires our prior written permission.
              </p>
              <p>
                The &ldquo;Artha Web Services&rdquo; name and logo are our trademarks.
                Don&apos;t use them in a way that suggests endorsement or partnership
                without our written consent.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">4. No professional advice</h2>
              <p>
                Information on this Site is provided for general guidance only. It
                isn&apos;t legal, financial, or other professional advice, and it
                shouldn&apos;t be relied on as such. Specific advice requires a
                signed engagement.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">5. Engagements and proposals</h2>
              <p>
                Submitting a project enquiry through the Site is not a binding
                agreement to provide or purchase services. A binding engagement
                requires a signed proposal or statement of work that supersedes these
                Terms for that specific project. Standard payment terms, intellectual
                property assignment, and warranty language are set out in that
                document.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">6. Third-party links</h2>
              <p>
                The Site may link to third-party websites for context or convenience.
                We don&apos;t control those sites and aren&apos;t responsible for their
                content, terms, or privacy practices.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">7. Disclaimers and limitation of liability</h2>
              <p>
                The Site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
                without warranties of any kind, either express or implied, including
                but not limited to warranties of merchantability, fitness for a
                particular purpose, or non-infringement. We do not warrant that the
                Site will be uninterrupted, secure, or error-free.
              </p>
              <p>
                To the maximum extent permitted by law, {siteConfig.legalName} will
                not be liable for any indirect, incidental, special, consequential, or
                punitive damages arising out of or related to your use of the Site.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold {siteConfig.legalName} harmless from
                any claim arising out of your breach of these Terms or your misuse of
                the Site.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">9. Changes to these Terms</h2>
              <p>
                We may update these Terms from time to time. The &ldquo;Last
                updated&rdquo; date at the top of this page reflects when they were
                last revised. Continued use of the Site after a change means you
                accept the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">10. Governing law</h2>
              <p>
                These Terms are governed by the laws of the State of New York, United
                States, without regard to its conflict-of-laws principles. Any dispute
                will be resolved in the state or federal courts located in New York
                County, New York.
              </p>
            </section>

            <section>
              <h2 className="h-section text-2xl">11. Contact</h2>
              <p>
                Questions about these Terms? Email{" "}
                <a
                  className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>{" "}
                or use our{" "}
                <Link
                  href="/start-a-project"
                  className="text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
                >
                  project enquiry form
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
