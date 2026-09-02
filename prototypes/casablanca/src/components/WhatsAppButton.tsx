import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./WhatsAppButton.module.css";

const DEFAULT_MESSAGE = "Hola! Quiero reservar una mesa en Casablanca.";

export default function WhatsAppButton({
  small = false,
  message = DEFAULT_MESSAGE,
  label = "Reservar por WhatsApp",
}: {
  small?: boolean;
  message?: string;
  label?: string;
}) {
  const href = "https://wa.me/3417485610?text=" + encodeURIComponent(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${small ? styles.small : ""}`}
      aria-label={label}
    >
      <WhatsappLogo weight="fill" size={small ? 18 : 20} />
      <span className={styles.label}>{label}</span>
    </a>
  );
}
