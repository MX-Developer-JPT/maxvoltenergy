"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

// Word-by-word reveal
export function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "p",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`} aria-label={children}>
      <span className="inline-flex flex-wrap gap-x-[0.25em]">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: delay + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}

// Character-by-character reveal
export function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.025,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const chars = children.split("");

  return (
    <Tag ref={ref} className={`overflow-hidden inline-block ${className}`} aria-label={children}>
      {chars.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", rotateX: -90, opacity: 0 }}
            animate={inView ? { y: 0, rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "50% 100%" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

// Fade up reveal for blocks
export function FadeUp({
  children,
  className = "",
  delay = 0,
  distance = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: distance, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Clip-path reveal (wipe from left)
export function ClipReveal({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "top" | "bottom";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const clips: Record<string, { from: string; to: string }> = {
    left:   { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right:  { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
    top:    { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    bottom: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clips[direction].from }}
      animate={inView ? { clipPath: clips[direction].to } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal
export function StaggerGroup({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};
