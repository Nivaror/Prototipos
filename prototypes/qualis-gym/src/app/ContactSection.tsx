import styles from "./page.module.css";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section className={styles.contact} id="consultar">
      <div className={styles.wrap}>
        <Reveal className={styles.contactBand}>
          <div className={styles.contactHead}>
            <h2 className={styles.contactTitle}>Quiero hacerme socio</h2>
            <p className={styles.contactBody}>
              Elegí tu objetivo y dejanos un contacto. Te contamos cómo sumarte, sin compromiso.
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
