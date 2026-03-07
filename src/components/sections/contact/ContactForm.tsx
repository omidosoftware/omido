"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FadeIn } from "@/components/motion/FadeIn";

const serviceOptions = [
  "AI-integraties & automatisering",
  "Maatwerk web applicatie",
  "Compleet SaaS-platform",
  "API-koppeling / systeemintegratie",
  "Anders / advies",
];

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-border-default bg-bg-muted px-4 py-3 text-[15px] text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 hover:border-border-hover";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <FadeIn delay={0.1}>
      <Card padding="spacious">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="py-14 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-muted shadow-glow-sm">
                <Check className="h-6 w-6 text-accent" strokeWidth={2.5} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-text-primary">
                Bericht verzonden
              </h3>
              <p className="text-text-secondary">
                Bedankt! Je hoort binnen 24 uur van ons.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <h2 className="mb-7 text-lg font-semibold text-text-primary">
                Vertel ons over jouw project
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      Naam
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Bijv. Jan Jansen"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jan@bedrijf.nl"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    Type project
                  </label>
                  <select
                    id="service"
                    name="service"
                    className={`${inputClasses} appearance-none`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Kies een expertise...
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Beschrijf je idee, wensen en eventuele vragen..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-accent px-8 py-3.5 text-[15px] font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-glow-sm md:w-auto"
                >
                  Verstuur bericht
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </FadeIn>
  );
}
