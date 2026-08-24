import { MapPin } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import OpenStatus from "./OpenStatus";
import styles from "./HoursLocation.module.css";

const ADDRESS = "Dr. Pedro José Agrelo 3132, S2005MHQ Rosario, Santa Fe";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS
)}`;

export default function HoursLocation() {
  return (
    <section id="horarios" className={styles.section}>
      <Reveal>
        <div>
          <h2 className={styles.heading}>Horarios</h2>
          <OpenStatus />
          <div className={styles.hours}>
            <div className={styles.hoursRow}>
              <span>Lunes a viernes</span>
              <span>8:00 a 21:00</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Sábado y domingo</span>
              <span>Cerrado</span>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className={styles.locationCard}>
          <h2 className={styles.heading} style={{ marginBottom: 0 }}>
            Ubicación
          </h2>
          <p className={styles.address}>{ADDRESS}</p>
          <a
            className={styles.mapCta}
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={16} weight="bold" />
            Cómo llegar
          </a>
        </div>
      </Reveal>
    </section>
  );
}
