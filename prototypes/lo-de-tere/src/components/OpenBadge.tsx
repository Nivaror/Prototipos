"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/openStatus";

export function OpenBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setOpen(isOpenNow());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 rounded-full bg-[var(--background)] border border-white/10 px-4 py-2.5 shadow-[0_18px_40px_rgba(0,0,0,0.5)]">
      <span
        className={`h-2 w-2 rounded-full ${
          open === null
            ? "bg-white/30"
            : open
              ? "bg-[var(--accent-soft)]"
              : "bg-white/30"
        }`}
        aria-hidden
      />
      <span className="text-xs font-medium tracking-wide text-[var(--foreground)]/90">
        {open === null
          ? "Todos los días, 8 a 24 hs"
          : open
            ? "Abierto ahora · hasta las 24 hs"
            : "Abre a las 8 hs · todos los días"}
      </span>
    </div>
  );
}
