"use client";

import { useState, type FormEvent } from "react";
import styles from "./MembershipSection.module.css";

const options = [["musculacion", "Musculación"], ["pilates", "Pilates"], ["opciones", "Quiero conocer las opciones"]];

export default function MembershipSection() {
  const [interest, setInterest] = useState(""); const [name, setName] = useState(""); const [contact, setContact] = useState(""); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!interest || !name.trim() || !contact.trim()) { setError("Elegí una opción y completá tus datos para continuar."); return; } setError(""); setSent(true); }
  return <section className={styles.section} id="membresia" aria-labelledby="membership-title"><div className={styles.wrap}><div className={styles.intro}><span>Empezá hoy</span><h2 id="membership-title">Elegí tu forma de entrenar.</h2><p>Dejanos tus datos y te explicamos cómo sumarte a la membresía.</p></div>{sent ? <div className={styles.success} role="status"><strong>Solicitud simulada</strong><p>Gracias, {name}. En la versión real, Olimpo te contactaría para continuar.</p><button type="button" onClick={() => setSent(false)}>Volver a consultar</button></div> : <form className={styles.form} onSubmit={submit} noValidate><label htmlFor="member-interest">Me interesa</label><select id="member-interest" value={interest} onChange={(event) => setInterest(event.target.value)}><option value="">Elegí una opción</option>{options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><label htmlFor="member-name">Nombre</label><input id="member-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /><label htmlFor="member-contact">WhatsApp o email</label><input id="member-contact" value={contact} onChange={(event) => setContact(event.target.value)} autoComplete="email" />{error && <p className={styles.error} role="alert">{error}</p>}<button className={styles.submit} type="submit">Quiero hacerme socio</button><small>Demo: no hay cobro ni alta real conectada.</small></form>}</div></section>;
}
