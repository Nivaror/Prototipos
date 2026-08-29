import Image from "next/image";
import { MapPin, Compass } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import StatusBadge from "./StatusBadge";
import styles from "./HoursLocation.module.css";
import { WEEK_ROW, ADDRESS_TEXT } from "@/lib/hours";

const MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJ4SZnVbpTtpURFjRKcGjjzlE";

export default function HoursLocation() {
  return (
    <section className={styles.section}>
      <Reveal className={styles.timelineCol}>
        <h2 className={styles.heading}>Horarios de atención</h2>
        <div className={styles.week}>
          {WEEK_ROW.map((d) => (
            <div key={d.label} className={`${styles.day} ${d.open ? styles.dayOpen : styles.dayClosed}`}>
              <span className={styles.dayLabel}>{d.label}</span>
              <span className={styles.dayState}>{d.open ? "7 a 20 hs" : "Cerrado"}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className={styles.addressCol}>
        <div className={styles.addressCard}>
          <div className={styles.thumb}>
            <Image
              src="/images/ambiance-exam-room.jpg"
              alt="Consultorio del centro"
              width={2048}
              height={1152}
              sizes="220px"
              className={styles.thumbImg}
            />
          </div>
          <div className={styles.addressBody}>
            <StatusBadge className={styles.badge} />
            <p className={styles.addressText}>
              <MapPin size={16} weight="fill" />
              {ADDRESS_TEXT}
            </p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className={styles.mapsLink}>
              <Compass size={16} weight="bold" />
              Cómo llegar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
