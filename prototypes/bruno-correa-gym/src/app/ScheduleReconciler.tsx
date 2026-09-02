"use client";

import { useEffect, useState } from "react";
import { DAYS, getLiveStatus, SCHEDULES, SOURCE_LABELS, type ScheduleSource } from "./hours";
import styles from "./page.module.css";

export default function ScheduleReconciler() {
  const [source, setSource] = useState<ScheduleSource>("maps");
  const [status, setStatus] = useState(() => getLiveStatus("maps"));

  useEffect(() => {
    const update = () => setStatus(getLiveStatus(source));
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [source]);

  return (
    <div className={styles.scheduleCard} id="horarios">
      <div className={styles.scheduleHeader}>
        <div><h2>Elegí la fuente publicada</h2></div>
        <span className={status.isOpen ? styles.statusOpen : styles.statusClosed}><span aria-hidden="true" /> {status.label}</span>
      </div>
      <p className={styles.scheduleIntro}>Hoy aparecen dos horarios públicos. La versión final puede quedar alineada en una sola agenda.</p>
      <div className={styles.sourceTabs} role="tablist" aria-label="Fuente del horario">
        {(Object.keys(SCHEDULES) as ScheduleSource[]).map((item) => <button key={item} className={source === item ? styles.sourceActive : styles.sourceButton} onClick={() => setSource(item)} role="tab" aria-selected={source === item}>{SOURCE_LABELS[item]}</button>)}
      </div>
      <div className={styles.weekGrid}>
        {DAYS.map((day) => <div className={styles.day} key={day}><span>{day}</span><strong>{SCHEDULES[source][day]}</strong></div>)}
      </div>
      <p className={styles.scheduleNote}>Publicado según {SOURCE_LABELS[source]}. El equipo confirma la versión definitiva al poner la página online.</p>
    </div>
  );
}
