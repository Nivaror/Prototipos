"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type FormStatus = "idle" | "sending" | "success";
type FormErrors = Partial<Record<"name" | "contact" | "reason", string>>;

const menuItems = [
  "Café de filtro",
  "Tostado clásico",
  "Plato casero del día",
  "Algo dulce",
  "Bebida de la casa",
];

const reasons = [
  "Quiero conocer la carta",
  "Quiero saber si está abierto",
  "Quiero organizar una visita",
];

function validateForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const reason = String(formData.get("reason") ?? "");
  const errors: FormErrors = {};

  if (name.length < 2) errors.name = "Escribí tu nombre para identificar la consulta.";
  if (contact.length < 3) errors.contact = "Dejá un Instagram o WhatsApp de contacto.";
  if (!reason) errors.reason = "Elegí qué querés consultar.";

  return errors;
}

export default function Home() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const formData = new FormData(event.currentTarget);
    const nextErrors = validateForm(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    window.setTimeout(() => setStatus("success"), 650);
  }

  function resetForm() {
    setStatus("idle");
    setErrors({});
  }

  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#visita">
        Ir a la consulta
      </a>

      <header className={styles.nav}>
        <div className={styles.navInner}>
          <a className={styles.brand} href="#inicio" aria-label="El Mini Bar Americano, inicio">
            <span className={styles.brandMark} aria-hidden="true" />
            <span>
              El Mini
              <strong>Bar Americano</strong>
            </span>
          </a>
          <nav className={styles.navLinks} aria-label="Navegación principal">
            <a href="#carta">Carta</a>
            <a href="#horarios">Horarios</a>
            <a href="https://instagram.com/baramericanoelmini" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </nav>
          <a className={styles.navCta} href="#visita">
            Consultar visita
          </a>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="inicio" aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Café y bar americano</p>
            <h1 id="hero-title">El Mini Bar Americano</h1>
            <p className={styles.heroLead}>
              Una página propia para ver la carta, ubicarte y consultar antes de ir.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.buttonPrimary} href="#visita">
                Consultar visita
              </a>
              <a className={styles.buttonSecondary} href="#carta">
                Ver la carta
              </a>
            </div>
          </div>

          <figure className={styles.heroMedia}>
            <Image
              src="/images/hero-bar.jpg"
              alt="Barra con bebidas y luz cálida"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 58vw"
            />
            <figcaption>Referencia visual para esta muestra</figcaption>
          </figure>
        </section>

        <section className={styles.infoRail} aria-label="Información confirmada">
          <div className={styles.infoItem}>
            <span>Reputación</span>
            <strong>4,8★</strong>
            <p>102 reseñas en Google</p>
          </div>
          <div className={styles.infoItem}>
            <span>Encontralo en</span>
            <strong>Reconquista 1426</strong>
            <p>Rosario, Santa Fe</p>
          </div>
          <div className={styles.infoItem}>
            <span>Para resolver</span>
            <strong>Carta y visita</strong>
            <p>En un solo lugar</p>
          </div>
        </section>

        <section className={styles.inquirySection} id="visita" aria-labelledby="inquiry-title">
          <div className={styles.inquiryIntro}>
            <p className={styles.eyebrow}>Antes de salir</p>
            <h2 id="inquiry-title">¿Qué querés saber?</h2>
            <p>
              Una consulta corta alcanza para ordenar la próxima visita. La muestra no envía datos reales.
            </p>
            <div className={styles.inquiryNote}>
              <span aria-hidden="true">01</span>
              <p>Elegí un motivo, dejá tu contacto y listo.</p>
            </div>
          </div>

          <div className={styles.formPanel}>
            {status === "success" ? (
              <div className={styles.successState} role="status" aria-live="polite">
                <span className={styles.successMark} aria-hidden="true">OK</span>
                <h3>Consulta lista</h3>
                <p>
                  En un sitio publicado, este pedido podría llegar al canal elegido por el local. En esta demo queda simulado.
                </p>
                <button className={styles.buttonSecondaryDark} type="button" onClick={resetForm}>
                  Hacer otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.formHeading}>
                  <h3>Dejá una consulta</h3>
                  <p>Sin llamadas largas. Solo lo necesario para orientarte.</p>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="name">Tu nombre</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Por ejemplo, Martina"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && <p className={styles.formError} id="name-error">{errors.name}</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact">Tu contacto</label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      autoComplete="off"
                      placeholder="Instagram o WhatsApp"
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? "contact-error" : undefined}
                    />
                    {errors.contact && <p className={styles.formError} id="contact-error">{errors.contact}</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="reason">Quiero consultar</label>
                    <select
                      id="reason"
                      name="reason"
                      defaultValue=""
                      aria-invalid={Boolean(errors.reason)}
                      aria-describedby={errors.reason ? "reason-error" : undefined}
                    >
                      <option value="" disabled>Elegí una opción</option>
                      {reasons.map((reason) => <option key={reason}>{reason}</option>)}
                    </select>
                    {errors.reason && <p className={styles.formError} id="reason-error">{errors.reason}</p>}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="day">¿Cuándo pensás ir?</label>
                    <select id="day" name="day" defaultValue="Esta semana">
                      <option>Hoy</option>
                      <option>Esta semana</option>
                      <option>Todavía no sé</option>
                    </select>
                  </div>
                </div>

                <button className={styles.formSubmit} type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Guardando consulta..." : "Consultar visita"}
                </button>
                <p className={styles.formHelper}>Demo sin backend. No se guarda ni se envía tu información.</p>
              </form>
            )}
          </div>
        </section>

        <section className={styles.menuSection} id="carta" aria-labelledby="menu-title">
          <div className={styles.menuImageWrap}>
            <Image
              src="/images/dining-room.jpg"
              alt="Salón cálido con mesas de madera"
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
            />
          </div>
          <div className={styles.menuCopy}>
            <h2 id="menu-title">Carta de muestra</h2>
            <p>
              Un adelanto de cómo podría verse la propuesta sin depender de una red social.
            </p>
            <div className={styles.sampleNotice}>
              <strong>Contenido ilustrativo</strong>
              <span>Los nombres de abajo son una muestra para esta demo. La carta real se confirma con el local.</span>
            </div>
            <ul className={styles.menuList}>
              {menuItems.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                  <small>Muestra</small>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.locationSection} id="horarios" aria-labelledby="location-title">
          <div className={styles.locationLead}>
            <h2 id="location-title">Llegás con la información justa.</h2>
            <p>El dato importante aparece antes de que tengas que buscarlo en otra app.</p>
            <a className={styles.textLink} href="https://maps.google.com/?q=Reconquista+1426+Rosario" target="_blank" rel="noreferrer">
              Abrir en Maps <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.hoursBlock}>
            <div className={styles.hoursHeader}>
              <span>Horarios confirmados</span>
              <span>Rosario</span>
            </div>
            <div className={styles.hoursRow}><span>Lunes a viernes</span><strong>07:00 a 20:00</strong></div>
            <div className={styles.hoursRow}><span>Sábado</span><strong>07:00 a 13:00</strong></div>
            <div className={styles.hoursRow}><span>Domingo</span><strong>Cerrado</strong></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <p className={styles.footerBrand}>El Mini Bar Americano</p>
          <p>Reconquista 1426, Rosario</p>
        </div>
        <a href="https://instagram.com/baramericanoelmini" target="_blank" rel="noreferrer">Instagram</a>
        <p className={styles.disclaimer}>Muestra Nivaror. No es el sitio oficial del negocio.</p>
      </footer>
    </div>
  );
}
