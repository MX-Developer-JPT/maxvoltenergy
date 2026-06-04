"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glareOpacity = 0.12,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTilt({
      rotateX: (0.5 - y) * maxTilt * 2,
      rotateY: (x - 0.5) * maxTilt * 2,
    });
    setGlare({ x: x * 100, y: y * 100, opacity: glareOpacity });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
          transition: "opacity 0.3s",
        }}
      />
    </motion.div>
  );
}
