import Link from 'next/link'
import Image from 'next/image'
import Reserva from '@/components/Reserva'
import s from '../page.module.css'

export const metadata = { title: 'Reservar turno | Caro Franco Estilista' }

export default function Reservar() {
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
          <Link href="/" className="btn btn-ghost btn-sm">Volver al inicio</Link>
        </div>
      </header>
      <main className="wrap seccion">
        <div className={s.reservaTit}>
          <h1 className="h2">Sacá tu turno</h1>
          <p className="lead" style={{ marginTop: '.6rem' }}>
            Elegí el servicio, con quién y cuándo. Solo aparecen los horarios realmente libres.
          </p>
        </div>
        <Reserva />
      </main>
    </>
  )
}
