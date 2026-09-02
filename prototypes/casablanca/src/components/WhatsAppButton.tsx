import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./WhatsAppButton.module.css";

const WHATSAPP_URL =
  "https://wa.me/3417485610?text=" + encodeURIComponent("Hola! Quiero reservar una mesa en Casablanca.");

export default function WhatsAppButton({ small = false }: { small?: boolean }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${small ? styles.small : ""}`}
      aria-label="Reservar por WhatsApp"
    >
      <WhatsappLogo weight="fill" size={small ? 18 : 20} />
      <span className={styles.label}>Reservar por WhatsApp</span>
    </a>
  );
}
