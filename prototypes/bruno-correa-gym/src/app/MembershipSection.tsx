"use client";

import { useState, type FormEvent } from "react";
import styles from "./MembershipSection.module.css";

const options = [["musculacion", "Musculación"], ["funcional", "Funcional"], ["opciones", "Quiero conocer las opciones"]];

export default function MembershipSection() {
  const [interest, setInterest] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!interest || !name.trim() || !contact.trim()) { setError("Elegí una opción y completá tus datos para continuar."); return; }
    setError(""); setSent(true);
  }

  return <section className={styles.section} id="membresia" aria-labelledby="membership-title"><div className={styles.intro}><p className={styles.label}>Primer paso</p><h2 id="membership-title">Hacé lugar para tu objetivo.</h2><p>Elegí cómo querés entrenar y dejá tus datos. En la versión real, el equipo te contacta para explicarte la membresía.</p></div>{sent ? <div className={styles.success} role="status"><span className={styles.successMark}>OK</span><h3>Interés registrado</h3><p>Esta es una confirmación simulada. El gimnasio te contactaría por el canal indicado.</p><button type="button" className={styles.reset} onClick={() => setSent(false)}>Volver a consultar</button></div> : <form className={styles.form} onSubmit={submit} noValidate><label htmlFor="member-interest">¿Qué te interesa?</label><select id="member-interest" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Elegí una opción</option>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><label htmlFor="member-name">Tu nombre</label><input id="member-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Cómo te llamás" autoComplete="name" /><label htmlFor="member-contact">WhatsApp o email</label><input id="member-contact" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Cómo te contactamos" autoComplete="email" />{error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.submit} type="submit">Quiero hacerme socio</button><p className={styles.note}>Demo: no hay cobro ni alta real conectada.</p></form>}</section>;
}
