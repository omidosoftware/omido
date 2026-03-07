"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-bg-elevated/90 backdrop-blur-md border-b border-border-subtle shadow-sm"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Hoofdnavigatie"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[4.5rem]">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-baseline gap-1.5 text-text-primary"
            aria-label="Omido Software — Terug naar home"
          >
            <span className="text-xl font-bold tracking-tight transition-colors group-hover:text-accent">
              OMIDO
            </span>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-text-muted transition-colors group-hover:text-text-tertiary">
              SOFTWARE
            </span>
          </Link>

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
              Start een gesprek
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary lg:hidden"
            aria-label={mobileOpen ? "Sluit menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border-subtle bg-bg-elevated lg:hidden"
          >
            <div className="mx-auto max-w-[1200px] px-6 py-4">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-[var(--radius-sm)] px-4 py-3.5 text-base font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-bg-subtle text-accent"
                          : "text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_ITEMS.length * 0.05, duration: 0.3 }}
                >
                  <Link
                    href="/contact"
                    className="mt-3 block rounded-[var(--radius-sm)] bg-accent px-4 py-3.5 text-center text-base font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
                  >
                    Start een gesprek
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
