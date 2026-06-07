"use client";

import { motion, useReducedMotion } from "framer-motion";

// App Router template re-mounts on every navigation, so this gives every page
// and sub-page a smooth entrance transition. Respects prefers-reduced-motion.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
