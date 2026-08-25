import Image from "next/image";
import styles from "./Ambiente.module.css";

export default function Ambiente() {
  return (
    <section id="ambiente" className={styles.section}>
      <div className={`wrap ${styles.layout}`}>
        <div className={styles.photoWrap}>
          <Image
            src="/images/ambiente-barra.jpg"
            alt="Barra de cócteles de Mapu Rosario"
            fill
            sizes="(max-width: 780px) 100vw, 60vw"
            className={styles.photo}
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.heading}>Antes de ir</h2>
          <dl className={styles.list}>
            <div>
              <dt>Reservas</dt>
              <dd>Se recomienda reservar en las tres franjas: brunch, almuerzo y cena.</dd>
            </div>
            <div>
              <dt>Pagos</dt>
              <dd>Tarjetas de crédito y débito, y pagos por NFC.</dd>
            </div>
            <div>
              <dt>Estacionamiento</dt>
              <dd>Hay lugar en la zona, gratuito y pago según cuadra.</dd>
            </div>
            <div>
              <dt>Accesibilidad</dt>
              <dd>Entrada, salón y baños accesibles en silla de ruedas. Menú disponible en braille.</dd>
            </div>
            <div>
              <dt>Con chicos</dt>
              <dd>Menú infantil y sillas altas disponibles.</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
