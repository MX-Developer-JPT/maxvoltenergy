"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #FFD100, #FFA800, #FF8C00)",
        boxShadow: "0 0 10px rgba(255,209,0,0.5)",
      }}
    />
  );
}
