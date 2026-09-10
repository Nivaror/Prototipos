import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.css'
import Reserva from '@/components/Reserva'
import { CATEGORIAS, NEGOCIO, PROFESIONALES, SERVICIOS } from '@/config/negocio'
import { duracionTexto, precioARS } from '@/domain/fecha'

const DIAS_LABEL = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

const HORARIOS = [
  ['Martes a viernes', '09:00 a 19:00'],
  ['Sábados', '08:00 a 18:00'],
  ['Domingos y lunes', 'Cerrado'],
]

export default function Home() {
  return (
    <>
      <div className={s.demoBar}>
        <b>Demo de Nivaror.</b> No es el sitio oficial de Caro Franco.
      </div>

      <header className={s.nav}>
        <div className={`wrap ${s.navIn}`}>
          <Link href="/" className={s.marca}>
            <Image src="/fotos/logo-caro.png" alt="" width={42} height={42} className="avatar" />
            <span className={s.marcaTxt}>
              <b>Caro Franco</b>
              <span>Estilista &amp; Mkp</span>
            </span>
          </Link>
          <nav className={s.navLinks}>
            <a href="#reservar">Reservar</a>
            <a href="#servicios">Servicios</a>
            <a href="#equipo">Equipo</a>
            <a href="#salon">El salón</a>
          </nav>
          <Link href="/admin" className={s.navPanel}>Panel del salón</Link>
          <a href="#reservar" className="btn btn-accent btn-sm">Reservar turno</a>
        </div>
      </header>

      <section className={s.heroFoto}>
        <figure>
          <Image src="/fotos/salon/banda-espejos.jpg" alt="Puestos de peinado del salón" width={495} height={230} priority />
        </figure>
        <figure>
          <Image src="/fotos/salon/banda-puestos.jpg" alt="Vista general del salón" width={495} height={230} priority />
        </figure>
      </section>

      <div className="wrap">
        <div className={s.heroCard}>
          <div className={s.heroMarca}>
            <Image src="/fotos/logo-caro.png" alt="" width={38} height={38} className="avatar" />
            <span>Rosario, Santa Fe</span>
          </div>
          <h1 className="h1">Reservá tu turno online, a cualquier hora.</h1>
          <p className="lead" style={{ marginTop: '.9rem' }}>
            Elegí el servicio, con quién te querés atender y cuándo. Ves los horarios libres al instante.
          </p>
          <div className={s.heroCta}>
            <a href="#reservar" className="btn btn-accent">Reservar turno</a>
            <a href="#servicios" className="btn btn-ghost">Ver servicios</a>
          </div>
        </div>
      </div>

      <section id="reservar" className={`seccion ${s.reservaSec}`} style={{ marginTop: '3.5rem' }}>
        <div className="wrap">
          <div className={s.reservaTit}>
            <h2 className="h2">Sacá tu turno</h2>
            <p className="lead" style={{ marginTop: '.6rem' }}>
              Cuatro pasos. Solo se muestran los horarios que están realmente libres.
            </p>
          </div>
          <Reserva />
        </div>
      </section>

      <section id="servicios" className="seccion">
        <div className="wrap">
          <h2 className="h2">Servicios</h2>
          <p className="lead" style={{ marginTop: '.6rem' }}>
            Salón femenino. Color, corte, tratamientos y todo lo de eventos.
          </p>
          <div className={s.catGrid}>
            {CATEGORIAS.map((c) => (
              <div key={c}>
                <h3 className={s.catTit}>{c}</h3>
                <div className={s.svcLista}>
                  {SERVICIOS.filter((x) => x.categoria === c).map((x) => (
                    <div className={s.svcFila} key={x.id}>
                      <span>
                        <span className={s.svcNom}>{x.nombre}</span>
                        {x.descripcion && <span className="small muted" style={{ display: 'block' }}>{x.descripcion}</span>}
                      </span>
                      <span className={s.svcMeta}>
                        <span className="tnum">{x.precio === null ? 'a consultar' : precioARS(x.precio)}</span>
                        <span className="small muted" style={{ display: 'block' }}>{duracionTexto(x.duracionMin)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {NEGOCIO.preciosEstimados && (
            <p className="small muted" style={{ marginTop: '2rem' }}>
              Valores de referencia para la demo. Los precios finales se cargan con la lista real del salón.
            </p>
          )}
        </div>
      </section>

      <section id="equipo" className="seccion" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <h2 className="h2">El equipo</h2>
          <p className="lead" style={{ marginTop: '.6rem' }}>
            Cada una con su especialidad y sus días. Podés elegir con quién atenderte.
          </p>
          <div className={s.riel}>
            {PROFESIONALES.map((p) => (
              <article key={p.id} className={`card ${s.rielCard}`}>
                <Image src={p.foto} alt={p.nombre} width={260} height={260} />
                <div className={s.rielTxt}>
                  <b className="h3">{p.nombre}</b>
                  <div className="small muted">{p.rol}</div>
                  <div className={s.rielDias} aria-label="Días que trabaja">
                    {DIAS_LABEL.map((d, i) => (
                      <span key={i} className={`${s.rielDia} ${p.horario[i] ? s.rielDiaOn : ''}`}>{d}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="salon" className="seccion">
        <div className="wrap">
          <h2 className="h2">El salón</h2>
          <div className={s.bento}>
            <div className={s.bentoFoto}>
              <Image src="/fotos/salon/puestos.jpg" alt="Puestos de peinado y recepción del salón" width={495} height={400} />
            </div>
            <div className={s.bentoCol}>
              <div className={`card ${s.bentoInfo}`}>
                <div className={s.infoFila}>
                  <b>Dónde</b>
                  <span>{NEGOCIO.direccion}</span>
                </div>
                <div className={s.infoFila}>
                  <b>Horarios</b>
                  <div className={s.horarios}>
                    {HORARIOS.map(([d, h]) => (
                      <div className={s.horFila} key={d}><span>{d}</span><span className="tnum">{h}</span></div>
                    ))}
                  </div>
                </div>
                <a href={NEGOCIO.instagram} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ justifySelf: 'start' }}>
                  {NEGOCIO.instagramHandle}
                </a>
              </div>
              <div className={s.bentoFoto} style={{ aspectRatio: '16/10' }}>
                <Image src="/fotos/salon/trabajo.jpg" alt="Trabajo de peinado en el salón" width={700} height={438} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={s.pie}>
        <div className={`wrap ${s.pieIn}`}>
          <div>
            <b className="h3">Caro Franco Estilista &amp; Mkp</b>
            <div className="small muted">{NEGOCIO.direccion}</div>
          </div>
          <div className={s.pieLinks}>
            <a href="#reservar" className="btn btn-accent btn-sm">Reservar turno</a>
            <a href={NEGOCIO.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">WhatsApp</a>
            <Link href="/admin" className="btn btn-ghost btn-sm">Panel del salón</Link>
          </div>
        </div>
        <div className="wrap">
          <p className={s.pieNota}>
            Prototipo hecho por Nivaror para mostrar cómo funcionaría un sistema de turnos propio.
            Los datos de la agenda, el equipo y los precios son de ejemplo.
          </p>
        </div>
      </footer>
    </>
  )
}
