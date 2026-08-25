"use client";

import { useEffect, useState } from "react";
import { isOpenAt, nextChangeLabel, rosarioNow } from "@/lib/hours";

export function OpenStatus({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(rosarioNow());
    const id = setInterval(() => setNow(rosarioNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-slate">
        <span className="h-2 w-2 rounded-full bg-slate-soft" />
        Horarios
      </span>
    );
  }

  const open = isOpenAt(now);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
        compact ? "" : "bg-white/90"
      } ${open ? "text-open" : "text-closed"}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-open" : "bg-closed"}`}
      />
      {open ? "Abierto ahora" : "Cerrado ahora"}
      <span className="text-ink-soft font-normal">· {nextChangeLabel(now)}</span>
    </span>
  );
}
