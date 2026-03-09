"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if we're on a large screen — if so, never show
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Show after scrolling past 1 viewport height
      const pastHero = scrollY > viewportHeight;

      // Hide when near elements that have their own CTA
      const hideElements = document.querySelectorAll('[data-hide-sticky-cta]');
      let nearBottom = false;
      hideElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight + 100) {
          nearBottom = true;
        }
      });

      // Also always hide near footer
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < viewportHeight + 100) {
          nearBottom = true;
        }
      }

      setVisible(pastHero && !nearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-bg-primary/95 backdrop-blur-sm lg:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          <div className="px-4 py-3">
            <Link
              href="/contact"
              className="block w-full rounded-[var(--radius-sm)] bg-accent py-3 text-center text-[15px] font-semibold text-bg-primary transition-colors hover:bg-accent-hover"
            >
              Plan een gesprek
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
