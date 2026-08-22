import Image from "next/image";
import {
  ArrowSquareOut,
  Baby,
  Car,
  CreditCard,
  Hamburger,
  InstagramLogo,
  Moped,
  ShoppingBag,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { OpenTicket, WeekBand } from "./OpenStatus";
import { Order } from "./Order";
import { Reveal } from "./Reveal";
import { INSTAGRAM_URL, MAPS_URL } from "./hours";
import hero from "../../public/images/hero-truck.jpg";
import burger from "../../public/images/burger.jpg";
import delivery from "../../public/images/delivery.jpg";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#top">
          <span className={styles.mark} aria-hidden="true" />
          <span>
            Don Franccesco
            <span className={styles.wordmarkSub}>Hamburguesas · Paso de la Patria</span>
          </span>
        </a>
        <nav className={styles.navLinks}>
          <a className={styles.navLink} href="#horarios">
            Horarios
          </a>
          <a className={styles.navLink} href="#carta">
            Carta
          </a>
          <a className={styles.btnPrimarySm} href="#pedir">
            Pedir
          </a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <OpenTicket />
            <h1 className={styles.h1}>
              Pedí sin
              <br />
              llamar.
            </h1>
            <p className={styles.lead}>
              Delivery y retiro, mediodía y noche, hasta las 00:30. No hay salón: acá se pide,
              se elige el horario y se pasa a buscar.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.btnPrimary} href="#pedir">
                Hacer un pedido
              </a>
              <a
                className={styles.btnGhost}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo size={18} weight="fill" aria-hidden="true" />
                Instagram
              </a>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={hero}
              alt="Food truck de noche con la ventanilla de atención iluminada en amarillo"
              placeholder="blur"
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        {/* Ordering-first: no dine-in on the listing, so the order is the page. */}
        <section className={styles.orderFirst} id="pedir">
          <Reveal>
            <div className={styles.orderGrid}>
              <div className={styles.orderCopy}>
                <h2 className={styles.h2}>Tu pedido, con horario.</h2>
                <p className={styles.body}>
                  Los horarios que ofrece el formulario salen del turno real de ese día: el
                  domingo solo aparece la noche, y ningún día pasa de las 00:30.
                </p>
                <Order />
              </div>
              <div className={styles.orderImage}>
                <Image
                  src={burger}
                  alt="Hamburguesa envuelta en papel sobre una barra metálica, de noche"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 36vw"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* The menu is the missing piece, and pretending otherwise would be invention. */}
        <section className={styles.menuGap} id="carta">
          <Reveal>
            <h2 className={styles.h2}>La carta va acá.</h2>
            <p className={styles.body}>
              La ficha de Google no publica ni un solo plato ni precio, así que esta maqueta no
              inventa ninguno. Estos son los espacios que se llenan con la carta real.
            </p>
            <div className={styles.menuGapInner}>
              <div className={styles.menuSlot}>
                <span className={styles.menuSlotTitle}>Hamburguesas</span>
                <span>Nombre, descripción y precio de cada una.</span>
              </div>
              <div className={styles.menuSlot}>
                <span className={styles.menuSlotTitle}>Para acompañar</span>
                <span>Papas, guarniciones y lo que salga de la parrilla.</span>
              </div>
              <div className={styles.menuSlot}>
                <span className={styles.menuSlotTitle}>Menú para niños</span>
                <span>Está listado en Google, pero no dice qué incluye.</span>
              </div>
              <div className={styles.menuSlot}>
                <span className={styles.menuSlotTitle}>Bebidas</span>
                <span>Con precios, para cerrar el pedido de una.</span>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.week_} id="horarios">
          <Reveal>
            <div className={styles.weekHead}>
              <h2 className={styles.h2}>Todos los días, salvo el domingo al mediodía.</h2>
              <p className={styles.body}>
                Mediodía desde las 11:30 y noche desde las 20 o 20:30 según el día. El domingo
                abre solo de noche.
              </p>
            </div>
            <WeekBand />
            <p className={styles.lateBanner}>
              Cierre parejo: <strong>00:30 todos los días</strong>
            </p>
          </Reveal>
        </section>

        <section className={styles.services}>
          <Reveal>
            <h2 className={styles.h2}>Cómo funciona.</h2>
            <div className={styles.bento}>
              <div className={`${styles.cell} ${styles.cellSupport}`}>
                <h3 className={styles.h3}>Cómo lo recibís</h3>
                <ul className={styles.cellList}>
                  <li>
                    <Moped size={19} weight="duotone" aria-hidden="true" />
                    Entrega a domicilio
                  </li>
                  <li>
                    <ShoppingBag size={19} weight="duotone" aria-hidden="true" />
                    Para llevar
                  </li>
                  <li>
                    <Hamburger size={19} weight="duotone" aria-hidden="true" />
                    Sin salón: no hay consumo en el lugar
                  </li>
                </ul>
              </div>

              <div className={styles.cellPhoto}>
                <Image
                  src={delivery}
                  alt="Bolsas de papel para llevar alineadas sobre una barra metálica de noche"
                  placeholder="blur"
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                <div className={styles.cellPhotoBody}>
                  <h3 className={styles.h3}>Al pasar a buscar</h3>
                  <ul className={styles.cellList}>
                    <li>
                      <Car size={19} weight="duotone" aria-hidden="true" />
                      Estacionamiento gratuito
                    </li>
                    <li>
                      <Baby size={19} weight="duotone" aria-hidden="true" />
                      Menú para niños
                    </li>
                  </ul>
                </div>
              </div>

              <div className={styles.cell}>
                <h3 className={styles.h3}>Cómo se paga</h3>
                <ul className={styles.cellList}>
                  <li>
                    <CreditCard size={19} weight="duotone" aria-hidden="true" />
                    Tarjetas de débito
                  </li>
                </ul>
                <p className={styles.help}>
                  Es el único medio de pago que figura en la ficha de Google. Si aceptan crédito
                  o transferencia, va acá.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section className={styles.rating}>
          <Reveal>
            <div className={styles.ratingInner}>
              <p className={styles.ratingScore}>
                4,9
                <Star size={26} weight="fill" aria-hidden="true" />
              </p>
              <p className={styles.ratingText}>
                Calificación en Google sobre 47 reseñas, con un rango de precios de $1.000 a
                $10.000.
              </p>
              <a
                className={styles.btnGhost}
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver reseñas
                <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </section>

        <section className={styles.place}>
          <Reveal>
            <div className={styles.placeBody}>
              <div>
                <h2 className={styles.h2}>Luis Ramírez 1333.</h2>
                <p className={styles.body}>
                  Paso de la Patria, Corrientes. Estacionamiento gratuito en la calle.
                </p>
              </div>
              <div className={styles.heroActions}>
                <a
                  className={styles.btnPrimary}
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                  <ArrowSquareOut size={17} weight="bold" aria-hidden="true" />
                </a>
                <a
                  className={styles.btnGhost}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo size={18} weight="fill" aria-hidden="true" />
                  @foodtruckfranccesco
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerLead}>
          Prototipo de demostración creado por Nivaror. No es el sitio oficial de Rotisería Don
          Franccesco y no está asociado al local.
        </p>
        <p className={styles.footerNote}>
          Los horarios, servicios, medios de pago y la calificación provienen de la ficha
          pública del negocio en Google Maps. La carta queda vacía a propósito: la ficha no
          publica platos ni precios y no se inventan. Las fotos son imágenes de referencia
          generadas para esta maqueta y no muestran el local ni sus productos. No se publica el
          teléfono del local.
        </p>
      </footer>
    </>
  );
}
