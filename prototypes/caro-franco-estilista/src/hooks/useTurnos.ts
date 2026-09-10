'use client'

import { useCallback, useEffect, useState } from 'react'
import { repositorio, type Estado } from '@/data/repositorio'

/**
 * Lee del repositorio y se revalida ante cualquier cambio, incluido el de
 * otra pestana. Asi el panel del salon ve al instante el turno que la clienta
 * acaba de sacar en la otra ventana, que es la demo que mas impresiona.
 */
export function useTurnos() {
  const [estado, setEstado] = useState<Estado>({ turnos: [], excepciones: [] })
  const [listo, setListo] = useState(false)

  const refrescar = useCallback(() => setEstado(repositorio.estado()), [])

  useEffect(() => {
    refrescar()
    setListo(true)
    const onCambio = () => refrescar()
    window.addEventListener('turnos:cambio', onCambio)
    window.addEventListener('storage', onCambio)
    return () => {
      window.removeEventListener('turnos:cambio', onCambio)
      window.removeEventListener('storage', onCambio)
    }
  }, [refrescar])

  return { ...estado, listo, refrescar, repo: repositorio }
}
