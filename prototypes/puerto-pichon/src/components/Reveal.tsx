"use client";

import { useEffect, useRef, useState } from "react";

// Minimal scroll-reveal: fades/lifts a section in once it enters the
// viewport. IntersectionObserver only, no scroll listeners, honors
// prefers-reduced-motion via the CSS below (no JS branch needed since the
// media query just removes the transition).
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className ?? ""} reveal ${visible ? "reveal--visible" : ""}`}
    >
      {children}
    </div>
  );
}
