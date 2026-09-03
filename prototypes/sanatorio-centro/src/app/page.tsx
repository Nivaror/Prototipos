"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type Facility = {
  id: string;
  name: string;
  address: string;
  shortName: string;
};

type FormErrors = {
  name?: string;
  contact?: string;
};

const facilities: Facility[] = [
  { id: "sanatorio", name: "Sanatorio Centro", shortName: "Sanatorio", address: "Paraguay 975, Centro, Rosario" },
  { id: "instituto", name: "Instituto Médico Centro", shortName: "Instituto Médico", address: "Balcarce 421, Rosario" },
  { id: "oftalmologica", name: "Clínica Oftalmológica Centro", shortName: "Clínica Oftalmológica", address: "Balcarce 421, Rosario" },
];

const requestTypes = [
  { value: "turno", label: "Solicitar un turno" },
  { value: "sede", label: "Orientarme sobre una sede" },
  { value: "practica", label: "Consultar una práctica" },
];

export default function Home() {
  const [selectedFacility, setSelectedFacility] = useState("sanatorio");
  const [requestType, setRequestType] = useState("turno");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const activeFacility = facilities.find((facility) => facility.id === selectedFacility) ?? facilities[0];
  const activeRequest = requestTypes.find((request) => request.value === requestType) ?? requestTypes[0];

  function handleFacilityChange(facilityId: string) {
    setSelectedFacility(facilityId);
    setIsSent(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) nextErrors.name = "Escribí tu nombre y apellido.";

    const normalizedContact = contact.trim();
    const looksLikeEmail = normalizedContact.includes("@") && normalizedContact.includes(".");
    const phoneDigits = normalizedContact.replace(/\D/g, "");
    if (!looksLikeEmail && phoneDigits.length < 7) {
      nextErrors.contact = "Agregá un WhatsApp o email para recibir respuesta.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 650);
  }

  function resetForm() {
    setName("");
    setContact("");
    setErrors({});
    setIsSent(false);
  }

  return (
    <main className={styles.page}>
      <div className={styles.demoNotice}>
        <span>Demo de Nivaror</span>
        <span>Concepto de navegación. No es el sitio oficial de Grupo Centro.</span>
      </div>

      <header className={styles.header}>
        <a className={styles.wordmark} href="#inicio" aria-label="Grupo Centro, inicio">
          <span className={styles.mark} aria-hidden="true">GC</span>
          <span className={styles.wordmarkCopy}>
            <strong>Grupo Centro</strong>
            <small>Rosario</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#sedes">Sedes</a>
          <a className={styles.navCta} href="#orientacion">Solicitar orientación</a>
        </nav>
      </header>

      <section className={styles.hero} id="inicio">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Orientación de atención</p>
          <h1>Encontrá la sede correcta para tu atención</h1>
          <p className={styles.heroIntro}>
            Un recorrido claro para elegir sede, indicar qué necesitás y dejar tu contacto.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#orientacion">Solicitar orientación <span aria-hidden="true">→</span></a>
            <a className={styles.textButton} href="#sedes">Ver las sedes <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <Image src="/images/hero-waiting-room.jpg" alt="Sala de espera luminosa de una clínica" fill priority sizes="(max-width: 767px) 100vw, 92vw" />
          <div className={styles.heroVisualRule} aria-hidden="true" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.routeSection}`} id="sedes">
        <div className={styles.sectionIntro}>
          <h2>Una sola entrada para tres sedes</h2>
          <p>La sede que elijas queda visible en tu solicitud para que el próximo paso sea fácil de entender.</p>
        </div>

        <div className={styles.routeLayout}>
          <div className={styles.facilityList} role="tablist" aria-label="Elegir sede">
            {facilities.map((facility, index) => {
              const isActive = facility.id === selectedFacility;
              return (
                <button
                  className={`${styles.facilityOption} ${isActive ? styles.facilityOptionActive : ""}`}
                  key={facility.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="sede-seleccionada"
                  onClick={() => handleFacilityChange(facility.id)}
                >
                  <span className={styles.facilityIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.facilityText}><strong>{facility.name}</strong><small>{facility.address}</small></span>
                  <span className={styles.optionArrow}>{isActive ? "Seleccionada" : "Elegir"}</span>
                </button>
              );
            })}
          </div>

          <aside className={styles.routePanel} id="sede-seleccionada" aria-live="polite">
            <div className={styles.routePanelTop}><span>Sede elegida</span><span>Se aplica a tu solicitud</span></div>
            <div className={styles.routePanelBody}>
              <span className={styles.routePanelMark} aria-hidden="true">{activeFacility.shortName.slice(0, 1)}</span>
              <p className={styles.routePanelLabel}>{activeFacility.shortName}</p>
              <h3>{activeFacility.name}</h3>
              <p className={styles.routePanelAddress}>{activeFacility.address}</p>
            </div>
            <div className={styles.routePanelFooter}><span>¿No sabés cuál elegir?</span><a href="#orientacion">Pedir orientación <span aria-hidden="true">↘</span></a></div>
          </aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.requestSection}`} id="orientacion">
        <div className={styles.requestCopy}>
          <p className={styles.sectionNote}>Solicitud no sensible</p>
          <h2>Dejá solo lo necesario</h2>
          <p>Para iniciar el contacto alcanza con elegir una sede, contar qué buscás y dejar un canal de respuesta.</p>
          <div className={styles.requestImage}>
            <Image src="/images/service-consultation-hands.jpg" alt="Profesional de salud tomando notas durante una consulta" fill sizes="(max-width: 767px) 100vw, 38vw" />
          </div>
        </div>

        <div className={styles.formFrame}>
          {isSent ? (
            <div className={styles.successState} role="status" aria-live="polite">
              <p className={styles.sectionNote}>Solicitud preparada</p>
              <h3>El próximo paso quedó claro</h3>
              <p>Elegiste {activeFacility.name} para {activeRequest.label.toLowerCase()}. Esta demo simuló la confirmación: no se envió ningún mensaje ni se guardaron datos.</p>
              <button className={styles.secondaryButton} type="button" onClick={resetForm}>Hacer otra solicitud</button>
            </div>
          ) : (
            <form className={styles.requestForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.formHeading}>
                <div><p className={styles.formEyebrow}>Orientación</p><h3>¿Cómo podemos ayudarte?</h3></div>
                <span className={styles.formSafeNote}>Sin datos médicos</span>
              </div>

              <label className={styles.field} htmlFor="facility">
                <span>Sede</span>
                <select id="facility" name="facility" value={selectedFacility} onChange={(event) => handleFacilityChange(event.target.value)}>
                  {facilities.map((facility) => <option value={facility.id} key={facility.id}>{facility.name}</option>)}
                </select>
              </label>

              <fieldset className={styles.requestChoiceFieldset}>
                <legend>Qué necesitás</legend>
                <div className={styles.requestChoices}>
                  {requestTypes.map((request) => (
                    <button className={`${styles.requestChoice} ${request.value === requestType ? styles.requestChoiceActive : ""}`} key={request.value} type="button" aria-pressed={request.value === requestType} onClick={() => setRequestType(request.value)}>
                      {request.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className={styles.fieldGrid}>
                <label className={styles.field} htmlFor="name">
                  <span>Tu nombre</span>
                  <input id="name" name="name" type="text" autoComplete="name" placeholder="Nombre y apellido" value={name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : "name-help"} onChange={(event) => { setName(event.target.value); if (errors.name) setErrors((current) => ({ ...current, name: undefined })); }} />
                  <small id="name-help">Solo para identificar la solicitud.</small>
                  {errors.name ? <small className={styles.fieldError} id="name-error">{errors.name}</small> : null}
                </label>
                <label className={styles.field} htmlFor="contact">
                  <span>Canal de contacto</span>
                  <input id="contact" name="contact" type="text" autoComplete="email tel" placeholder="WhatsApp o email" value={contact} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? "contact-error" : "contact-help"} onChange={(event) => { setContact(event.target.value); if (errors.contact) setErrors((current) => ({ ...current, contact: undefined })); }} />
                  <small id="contact-help">Usá un canal donde podamos responderte.</small>
                  {errors.contact ? <small className={styles.fieldError} id="contact-error">{errors.contact}</small> : null}
                </label>
              </div>

              <p className={styles.formNote}>No incluyas diagnósticos ni información clínica en esta solicitud.</p>
              <button className={styles.submitButton} type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Preparando solicitud" : "Confirmar solicitud"}<span aria-hidden="true">{isSubmitting ? "..." : "→"}</span></button>
            </form>
          )}
        </div>
      </section>

      <section className={`${styles.section} ${styles.groupSection}`}>
        <div className={styles.groupCopy}>
          <h2>Un grupo, tres puntos de atención</h2>
          <p>Grupo Centro reúne Sanatorio Centro, Instituto Médico Centro y Clínica Oftalmológica Centro en Rosario.</p>
          <a className={styles.inlineLink} href="https://grupocentro.ar/contacto/" target="_blank" rel="noreferrer">Visitar el sitio del grupo <span aria-hidden="true">↗</span></a>
        </div>
        <div className={styles.locationList} aria-label="Puntos de atención">
          {facilities.map((facility) => <div className={styles.locationRow} key={facility.id}><span className={styles.locationInitial} aria-hidden="true">{facility.shortName.slice(0, 1)}</span><div><strong>{facility.name}</strong><span>{facility.address}</span></div></div>)}
        </div>
      </section>

      <section className={styles.closingSection} aria-label="Orientación de sedes">
        <Image src="/images/exterior-clinic-entrance.jpg" alt="Entrada de una clínica urbana" fill sizes="100vw" />
        <div className={styles.closingOverlay}>
          <p className={styles.closingLabel}>Grupo Centro</p>
          <h2>Una mejor orientación empieza por la sede correcta</h2>
          <a className={styles.primaryButton} href="#sedes">Elegir una sede <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>Grupo Centro</strong><span>Concepto de navegación y solicitudes de turno</span></div>
        <div className={styles.footerRight}><span>Demo hecha por Nivaror. No es el sitio oficial.</span><a href="https://grupocentro.ar" target="_blank" rel="noreferrer">grupocentro.ar <span aria-hidden="true">↗</span></a></div>
      </footer>
    </main>
  );
}
