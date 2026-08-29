"use client";

import { useState, FormEvent } from "react";
import { WhatsappLogo, Phone, CheckCircle, CircleNotch } from "@phosphor-icons/react/dist/ssr";
import styles from "./TurnoRequest.module.css";

const MOTIVOS = ["Lesión aguda", "Control o seguimiento", "Primera consulta"];
const FRANJAS = ["Mañana (7 a 13 hs)", "Tarde (13 a 20 hs)"];

type Status = "idle" | "loading" | "success" | "error";

export default function TurnoRequest() {
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [franja, setFranja] = useState(FRANJAS[0]);
  const [medio, setMedio] = useState<"whatsapp" | "llamada">("whatsapp");
  const [nombre, setNombre] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("Ingresá tu nombre para poder confirmarte el turno.");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");
    // Mock submission: this demo doesn't send data anywhere yet.
    setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className={styles.card}>
        <div className={styles.successState}>
          <CheckCircle size={48} weight="fill" className={styles.successIcon} />
          <h3 className={styles.successTitle}>Solicitud enviada</h3>
          <p className={styles.successBody}>
            {nombre}, quedó registrada tu solicitud para {motivo.toLowerCase()}, en el
            horario de {franja.toLowerCase()}. En la versión real, el centro te
            confirma por {medio === "whatsapp" ? "WhatsApp" : "llamada"} apenas ve la
            solicitud, sin que tengas que esperar en línea.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <fieldset className={styles.group}>
        <legend className={styles.legend}>Motivo de la consulta</legend>
        <div className={styles.pillRow}>
          {MOTIVOS.map((m) => (
            <button
              type="button"
              key={m}
              className={`${styles.pill} ${motivo === m ? styles.pillActive : ""}`}
              onClick={() => setMotivo(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Horario preferido (lunes a viernes)</legend>
        <div className={styles.pillRow}>
          {FRANJAS.map((f) => (
            <button
              type="button"
              key={f}
              className={`${styles.pill} ${franja === f ? styles.pillActive : ""}`}
              onClick={() => setFranja(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Nombre</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Tu nombre y apellido"
            className={styles.input}
          />
          {status === "error" && <span className={styles.error}>{error}</span>}
        </label>

        <div className={styles.field}>
          <span className={styles.label}>Cómo preferís que te contacten</span>
          <div className={styles.medioRow}>
            <button
              type="button"
              className={`${styles.medioBtn} ${medio === "whatsapp" ? styles.medioActive : ""}`}
              onClick={() => setMedio("whatsapp")}
            >
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp
            </button>
            <button
              type="button"
              className={`${styles.medioBtn} ${medio === "llamada" ? styles.medioActive : ""}`}
              onClick={() => setMedio("llamada")}
            >
              <Phone size={18} weight="fill" />
              Llamada
            </button>
          </div>
        </div>
      </div>

      <button type="submit" className={styles.submit} disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <CircleNotch size={18} className={styles.spinner} />
            Enviando…
          </>
        ) : (
          "Solicitar turno"
        )}
      </button>
    </form>
  );
}
