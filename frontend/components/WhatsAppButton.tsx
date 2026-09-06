import { siteConfig } from "@/lib/site";

/**
 * Floating WhatsApp button.
 *
 * Renders a fixed, always-available bubble (bottom-right) that opens a
 * WhatsApp chat with a pre-filled message. Hidden automatically when no
 * WhatsApp number is configured.
 *
 * Accessibility & motion:
 *  - aria-label describes the action
 *  - the pulse ring is disabled under prefers-reduced-motion
 *  - focus-visible ring matches the site's Button component
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const phone = siteConfig.contact.whatsapp;
  if (!phone) return null;

  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;

  const href = `https://wa.me/${digits}?text=${encodeURIComponent(
    "Hi Artha Web Services! I'd like to chat about a project."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Artha Web Services on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center sm:bottom-6 sm:right-6"
    >
      {/* Hover / focus label */}
      <span className="pointer-events-none mr-3 hidden translate-x-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-800 opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 dark:bg-ink dark:text-ink-50 dark:ring-white/10 sm:inline-flex">
        Chat with us
      </span>

      {/* Bubble */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        {/* Pulse ring — disabled for reduced-motion users */}
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:animate-none"
        />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
