import { InstagramLogo, MapPin } from "@phosphor-icons/react/dist/ssr";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div>
          <span className={styles.mark}>Puerto Pichón</span>
          <p className={styles.address}>
            <MapPin size={15} weight="bold" /> Pedro León Gallo 185, Alberdi,
            Rosario
          </p>
        </div>

        <a
          href="https://instagram.com/puertopichon"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ig}
        >
          <InstagramLogo size={18} weight="bold" />
          instagram.com/puertopichon
        </a>
      </div>

      <div className={`wrap ${styles.disclaimerWrap}`}>
        <p className={styles.disclaimer}>
          Esta página es una muestra hecha por Nivaror para mostrarle a
          Puerto Pichón cómo podría verse una reserva online. No es el sitio
          oficial del negocio.
        </p>
      </div>
    </footer>
  );
}
