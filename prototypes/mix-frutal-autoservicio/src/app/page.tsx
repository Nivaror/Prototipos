"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const categories = [
  {
    id: "frutas",
    name: "Frutas y verduras",
    note: "Elegidas personalmente por sus dueños.",
  },
  {
    id: "fiambreria",
    name: "Fiambrería",
    note: "Para sumar a tu compra de todos los días.",
  },
  {
    id: "almacen",
    name: "Artículos de almacén",
    note: "Lo que buscás para completar la despensa.",
  },
  {
    id: "pastas",
    name: "Pastas",
    note: "Una categoría más para descubrir en el local.",
  },
] as const;

type CategoryId = (typeof categories)[number]["id"];
type FormErrors = {
  category?: string;
  name?: string;
  contact?: string;
};

export default function Home() {
  const [selected, setSelected] = useState<CategoryId[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function toggleCategory(id: CategoryId) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((categoryId) => categoryId !== id)
        : [...current, id],
    );
    setErrors((current) => ({ ...current, category: undefined }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!selected.length) nextErrors.category = "Sumá al menos una categoría.";
    if (!name.trim()) nextErrors.name = "Escribí tu nombre.";
    if (!contact.trim()) nextErrors.contact = "Dejanos un canal de contacto.";

    setErrors(nextErrors);
    setSubmitted(!Object.keys(nextErrors).length);
  }

  function resetList() {
    setSelected([]);
    setName("");
    setContact("");
    setErrors({});
    setSubmitted(false);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#inicio" aria-label="Mix Frutal, inicio">
          <span className={styles.brandMark}>MF</span>
          <span>
            <strong>Mix Frutal</strong>
            <small>Autoservicio</small>
          </span>
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          <a href="#descubri">Descubrí</a>
          <a href="#horarios">Horarios</a>
          <a className={styles.navListLink} href="#lista">
            Tu lista <span>{selected.length}</span>
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Frutería en Echesortu</p>
            <h1>Frutas, fiambres, almacén y pastas.</h1>
            <p className={styles.heroText}>
              Descubrí lo que ofrece Mix Frutal y dejá una consulta lista, sin depender de una cuenta de Facebook.
            </p>
            <a className={styles.primaryButton} href="#lista">
              Armar mi lista <span aria-hidden="true">+</span>
            </a>
          </div>

          <div className={styles.heroVisual} aria-label="Categorías de Mix Frutal">
            <div className={styles.visualTopline}>
              <span>Mix Frutal</span>
              <span>Rosario</span>
            </div>
            <div className={styles.categoryPoster}>
              <div className={styles.posterCellLarge}>Frutas<br />y verduras</div>
              <div className={styles.posterCell}>Fiambrería</div>
              <div className={styles.posterCell}>Almacén</div>
              <div className={styles.posterCellDark}>Pastas</div>
            </div>
            <div className={styles.visualFootline}>
              <span>Una página para descubrir</span>
              <span>y consultar</span>
            </div>
          </div>
        </section>

        <section className={styles.discovery} id="descubri">
          <div className={styles.discoveryIntro}>
            <p className={styles.sectionKicker}>El surtido</p>
            <h2>Elegí por dónde empezar.</h2>
            <p>
              Seleccioná las categorías que te interesan y prepará una consulta en pocos pasos.
            </p>
            <blockquote>
              “Los dueños elegimos personalmente y con lupa cada fruta y verdura.”
            </blockquote>
          </div>

          <div className={styles.discoveryWork}>
            <div className={styles.categoryGrid}>
              {categories.map((category) => {
                const isSelected = selected.includes(category.id);
                return (
                  <button
                    className={`${styles.categoryCard} ${isSelected ? styles.categoryCardSelected : ""}`}
                    key={category.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className={styles.categoryIndex}>{isSelected ? "Listo" : "Sumar"}</span>
                    <strong>{category.name}</strong>
                    <span>{category.note}</span>
                  </button>
                );
              })}
            </div>

            <aside className={styles.listPanel} id="lista" aria-labelledby="list-title">
              <div className={styles.listHeader}>
                <div>
                  <p className={styles.panelLabel}>Tu lista</p>
                  <h3 id="list-title">Prepará tu consulta</h3>
                </div>
                <span className={styles.listCount}>{selected.length}</span>
              </div>

              {selected.length ? (
                <ul className={styles.selectedList} aria-label="Categorías seleccionadas">
                  {selected.map((categoryId) => {
                    const category = categories.find((item) => item.id === categoryId);
                    if (!category) return null;
                    return (
                      <li key={category.id}>
                        <span>{category.name}</span>
                        <button type="button" onClick={() => toggleCategory(category.id)}>
                          Quitar
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={styles.emptyList}>
                  Tu lista está vacía. Sumá una categoría para preparar una consulta.
                </p>
              )}

              <form className={styles.requestForm} onSubmit={handleSubmit} noValidate>
                <div className={styles.fieldGroup}>
                  <label htmlFor="name">Tu nombre</label>
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((current) => ({ ...current, name: undefined }));
                      setSubmitted(false);
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    autoComplete="name"
                  />
                  {errors.name && <span className={styles.errorText} id="name-error">{errors.name}</span>}
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact">¿Cómo preferís que te contacten?</label>
                  <input
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(event) => {
                      setContact(event.target.value);
                      setErrors((current) => ({ ...current, contact: undefined }));
                      setSubmitted(false);
                    }}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "contact-error" : "contact-help contact-error"}
                    autoComplete="off"
                  />
                  <span className={styles.helperText} id="contact-help">WhatsApp o email, solo para esta demostración.</span>
                  {errors.contact && <span className={styles.errorText} id="contact-error">{errors.contact}</span>}
                </div>
                {errors.category && <p className={styles.formError} role="alert">{errors.category}</p>}
                <button className={styles.submitButton} type="submit">
                  {submitted ? "Solicitud lista" : "Preparar consulta"}
                </button>
                {submitted && (
                  <div className={styles.successMessage} role="status">
                    <strong>Tu solicitud quedó preparada en esta muestra.</strong>
                    <span>No se envió a ningún canal. Este prototipo no tiene backend.</span>
                    <button type="button" onClick={resetList}>Armar otra lista</button>
                  </div>
                )}
              </form>
            </aside>
          </div>
        </section>

        <section className={styles.visitSection} id="horarios">
          <div className={styles.visitLead}>
            <p className={styles.sectionKicker}>Pasá a conocerlo</p>
            <h2>Una dirección clara para tu próxima compra.</h2>
            <a
              className={styles.textLink}
              href="https://www.google.com/maps/search/?api=1&query=Mendoza+3553%2C+Rosario%2C+Santa+Fe"
              target="_blank"
              rel="noreferrer"
            >
              Abrir ubicación <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.visitDetails}>
            <div className={styles.addressBlock}>
              <span>Dirección</span>
              <strong>Mendoza 3553</strong>
              <p>Echesortu, Rosario, Santa Fe</p>
            </div>
            <div className={styles.hoursBlock}>
              <span>Horarios</span>
              <div className={styles.hoursRow}><strong>Lunes a sábado</strong><span>8 a 14 y 17 a 22</span></div>
              <div className={styles.hoursRow}><strong>Domingo</strong><span>10 a 14</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Mix Frutal Autoservicio</p>
        <p>Muestra hecha por Nivaror. No es el sitio oficial del negocio.</p>
      </footer>
    </div>
  );
}
