"use client";

import { useState, type FormEvent } from "react";
import styles from "./MembershipSection.module.css";

const options = [["musculacion", "Musculación"], ["funcional", "Funcional"], ["opciones", "Quiero conocer las opciones"]];

export default function MembershipSection() {
  const [interest, setInterest] = useState(""); const [name, setName] = useState(""); const [contact, setContact] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!interest || !name.trim() || !contact.trim()) { setError("Elegí una opción y completá tus datos para continuar."); return; } setError(""); setSent(true); }
  return <section className={styles.section} id="membresia" aria-labelledby="membership-title"><div className={styles.intro}><p className={styles.label}>Tu lugar en la sala</p><h2 id="membership-title">Convertí la intención en rutina.</h2><p>Elegí qué te interesa y dejá un contacto. El equipo te explica cómo sumarte.</p></div>{sent ? <div className={styles.success} role="status"><strong>Interés registrado</strong><p>Esta es una confirmación simulada. En la versión real, el gimnasio te respondería.</p><button type="button" onClick={() => setSent(false)}>Enviar otra consulta</button></div> : <form className={styles.form} onSubmit={submit} noValidate><label htmlFor="member-interest">Me interesa</label><select id="member-interest" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Elegí una opción</option>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><label htmlFor="member-name">Nombre</label><input id="member-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /><label htmlFor="member-contact">WhatsApp o email</label><input id="member-contact" value={contact} onChange={(event) => setContact(event.target.value)} autoComplete="email" />{error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.submit} type="submit">Quiero hacerme socio</button><small>Demo: no hay cobro ni alta real conectada.</small></form>}</section>;
}
