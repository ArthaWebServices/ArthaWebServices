"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { faq } from "@/data/faq";

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faq.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-ink/10 bg-white/70 backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-white/[0.03]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-base font-semibold">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen
                    ? "border-brand-500 text-brand-500"
                    : "border-ink/15 text-ink/60 dark:border-white/20 dark:text-white/60"
                }`}
              >
                {isOpen ? (
                  <Minus className="h-4 w-4" aria-hidden />
                ) : (
                  <Plus className="h-4 w-4" aria-hidden />
                )}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-ink/60 dark:text-ink-100/60">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq" className="bg-ink-50/50 dark:bg-white/[0.02]">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you might want to know before we start — and if yours isn't here, just ask."
      />
      <FaqAccordion />
    </Section>
  );
}