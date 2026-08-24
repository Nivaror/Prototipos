import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section className={styles.contact} id="consultar">
      <div className={styles.wrap}>
        <Reveal className={styles.contactBand}>
          <div className={styles.contactHead}>
            <h2 className={styles.contactTitle}>Consultá tu plan</h2>
            <p className={styles.contactBody}>
              Dejanos tu nombre y te contamos disponibilidad, precios y cómo arrancar. Sin compromiso.
            </p>
          </div>
          <div className={styles.contactCard}>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
