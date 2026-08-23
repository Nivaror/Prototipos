import { Star, MapPin } from "@phosphor-icons/react/dist/ssr";
import { MAPS_URL } from "./hours";
import styles from "./page.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.footerBrand}>Hostería Yacyretá</p>
            <p className={styles.footerAddr}>
              Tranquera de Loreto y Buenos Aires, Ituzaingó, Corrientes
            </p>
            <p className={styles.footerRating}>
              <Star size={16} weight="fill" /> 4.5 · 27 reseñas en Google
            </p>
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.footerLink}>
            <MapPin size={18} weight="bold" /> Cómo llegar
          </a>
        </div>
        <p className={styles.disclaimer}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial
          de Hostería Yacyretá y no está afiliado al negocio.
        </p>
      </div>
    </footer>
  );
}
