"use client";

import { motion } from "framer-motion";
import { StaggerChildren, staggerItemVariants } from "@/components/motion/StaggerChildren";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/content/services";

export function ServiceGrid() {
  return (
    <StaggerChildren className="grid gap-5 md:grid-cols-2 md:gap-6">
      {services.map((service) => (
        <motion.div key={service.id} variants={staggerItemVariants}>
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
