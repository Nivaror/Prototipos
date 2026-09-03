"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type Day = {
  name: string;
  short: string;
  times: string[];
  note?: string;
  kind: "published" | "consult" | "closed";
};

const schedule: Day[] = [
  { name: "Lunes", short: "Lun", times: ["15:30", "16:30", "17:30", "18:30"], kind: "published" },
  { name: "Martes", short: "Mar", times: [], note: "No figura en la grilla relevada.", kind: "consult" },
  {
    name: "Miércoles",
    short: "Mié",
    times: ["08:00", "09:00", "10:00", "11:00", "15:30", "16:30", "17:30", "18:30"],
    kind: "published",
  },
  { name: "Jueves", short: "Jue", times: [], note: "No figura en la grilla relevada.", kind: "consult" },
  {
    name: "Viernes",
    short: "Vie",
    times: ["08:00", "09:00", "10:00", "11:00", "15:30", "16:30", "17:30", "18:30"],
    kind: "published",
  },
  { name: "Sábado", short: "Sáb", times: [], note: "Cerrado según la ficha de Maps.", kind: "closed" },
  { name: "Domingo", short: "Dom", times: [], note: "Cerrado según la ficha de Maps.", kind: "closed" },
];

const classes = schedule.flatMap((day) =>
  day.times.map((time) => ({ value: `${day.name}-${time}`, label: `${day.name} a las ${time}` })),
);

export default function Home() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function choose(value: string) {
    setSelected(value);
    setError("");
    setSuccess(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const classValue = String(data.get("class") ?? "").trim();

    if (!name || !email || !classValue) {
      setSuccess(false);
      setError("Completá tu nombre, tu email y elegí una clase.");
      return;
    }
    if (!form.checkValidity()) {
      setSuccess(false);
      setError("Revisá el formato del email para continuar.");
      return;
    }

    setError("");
    setSuccess(true);
    form.reset();
    setSelected("");
  }

  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <a href="#inicio" className={styles.brand} aria-label="RefineriaYoga, inicio">
          <span className={styles.brandMark} aria-hidden="true">R</span>
          <span>Refineria<span>Yoga</span></span>
        </a>
        <nav aria-label="Navegación principal" className={styles.navLinks}>
          <a href="#agenda">Agenda</a>
          <a href="#interes">Tu primera clase</a>
        </nav>
        <a className={styles.navButton} href="#agenda">Ver horarios</a>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Agenda abierta</p>
            <h1 id="hero-title">Tu práctica empieza con un <em>horario claro.</em></h1>
            <p className={styles.heroLead}>Consultá las clases de la semana sin iniciar sesión en Instagram.</p>
            <a className={styles.primaryButton} href="#agenda">Ver la agenda <span aria-hidden="true">↘</span></a>
          </div>
          <div className={styles.heroVisual} role="img" aria-label="Una semana de clases visible en un solo lugar">
            <div className={`${styles.orbit} ${styles.orbitA}`} aria-hidden="true" />
            <div className={`${styles.orbit} ${styles.orbitB}`} aria-hidden="true" />
            <div className={styles.visualCenter}><span>Una semana</span><strong>visible</strong></div>
            <span className={`${styles.timeMark} ${styles.timeTop}`}>08:00</span>
            <span className={`${styles.timeMark} ${styles.timeRight}`}>15:30</span>
            <span className={`${styles.timeMark} ${styles.timeBottom}`}>18:30</span>
          </div>
        </section>

        <section className={styles.section} id="agenda" aria-labelledby="agenda-title">
          <div className={styles.sectionHeader}>
            <div><p className={styles.kicker}>La semana a la vista</p><h2 id="agenda-title">Elegí el momento que te queda bien.</h2></div>
            <p>Horarios tomados de la grilla pública relevada. Martes y jueves no aparecen en esa publicación.</p>
          </div>
          <div className={styles.scheduleGrid} aria-label="Horario semanal de clases">
            {schedule.map((day) => (
              <article className={`${styles.dayCard} ${day.kind === "published" ? styles.published : ""}`} key={day.name}>
                <div className={styles.dayHeading}><span>{day.short}</span><h3>{day.name}</h3></div>
                {day.kind === "published" ? (
                  <div className={styles.times} aria-label={`Clases del ${day.name}`}>
                    {day.times.map((time) => {
                      const value = `${day.name}-${time}`;
                      const isSelected = selected === value;
                      return <button type="button" key={value} className={`${styles.timeButton} ${isSelected ? styles.selected : ""}`} aria-pressed={isSelected} aria-label={`${isSelected ? "Horario elegido" : "Elegir"}: ${day.name} a las ${time}`} onClick={() => choose(value)}><span>{time}</span><small aria-hidden="true">{isSelected ? "Elegido" : "Elegir"}</small></button>;
                    })}
                  </div>
                ) : (
                  <div className={`${styles.dayNote} ${day.kind === "closed" ? styles.closed : ""}`}><strong>{day.kind === "closed" ? "Cerrado" : "A consultar"}</strong><p>{day.note}</p></div>
                )}
              </article>
            ))}
          </div>
          <p className={styles.note}>La disponibilidad final se confirma con el estudio antes de asistir.</p>
        </section>

        <section className={styles.valueSection} aria-labelledby="value-title">
          <div><p className={styles.kicker}>La muestra propone</p><h2 id="value-title">Menos búsqueda. Más práctica.</h2></div>
          <div className={styles.valueList}>
            <div><span>01</span><h3>Horario visible</h3><p>La semana se entiende de un vistazo.</p></div>
            <div><span>02</span><h3>Elección simple</h3><p>Podés elegir una franja antes de escribir.</p></div>
            <div><span>03</span><h3>Interés ordenado</h3><p>La consulta llega con el horario que querés probar.</p></div>
          </div>
        </section>

        <section className={styles.interestSection} id="interes" aria-labelledby="interest-title">
          <div className={styles.interestCopy}>
            <p className={styles.kicker}>Tu primera clase</p>
            <h2 id="interest-title">¿Qué horario te interesa?</h2>
            <p>Elegí una franja y dejá tus datos para recibir información sobre la clase.</p>
            <div className={styles.facts} aria-label="Datos del estudio">
              <div><strong>5★</strong><span>6 reseñas en Google</span></div>
              <div><strong>Rosario</strong><span>Falucho 364, Las Malvinas</span></div>
            </div>
          </div>
          <form className={styles.form} onSubmit={submit} noValidate>
            <div className={styles.formTitle}><strong>Dejanos tu interés</strong><span>Sin compromiso</span></div>
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" required />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="tu@email.com" required />
            <label htmlFor="class">Clase</label>
            <select id="class" name="class" value={selected} onChange={(event) => choose(event.target.value)} required>
              <option value="">Elegí una clase</option>
              {classes.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
            </select>
            {error && <p className={styles.error} role="alert">{error}</p>}
            {success && <p className={styles.success} role="status">Gracias. Tu interés quedó registrado en esta demo. En una versión real, el estudio recibiría la consulta.</p>}
            <button type="submit" className={styles.submit}>Quiero recibir información <span aria-hidden="true">↗</span></button>
            <p className={styles.disclaimer}>Esta muestra no envía datos ni tiene backend.</p>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.brand}><span className={styles.brandMark} aria-hidden="true">R</span><span>Refineria<span>Yoga</span></span></div>
        <a href="https://instagram.com/refineriayoga" target="_blank" rel="noreferrer">Ver Instagram</a>
        <p>Muestra de propuesta hecha por Nivaror. No es el sitio oficial del negocio.</p>
      </footer>
    </div>
  );
}
