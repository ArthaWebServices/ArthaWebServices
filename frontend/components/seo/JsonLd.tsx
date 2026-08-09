export interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Injects JSON-LD structured data matching Google's <script> rendering requirements. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}