'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import s from '@/components/admin/admin.module.css'
import { NEGOCIO } from '@/config/negocio'
import { repositorio } from '@/data/repositorio'

const CLAVE_SESION = 'caro-franco:admin'

const TABS = [
  { href: '/admin', label: 'Agenda' },
  { href: '/admin/turnos', label: 'Turnos' },
  { href: '/admin/estadisticas', label: 'Estadísticas' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [entro, setEntro] = useState<boolean | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    try { setEntro(sessionStorage.getItem(CLAVE_SESION) === 'ok') } catch { setEntro(false) }
  }, [])

  if (entro === null) return null

  if (!entro) {
    return (
      <div className={s.gate}>
        <form
          className={`card ${s.gateCard}`}
          onSubmit={(e) => {
            e.preventDefault()
            if (pin.trim() === NEGOCIO.pinAdmin) {
              try { sessionStorage.setItem(CLAVE_SESION, 'ok') } catch {}
              setEntro(true)
            } else setError('Ese PIN no es correcto.')
          }}
        >
          <div>
            <b className="h3">Panel del salón</b>
            <p className="small muted" style={{ marginTop: '.3rem' }}>
              La vista con la que Caro y el equipo manejan la agenda.
            </p>
          </div>
          <div className="campo">
            <label htmlFor="pin">PIN de acceso</label>
            <input
              id="pin" value={pin} inputMode="numeric" autoFocus
              onChange={(e) => { setPin(e.target.value); setError('') }}
              placeholder="4 dígitos"
            />
            {error && <span className="error">{error}</span>}
          </div>
          <button className="btn btn-accent" type="submit">Entrar</button>
          <p className="tiny muted">
            En la demo el PIN es {NEGOCIO.pinAdmin}. Es una cortina, no seguridad real:
            si el sistema se implementa, acá va login de verdad.
          </p>
          <Link href="/" className="tiny muted" style={{ textDecoration: 'underline' }}>Volver al sitio</Link>
        </form>
      </div>
    )
  }

  return (
    <div className={s.shell}>
      <header className={s.top}>
        <div className={`wrap ${s.topIn}`}>
          <Link href="/admin" className={s.topMarca}>
            <Image src="/fotos/logo-caro.png" alt="" width={34} height={34} className="avatar" />
            <b>Panel del salón</b>
          </Link>
          <nav className={s.tabs}>
            {TABS.map((t) => (
              <Link key={t.href} href={t.href} className={`${s.tab} ${pathname === t.href ? s.tabOn : ''}`}>
                {t.label}
              </Link>
            ))}
          </nav>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { if (confirm('¿Volver la demo a los datos de ejemplo?')) repositorio.reiniciar() }}
          >
            Reiniciar<span className={s.soloAncho}>demo</span>
          </button>
          <Link href="/" className="btn btn-ghost btn-sm">Ver sitio</Link>
        </div>
      </header>
      <main className="wrap" style={{ paddingBlock: '1.6rem' }}>{children}</main>
    </div>
  )
}
