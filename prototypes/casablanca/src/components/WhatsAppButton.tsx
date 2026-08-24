"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton({ small = false }: { small?: boolean }) {
  const [showNote, setShowNote] = useState(false);

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={`${styles.button} ${small ? styles.small : ""}`}
        onClick={() => setShowNote((v) => !v)}
        aria-expanded={showNote}
      >
        <WhatsappLogo weight="fill" size={small ? 18 : 20} />
        Reservar por WhatsApp
      </button>
      {showNote && (
        <p className={styles.note}>
          Este botón se conecta a WhatsApp una vez que Casablanca confirme su número de contacto. En la versión final abre el chat directo.
        </p>
      )}
    </div>
  );
}
