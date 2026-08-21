"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

/**
 * Reveals a section once it enters the viewport, so the page unfolds in reading
 * order instead of arriving all at once. IntersectionObserver, never a scroll listener.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Threshold 0 so sections taller than the viewport still trigger.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={styles.reveal}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
