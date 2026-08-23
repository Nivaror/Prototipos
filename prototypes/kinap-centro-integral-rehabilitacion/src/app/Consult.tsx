"use client";

import { useState, FormEvent } from "react";
import {
  PersonSimpleWalk,
  Barbell,
  Waves,
  ForkKnife,
  Heartbeat,
  Wind,
  Brain,
  Stethoscope,
  ArrowsClockwise,
  CaretRight,
  CheckCircle,
} from "@phosphor-icons/react/dist/ssr";
import { AREAS, Area } from "./areas";
import styles from "./page.module.css";

const ICONS: Record<Area["icon"], typeof Barbell> = {
  walk: PersonSimpleWalk,
  barbell: Barbell,
  waves: Waves,
  fork: ForkKnife,
  heartbeat: Heartbeat,
  wind: Wind,
  brain: Brain,
  stethoscope: Stethoscope,
  cycle: ArrowsClockwise,
};

export function Consult() {
  const [selected, setSelected] = useState<string>(AREAS[0].id);
  const [sent, setSent] = useState(false);

  function chooseArea(id: string) {
    setSelected(id);
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <div className={styles.grid9}>
        {AREAS.map((area) => {
          const Icon = ICONS[area.icon];
          return (
            <button
              key={area.id}
              type="button"
              className={`${styles.areaCard} ${selected === area.id ? styles.areaCardActive : ""}`}
              onClick={() => chooseArea(area.id)}
            >
              <Icon size={26} weight="duotone" className={styles.areaIcon} />
              <span className={styles.areaName}>{area.name}</span>
              <span className={styles.areaBlurb}>{area.blurb}</span>
              <span className={styles.areaCta}>
                Consultar por esta área <CaretRight size={13} weight="bold" />
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.contactPanel} id="contacto-panel">
        {sent ? (
          <div className={styles.contactSent}>
            <CheckCircle size={34} weight="fill" className={styles.contactSentIcon} />
            <p className={styles.contactSentTitle}>Consulta enviada</p>
            <p className={styles.contactSentBody}>
              Esto es una demo: en el sitio real, el equipo de KINAP recibiría este mensaje y
              respondería por el medio que elijas.
            </p>
          </div>
        ) : (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="area">Área de interés</label>
              <select
                id="area"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                {AREAS.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" required placeholder="Tu nombre" />
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Mensaje (opcional)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Contanos brevemente qué necesitás"
              />
            </div>
            <button type="submit" className={styles.btnPrimary}>
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </>
  );
}
