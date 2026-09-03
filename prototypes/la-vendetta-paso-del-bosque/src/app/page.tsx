"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const pizzas = [
  { name: "La clásica", detail: "Tomate, mozzarella, albahaca fresca", price: "$12.900" },
  { name: "Parrillera", detail: "Mozzarella, provolone, cebolla asada", price: "$14.500" },
  { name: "Vendetta", detail: "Mozzarella, pepperoni, ají suave", price: "$15.200" },
];

export default function Home() {
  const [selected, setSelected] = useState(0); const [name, setName] = useState(""); const [date, setDate] = useState(""); const [status, setStatus] = useState<"idle" | "loading" | "success">("idle"); const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); if (!name.trim() || !date) { setError("Completá tu nombre y elegí una fecha para continuar."); return; } setError(""); setStatus("loading"); window.setTimeout(() => setStatus("success"), 900); }
  return <div className={styles.page}>
    <header className={styles.nav}><a href="#inicio" className={styles.wordmark}>LA VENDETTA <span>·</span></a><nav aria-label="Navegación principal"><a href="#carta">La carta</a><a href="#visita">Tu visita</a></nav><a className={styles.navCta} href="#pedido">Armar pedido <span>↗</span></a></header>
    <main>
      <section className={styles.hero} id="inicio"><div className={styles.heroCopy}><p className={styles.eyebrow}>Paso del Bosque · Rosario</p><h1>Pizza a la parrilla,<br /><em>momentos grandes.</em></h1><p className={styles.heroLead}>Una mesa para compartir, una pizza que vuelve a encender la charla.</p><div className={styles.heroActions}><a className={styles.primary} href="#pedido">Elegir mi pizza <span>↓</span></a><a className={styles.textLink} href="#visita">Planear visita <span>↗</span></a></div></div><div className={styles.heroImage}><Image src="/images/pizza-hero.jpg" alt="Pizza recién salida del horno" fill priority sizes="(max-width: 800px) 100vw, 55vw" /></div><div className={styles.heroStamp}>30 años<br /><span>de grandes momentos</span></div></section>
      <section className={styles.introBand}><p>La primera pizza a la parrilla en Rosario</p><span>·</span><p>Todos los días · 10 a 23 h</p><span>·</span><p>4★ · 261 reseñas</p></section>
      <section className={styles.menuSection} id="carta"><div className={styles.sectionTitle}><p className={styles.eyebrow}>La carta</p><h2>Elegí el centro<br /><em>de la mesa.</em></h2><p>Una selección pensada para pedir sin vueltas y llegar con hambre.</p></div><div className={styles.menuList}>{pizzas.map((pizza, index) => <button className={`${styles.menuItem} ${selected === index ? styles.selected : ""}`} key={pizza.name} onClick={() => setSelected(index)}><span className={styles.itemNumber}>0{index + 1}</span><span><strong>{pizza.name}</strong><small>{pizza.detail}</small></span><span className={styles.price}>{pizza.price} <b>+</b></span></button>)}</div></section>
      <section className={styles.orderSection} id="pedido"><div className={styles.orderPhoto}><Image src="/images/table-setting.jpg" alt="Mesa lista para compartir" fill sizes="(max-width: 800px) 100vw, 42vw" /></div><div className={styles.orderCard}><p className={styles.eyebrow}>Tu pedido, en dos pasos</p><h2>Guardá tu lugar<br /><em>en la mesa.</em></h2><p>Dejanos tus datos y prepará la visita a Paso del Bosque. Esto es una demo de reserva, no un pedido confirmado.</p>{status === "success" ? <div className={styles.success}><span>✓</span><strong>Listo, {name.trim()}.</strong><p>Recibimos tu pedido de prueba para el {date}. Te esperamos en Paso del Bosque.</p><button onClick={() => setStatus("idle")}>Hacer otra reserva</button></div> : <form onSubmit={submit}><label>Tu nombre<input value={name} onChange={(e) => setName(e.target.value)} /></label><label>¿Qué día venís?<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>{error && <p className={styles.error}>{error}</p>}<button className={styles.primary} disabled={status === "loading"}>{status === "loading" ? "Guardando tu mesa…" : "Confirmar visita  ↗"}</button></form>}</div></section>
      <section className={styles.visitSection} id="visita"><div><p className={styles.eyebrow}>Paso del Bosque</p><h2>Nos vemos<br /><em>en la mesa.</em></h2></div><div className={styles.visitInfo}><p>Juan Pablo II 1740 bis<br />Rosario, Santa Fe</p><a href="https://lavendetta.com.ar/restaurantes" target="_blank" rel="noreferrer">Ver todas las sucursales <span>↗</span></a></div><div className={styles.smallPhoto}><Image src="/images/dining-room.jpg" alt="Salón de La Vendetta" fill sizes="220px" /></div></section>
    </main><footer><span>LA VENDETTA <i>·</i></span><span>Demo conceptual creada por Nivaror · No es el sitio oficial</span><a href="https://www.instagram.com/lavendettaok/" target="_blank" rel="noreferrer">Instagram ↗</a></footer>
  </div>;
}
