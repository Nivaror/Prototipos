"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const services = ["Consulta mastológica", "Diagnóstico mamario", "Seguimiento", "Otra consulta"];

export default function Home() {
  const [service, setService] = useState(services[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("loading"); window.setTimeout(() => setStatus("success"), 700);
  }
  return <main>
    <nav className={styles.nav} aria-label="Navegación principal"><a className={styles.brand} href="#inicio"><span>C</span> CEMA</a><div className={styles.navLinks}><a href="#especialidades">Especialidades</a><a href="#contacto">Solicitar turno</a></div></nav>
    <section className={styles.hero} id="inicio"><div className={styles.heroCopy}><p className={styles.eyebrow}>Centro de Mastología · Rosario</p><h1>Un espacio para cuidar tu salud mamaria.</h1><p className={styles.lede}>Atención especializada con la calma y el tiempo que cada consulta necesita.</p><a className={styles.primary} href="#contacto">Solicitar un turno <span>↗</span></a><p className={styles.note}>Te contactaremos para orientarte sobre la disponibilidad.</p></div><div className={styles.heroImage}><Image src="/hero-waiting-room.jpg" alt="Espacio de espera luminoso de una clínica" fill priority sizes="(max-width: 800px) 100vw, 55vw" /><div className={styles.imageLabel}>Desde 2000<br /><strong>Centro, Rosario</strong></div></div></section>
    <section className={styles.intro}><p className={styles.sectionKicker}>CEMA / 01</p><div><h2>Orientación clara<br />desde el primer paso.</h2><p>Encontrá el área que mejor acompaña tu consulta y dejanos tus datos de contacto. El equipo de CEMA se comunicará para continuar la coordinación.</p></div></section>
    <section className={styles.services} id="especialidades"><div className={styles.sectionHead}><p className={styles.sectionKicker}>Áreas de atención</p><p className={styles.muted}>Seleccioná una opción para comenzar</p></div><div className={styles.serviceGrid}>{services.map((item, index) => <button className={`${styles.service} ${service === item ? styles.selected : ""}`} key={item} onClick={() => { setService(item); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}><span>0{index + 1}</span><strong>{item}</strong><i>↗</i></button>)}</div></section>
    <section className={styles.contactSection} id="contacto"><div className={styles.contactImage}><Image src="/service-consultation-hands.jpg" alt="Profesional de salud acompañando una consulta" fill sizes="(max-width: 800px) 100vw, 50vw" /><p>Un primer contacto<br /><strong>también puede ser tranquilo.</strong></p></div><div className={styles.formWrap}><p className={styles.sectionKicker}>CEMA / 02 — Solicitud</p><h2>Coordinemos tu consulta.</h2><p className={styles.formIntro}>Completá este formulario breve. No necesitamos información médica para contactarte.</p>{status === "success" ? <div className={styles.success} role="status"><span>✓</span><div><h3>Solicitud recibida</h3><p>Gracias. El equipo de CEMA se comunicará para coordinar tu consulta.</p></div></div> : <form onSubmit={submit}><label>¿Qué necesitás coordinar?<select value={service} onChange={(e) => setService(e.target.value)}>{services.map((item) => <option key={item}>{item}</option>)}</select></label><div className={styles.formRow}><label>Nombre y apellido<input required minLength={2} name="name" placeholder="Tu nombre" /></label><label>Medio de contacto<input required name="contact" placeholder="Email o WhatsApp" /></label></div><button className={styles.submit} disabled={status === "loading"}>{status === "loading" ? "Enviando solicitud…" : "Enviar solicitud"}<span>→</span></button><p className={styles.formFoot}>Solo usaremos estos datos para responder a tu solicitud.</p></form>}</div></section>
    <footer><div className={styles.brand}><span>C</span> CEMA</div><div><strong>Dorrego 548</strong><br />S2000 Rosario, Santa Fe</div><div><strong>Lunes a viernes</strong><br />8:00 a 20:00</div><p>© CEMA — Muestra conceptual<br /><small>No es el sitio oficial.</small></p></footer>
  </main>;
}
