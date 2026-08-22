"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROGRAM, PROGRAM_STORAGE_KEY, type Night } from "./program";

type ProgramState = {
  program: Night[];
  owner: boolean;
  edited: boolean;
  setOwner: (on: boolean) => void;
  updateNight: (weekday: number, patch: Partial<Night>) => void;
  reset: () => void;
  nightOf: (weekday: number) => Night;
};

const ProgramContext = createContext<ProgramState | null>(null);

/**
 * Holds the week's billing so the board and the reservation form read the same
 * copy, and persists owner edits in localStorage: the pitch is that the venue
 * loads its own week, so an edit has to survive a reload to land.
 */
export function ProgramProvider({ children }: { children: ReactNode }) {
  const [program, setProgram] = useState<Night[]>(PROGRAM);
  const [owner, setOwner] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(PROGRAM_STORAGE_KEY);
    } catch {
      return;
    }
    if (!stored) return;
    try {
      const parsed: unknown = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;
      // Merge by weekday so a stored copy from an older billing list cannot
      // drop a night off the board.
      setProgram(
        PROGRAM.map((night) => {
          const saved = parsed.find(
            (item): item is Night =>
              typeof item === "object" &&
              item !== null &&
              (item as Night).weekday === night.weekday,
          );
          return saved
            ? {
                weekday: night.weekday,
                title: String(saved.title ?? night.title),
                note: String(saved.note ?? night.note),
              }
            : night;
        }),
      );
      setEdited(true);
    } catch {
      /* a corrupt entry just falls back to the shipped billing */
    }
  }, []);

  const persist = useCallback((next: Night[]) => {
    try {
      window.localStorage.setItem(PROGRAM_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* private browsing, nothing to do */
    }
  }, []);

  const updateNight = useCallback(
    (weekday: number, patch: Partial<Night>) => {
      setProgram((current) => {
        const next = current.map((night) =>
          night.weekday === weekday ? { ...night, ...patch } : night,
        );
        persist(next);
        return next;
      });
      setEdited(true);
    },
    [persist],
  );

  const reset = useCallback(() => {
    setProgram(PROGRAM);
    setEdited(false);
    try {
      window.localStorage.removeItem(PROGRAM_STORAGE_KEY);
    } catch {
      /* nothing stored, nothing to clear */
    }
  }, []);

  const nightOf = useCallback(
    (weekday: number) =>
      program.find((night) => night.weekday === weekday) ?? program[0],
    [program],
  );

  const value = useMemo(
    () => ({ program, owner, edited, setOwner, updateNight, reset, nightOf }),
    [program, owner, edited, updateNight, reset, nightOf],
  );

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
}

export function useProgram() {
  const value = useContext(ProgramContext);
  if (!value) throw new Error("useProgram must be used inside ProgramProvider");
  return value;
}

/** Argentina's current weekday and minute, refreshed while the tab is open. */
export function useArgentinaNow(
  read: () => { weekday: number; minutes: number },
  initial: { weekday: number; minutes: number },
) {
  const [now, setNow] = useState(initial);
  useEffect(() => {
    const tick = () => setNow(read());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [read]);
  return now;
}
