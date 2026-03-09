"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";
import { isValidPhone } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape key to close mobile nav
  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  // Focus trap for mobile nav overlay
  useEffect(() => {
    if (!mobileOpen) return;

    const overlay = document.querySelector('[role="dialog"]') as HTMLElement;
    if (!overlay) return;

    const focusableElements = overlay.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen]);

  const showPhone = isValidPhone(COMPANY.phone);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        mobileOpen
          ? "bg-[#0A0A0B]"
          : scrolled
            ? "bg-bg-elevated/90 backdrop-blur-md border-b border-border-subtle shadow-sm"
            : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        {/* Mobile: 3-col grid with centered logo. Desktop: flex row. */}
        <div className="grid h-16 grid-cols-[3rem_1fr_3rem] items-center lg:flex lg:h-[4.5rem] lg:justify-between">
          {/* Mobile spacer (left) — hidden on desktop */}
          <div className="lg:hidden" />

          {/* Logo */}
          <Link
            href="/"
            className="justify-self-center lg:justify-self-auto relative shrink-0"
            aria-label="OMIDO Software — Terug naar home"
          >
            <Image
              src="/logo.png"
              alt="OMIDO Software"
              width={110}
              height={36}
              className="h-8 w-auto lg:h-9"
              priority
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="justify-self-end flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary lg:hidden"
            aria-label={mobileOpen ? "Sluit menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  mobileOpen
                    ? 'top-[9.5px] rotate-45'
                    : 'top-[5px] rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  mobileOpen
                    ? 'top-[9.5px] -rotate-45'
                    : 'top-[13px] rotate-0'
                }`}
              />
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-[var(--radius-sm)] px-4 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-accent"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 rounded-[var(--radius-sm)] bg-accent px-5 py-2 text-[13px] font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-glow-sm"
            >
              Plan een kennismaking
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay — Typography-led, left-aligned */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0B] lg:hidden"
            style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 2rem))" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobiel navigatiemenu"
          >
            {/* Close control — top right, text-based */}
            <div className="flex justify-end px-8 pt-5">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => setMobileOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[13px] font-medium tracking-[0.04em] text-text-tertiary transition-colors active:text-text-primary"
                aria-label="Sluit menu"
              >
                Sluiten
              </motion.button>
            </div>

            {/* Nav items — centered, graduated type scale */}
            <div className="flex flex-1 flex-col items-center justify-center -mt-8">
              <div className="flex flex-col items-center space-y-7">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.05,
                        duration: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`block font-[family-name:var(--font-instrument-serif)] tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-[2.25rem] leading-[1.1] text-text-primary"
                            : "text-[1.875rem] leading-[1.1] text-text-tertiary active:text-text-secondary"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-line"
                          className="mx-auto mt-2 h-[1.5px] w-8 bg-accent"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom — contact info */}
            <div className="px-8 pb-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="border-t border-border-subtle pt-5 text-center"
              >
                {showPhone && (
                  <a
                    href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                    className="block text-[13px] tracking-wide text-text-muted"
                  >
                    {COMPANY.phone}
                  </a>
                )}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className={`block text-[13px] tracking-wide text-text-muted ${showPhone ? "mt-1" : ""}`}
                >
                  {COMPANY.email}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
