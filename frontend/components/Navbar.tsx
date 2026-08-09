"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-ink/80"
          : "bg-transparent"
      )}
    >
      <nav
        className="container-site flex h-16 items-center justify-between sm:h-20"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="group flex items-center gap-2 font-bold tracking-tight"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-transform group-hover:rotate-6">
            {siteConfig.name.charAt(0)}
          </span>
          <span className="hidden text-lg sm:inline">{siteConfig.name}</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink dark:text-ink-100/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/start-a-project" size="md">
            Start a project
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5 dark:text-white dark:hover:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink/10 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-ink/95 lg:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink dark:text-ink-100/80 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-3">
                <Button
                  href="/start-a-project"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Start a project
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}