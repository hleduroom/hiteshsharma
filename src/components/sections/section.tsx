"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
};

export function Section({ children, id, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("w-full py-20 md:py-28 lg:py-32", className)}
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
}
