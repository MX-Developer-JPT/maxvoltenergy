"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springX = useSpring(trailX, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(trailY, { stiffness: 80, damping: 20, mass: 0.5 });

  const [variant, setVariant] = useState<"default" | "hover" | "click">("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setHidden(false);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };
    const onEnter = () => setVariant("hover");
    const onLeave = () => setVariant("default");
    const onDown = () => setVariant("click");
    const onUp = () => setVariant("default");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const attach = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      obs.disconnect();
    };
  }, [cursorX, cursorY, trailX, trailY]);

  if (hidden) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: variant === "click" ? 0.4 : 1, opacity: variant === "hover" ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      >
        <div className="w-2 h-2 rounded-full bg-[#FFD100]"
          style={{ boxShadow: "0 0 6px rgba(255,209,0,0.8)" }} />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: variant === "hover" ? 2.2 : variant === "click" ? 0.7 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="rounded-full border-2 border-[#FFD100]"
          style={{ width: 28, height: 28 }}
          animate={{
            borderColor: variant === "hover" ? "rgba(255,209,0,0.8)" : "rgba(255,209,0,0.35)",
            boxShadow: variant === "hover" ? "0 0 20px rgba(255,209,0,0.4)" : "none",
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        style={{
          x: springX, y: springY,
          translateX: "-50%", translateY: "-50%",
          width: 80, height: 80,
          background: "radial-gradient(circle, rgba(255,209,0,0.07) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
