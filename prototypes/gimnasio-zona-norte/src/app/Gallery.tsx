import Image from "next/image";
import styles from "./Gallery.module.css";

const FRAMES = [
  { src: "/images/functional-training-zone.jpg", caption: "Zona funcional" },
  { src: "/images/detail-weights-rack.jpg", caption: "Sector de pesas" },
  { src: "/images/action-workout-silhouette.jpg", caption: "Piso de entrenamiento" },
];

export default function Gallery() {
  return (
    <section id="instalaciones" className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Instalaciones</h2>
      </div>

      <div className={styles.strip}>
        <div className={styles.stripInner}>
          {FRAMES.map((frame) => (
            <figure key={frame.src} className={styles.frame}>
              <div className={styles.imgWrap}>
                <Image
                  src={frame.src}
                  alt={frame.caption}
                  fill
                  className={styles.img}
                  sizes="(max-width: 767px) 78vw, 360px"
                />
              </div>
              <figcaption className={styles.caption}>{frame.caption}</figcaption>
            </figure>
          ))}

          <a
            href="https://www.instagram.com/gimnasio.zonanorte"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igFrame}
          >
            <span>Seguinos en Instagram</span>
            <span className={styles.igArrow}>&#8594;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
