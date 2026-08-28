"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import BookingRow from "./BookingRow";
import { WINDOWS, WindowId } from "@/lib/reservas";
import styles from "./BookingFlow.module.css";

export default function BookingFlow() {
  const [openId, setOpenId] = useState<WindowId>("almuerzo");

  return (
    <section id="reservas" className={`section ${styles.section}`}>
      <div className="wrap">
        <Reveal className={styles.header}>
          <h2>Reservá tu franja</h2>
          <p>
            Elegí brunch, almuerzo o cena y confirmá vos mismo, sin esperar
            respuesta por Instagram.
          </p>
        </Reveal>

        <div className={styles.list}>
          {WINDOWS.map((w) => (
            <BookingRow
              key={w.id}
              windowDef={w}
              isOpen={openId === w.id}
              onToggle={() => setOpenId((cur) => (cur === w.id ? cur : w.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
