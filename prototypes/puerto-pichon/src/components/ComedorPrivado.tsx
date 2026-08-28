import Image from "next/image";
import { Wine, ForkKnife } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";
import styles from "./ComedorPrivado.module.css";

export default function ComedorPrivado() {
  return (
    <section id="comedor-privado" className={`section ${styles.section}`}>
      <div className="wrap">
        <Reveal className={styles.layout}>
          <div className={styles.photoCol}>
            <Image
              src="/images/private-room-vinos.jpg"
              alt="Comedor privado de Puerto Pichón"
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
              className={styles.photo}
            />
          </div>

          <div className={styles.card}>
            <h2 className={styles.title}>El comedor privado</h2>
            <p className={styles.body}>
              Una sala aparte para cumpleaños, cenas de empresa o brindis,
              con carta de vinos propia. Hoy solo se conoce si alguien
              pregunta por Instagram.
            </p>
            <div className={styles.facts}>
              <span>
                <Wine size={17} weight="bold" /> Buena selección de
                vinos
              </span>
              <span>
                <ForkKnife size={17} weight="bold" /> Servicio de catering
              </span>
            </div>
            <a
              href="https://instagram.com/puertopichon"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn--accent"
            >
              Consultar por Instagram
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
