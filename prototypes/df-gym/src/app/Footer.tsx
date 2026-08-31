import {
  MapPinLine,
  FacebookLogo,
  InstagramLogo,
  Wheelchair,
} from "@phosphor-icons/react/dist/ssr";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.mark}>DF</span>
          <span>DF-Centro de entrenamiento</span>
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <MapPinLine size={16} weight="fill" />
            <span>Gorriti 357, Las Malvinas, Rosario</span>
          </div>
          <div className={styles.col}>
            <Wheelchair size={16} weight="fill" />
            <span>Entrada accesible en silla de ruedas</span>
          </div>
          <a
            className={styles.col}
            href="https://instagram.com/distritofuerza"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramLogo size={16} weight="fill" />
            <span>instagram.com/distritofuerza</span>
          </a>
          <a
            className={styles.col}
            href="https://facebook.com/distritofuerza"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookLogo size={16} weight="fill" />
            <span>facebook.com/distritofuerza</span>
          </a>
        </div>

        <p className={styles.disclaimer}>
          Esta página es una demo creada por Nivaror, no es el sitio oficial
          de DF-Centro de entrenamiento.
        </p>
      </div>
    </footer>
  );
}
