'use client'

import { useEffect } from 'react'
import type { EstadoTurno } from '@/domain/tipos'

export const ETIQUETA_ESTADO: Record<EstadoTurno, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  completado: 'Completado',
  cancelado: 'Cancelado',
  'no-asistio': 'No asistió',
}

const CLASE_ESTADO: Record<EstadoTurno, string> = {
  pendiente: 'chip-warn',
  confirmado: 'chip-accent',
  completado: 'chip-ok',
  cancelado: 'chip',
  'no-asistio': 'chip-bad',
}

export function Estado({ estado }: { estado: EstadoTurno }) {
  return <span className={`chip ${CLASE_ESTADO[estado]}`}>{ETIQUETA_ESTADO[estado]}</span>
}

export function Modal({
  titulo, children, onCerrar, ancho = 460,
}: { titulo: string; children: React.ReactNode; onCerrar: () => void; ancho?: number }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [onCerrar])

  return (
    <div
      role="dialog" aria-modal="true" aria-label={titulo}
      onClick={onCerrar}
      style={{
        position: 'fixed', inset: 0, zIndex: 60, display: 'grid', placeItems: 'center',
        background: 'rgba(20,16,10,.45)', padding: '1rem', backdropFilter: 'blur(2px)',
      }}
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: ancho, maxHeight: '88vh', overflowY: 'auto', boxShadow: 'var(--shadow)' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
          padding: '1rem 1.2rem', borderBottom: '1px solid var(--line)', position: 'sticky', top: 0,
          background: 'var(--surface)', borderRadius: 'var(--r) var(--r) 0 0',
        }}>
          <b className="h3">{titulo}</b>
          <button onClick={onCerrar} aria-label="Cerrar" className="muted" style={{ fontSize: '1.25rem', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: '1.2rem', display: 'grid', gap: '1rem' }}>{children}</div>
      </div>
    </div>
  )
}
