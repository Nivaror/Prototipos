"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

/** Fades and lifts a block in once it enters the viewport. No-ops under reduced motion. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className={`${styles.reveal} ${visible ? styles.revealIn : ""} ${className ?? ""}`}>
      {children}
    </div>
  );
}
