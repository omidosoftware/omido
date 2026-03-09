"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, ChevronDown } from "lucide-react";
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

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    // Client-side validation
    if (!data.name || !data.email || !data.message) {
      setStatus("error");
      setErrorMessage("Vul alle verplichte velden in.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Er ging iets mis. Probeer het opnieuw.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Er ging iets mis. Probeer het opnieuw."
      );
    }
  }

  return (
    <FadeIn delay={0.1}>
      <Card padding="spacious">
        <AnimatePresence mode="wait">
          {status === "success" ? (
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

              {/* Error banner */}
              {status === "error" && errorMessage && (
                <div className="mb-5 flex items-start gap-3 rounded-[var(--radius-sm)] border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <p className="text-sm text-red-400">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      Naam *
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
                      E-mail *
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
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      className={`${inputClasses} appearance-none pr-10`}
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
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[12px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    Bericht *
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
                  disabled={status === "submitting"}
                  className="group inline-flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-accent px-8 py-3.5 text-[15px] font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-glow-sm disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  {status === "submitting" ? "Verzenden..." : "Verstuur bericht"}
                  {status !== "submitting" && (
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </FadeIn>
  );
}
