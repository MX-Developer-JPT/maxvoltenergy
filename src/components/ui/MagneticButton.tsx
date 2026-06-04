"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "button",
  ...props
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {/* @ts-ignore */}
      <Tag className={className} {...props}>
        {children}
      </Tag>
    </motion.div>
  );
}
