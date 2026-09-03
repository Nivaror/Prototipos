"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type FormValues = {
  interest: string;
  name: string;
  contact: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialForm: FormValues = {
  interest: "",
  name: "",
  contact: "",
  note: "",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!form.interest) nextErrors.interest = "Elegí qué querés consultar.";
    if (form.name.trim().length < 2) nextErrors.name = "Escribí tu nombre.";
    if (form.contact.trim().length < 6) {
      nextErrors.contact = "Dejanos un WhatsApp o email válido.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className={styles.page}>
      <header className={styles.navWrap}>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a className={styles.brand} href="#inicio" aria-label="Subsede Clubsito, inicio">
            <span className={styles.brandMark} aria-hidden="true">C</span>
            <span>Subsede Clubsito</span>
          </a>

          <div className={styles.navLinks}>
            <a href="#informacion">La sede</a>
            <a href="#consulta">Consulta</a>
            <a className={styles.navCta} href="#consulta">Quiero consultar <span aria-hidden="true">→</span></a>
          </div>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Subsede deportiva y social</p>
              <h1>Conocé la subsede. Elegí tu próximo paso.</h1>
              <p className={styles.heroText}>
                Información clara para ubicar la sede, consultar y dejar tu interés.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#consulta">Quiero consultar <span aria-hidden="true">↗</span></a>
                <a className={styles.secondaryButton} href="#informacion">Ver información</a>
              </div>
            </div>

            <figure className={styles.heroMedia}>
              <Image
                src="/images/facility-illustration.jpg"
                alt="Imagen ilustrativa de un espacio deportivo"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 48vw"
                className={styles.heroImage}
              />
              <div className={styles.mediaCorner} aria-hidden="true">01</div>
            </figure>
          </div>
          <div className={styles.heroRule} aria-hidden="true" />
        </section>

        <section className={`${styles.section} ${styles.infoSection}`} id="informacion">
          <div className={styles.sectionLead}>
            <h2>La sede, en claro.</h2>
            <p>
              Una vista rápida de lo que hoy está confirmado. La agenda específica de actividades para esta ubicación no está verificada en esta demo.
            </p>
          </div>

          <div className={styles.factLayout}>
            <div className={styles.ratingBlock}>
              <span className={styles.ratingNumber}>4.5</span>
              <span className={styles.ratingLabel}>291 reseñas en Google</span>
            </div>

            <dl className={styles.facts}>
              <div>
                <dt>Dirección</dt>
                <dd>Juan B. Justo 970<br />Rosario, Santa Fe</dd>
              </div>
              <div>
                <dt>Horario publicado</dt>
                <dd>Lunes a viernes<br />18:00 a 20:30</dd>
              </div>
              <div>
                <dt>Fin de semana</dt>
                <dd>Cerrado</dd>
              </div>
            </dl>
          </div>

          <div className={styles.parentNote}>
            <p>
              Esta sede forma parte de Club Atlético Rosario Central. Para información institucional, visitá el sitio oficial del club.
            </p>
            <a href="https://rosariocentral.com" target="_blank" rel="noreferrer">
              Ir a rosariocentral.com <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.inquirySection}`} id="consulta">
          <div className={styles.inquiryHeader}>
            <p className={styles.eyebrow}>Tu consulta, en un solo lugar</p>
            <h2>Contale a la sede qué necesitás.</h2>
            <p>
              Elegí el motivo, dejá tus datos y simulá cómo podría empezar una conversación sobre actividades o una visita.
            </p>
          </div>

          <div className={styles.inquiryGrid}>
            <div className={styles.inquiryAside}>
              <span className={styles.asideIndex}>01</span>
              <h3>Antes de acercarte</h3>
              <p>
                Una consulta previa ayuda a orientar el próximo paso cuando la información de la sede está repartida entre distintos canales.
              </p>
              <ul>
                <li>Decí qué actividad te interesa.</li>
                <li>Indicá si querés conocer el lugar.</li>
                <li>Elegí un canal para recibir respuesta.</li>
              </ul>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="interest">¿Qué querés consultar?</label>
                <select
                  id="interest"
                  value={form.interest}
                  onChange={(event) => updateField("interest", event.target.value)}
                  aria-invalid={Boolean(errors.interest)}
                  aria-describedby={errors.interest ? "interest-error" : undefined}
                >
                  <option value="" disabled>Seleccioná una opción</option>
                  <option value="actividad">Una actividad</option>
                  <option value="visita">Una visita a la sede</option>
                  <option value="otro">Otra consulta</option>
                </select>
                {errors.interest && <p className={styles.error} id="interest-error">{errors.interest}</p>}
              </div>

              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label htmlFor="name">Tu nombre</label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <p className={styles.error} id="name-error">{errors.name}</p>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact">WhatsApp o email</label>
                  <input
                    id="contact"
                    type="text"
                    value={form.contact}
                    onChange={(event) => updateField("contact", event.target.value)}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "contact-error" : undefined}
                  />
                  {errors.contact && <p className={styles.error} id="contact-error">{errors.contact}</p>}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="note">Detalle breve <span>(opcional)</span></label>
                <textarea
                  id="note"
                  rows={4}
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                />
              </div>

              <div className={styles.formFooter}>
                <button className={styles.submitButton} type="submit">Enviar interés <span aria-hidden="true">↗</span></button>
                <p className={styles.formNote}>Demo sin backend. No se envía ningún dato.</p>
              </div>

              <p className={`${styles.success} ${submitted ? styles.successVisible : ""}`} role="status" aria-live="polite">
                Listo. Tu interés quedó registrado en esta demo. En un sitio real, la sede recibiría la consulta.
              </p>
            </form>
          </div>
        </section>

        <section className={`${styles.section} ${styles.visitSection}`}>
          <div className={styles.visitMedia}>
            <Image
              src="/images/activity-illustration.jpg"
              alt="Imagen ilustrativa de una persona entrenando"
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              className={styles.visitImage}
            />
          </div>
          <div className={styles.visitCopy}>
            <h2>Si querés acercarte, empezá por lo esencial.</h2>
            <p>
              Guardá la dirección, revisá el horario publicado y consultá antes de ir si necesitás confirmar una actividad concreta.
            </p>
            <div className={styles.visitDetails}>
              <div><span>Dirección</span><strong>Juan B. Justo 970</strong></div>
              <div><span>Atención</span><strong>Lunes a viernes, 18:00 a 20:30</strong></div>
            </div>
            <a
              className={styles.secondaryButton}
              href="https://www.google.com/maps/search/?api=1&query=Juan%20B.%20Justo%20970%2C%20Rosario%2C%20Santa%20Fe"
              target="_blank"
              rel="noreferrer"
            >
              Abrir ubicación en Maps <span aria-hidden="true">↗</span>
            </a>
            <p className={styles.imageNote}>Imagen ilustrativa. No representa necesariamente esta subsede.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span className={styles.footerBrand}>Subsede Clubsito</span>
          <span className={styles.footerMuted}>Muestra de Nivaror</span>
        </div>
        <p>No es el sitio oficial de Club Atlético Rosario Central.</p>
      </footer>
    </div>
  );
}
