import type { Profesional, Servicio } from '../domain/tipos.ts'

// ---------------------------------------------------------------------------
// TODO lo especifico de Caro vive aca y solo aca. Cuando lleguen los datos
// reales (nombres del equipo, horarios, precios, direccion) se reemplaza este
// archivo y nada mas.
//
// CONFIRMADO por el cliente: local a la calle en Lavalle 1252, salon con
// equipo, publico y servicios exclusivamente femeninos, sin sistema de
// reservas hoy. Logo y fotos del salon son reales.
//
// PLACEHOLDER: nombres y cantidad del equipo, que hace cada una, horarios de
// cada una, precios, y si pide senia.
// ---------------------------------------------------------------------------

export const NEGOCIO = {
  nombre: 'Caro Franco',
  nombreCompleto: 'Caro Franco Estilista & Mkp',
  bajada: 'Color, corte, peinados y maquillaje. Personalizados para cada ocasión.',
  instagram: 'https://www.instagram.com/caro_stylistt/',
  instagramHandle: '@caro_stylistt',
  // El numero NO se imprime en pantalla (politica de datos sensibles del vault).
  // Solo alimenta el link de WhatsApp.
  whatsapp: 'https://wa.me/5493416894588',
  direccion: 'Lavalle 1252, Rosario',
  ciudad: 'Rosario, Santa Fe',
  pinAdmin: '1234',
  pasoSlotMin: 15,
  bufferMin: 0,
  anticipacionMinimaHoras: 2,
  diasVisibles: 30,
  // Los precios son una escala de referencia coherente, sin lista real
  // confirmada. Con esto en true la UI los muestra marcados como estimados.
  preciosEstimados: true,
}

export const SERVICIOS: Servicio[] = [
  { id: 'corte', nombre: 'Corte de dama', categoria: 'Corte y peinado', duracionMin: 45, precio: 18000, descripcion: 'Lavado, corte y secado a mano.' },
  { id: 'corte-brushing', nombre: 'Corte + brushing', categoria: 'Corte y peinado', duracionMin: 75, precio: 27000, descripcion: 'El corte con brushing terminado.' },
  { id: 'brushing', nombre: 'Brushing', categoria: 'Corte y peinado', duracionMin: 40, precio: 13000, descripcion: 'Lavado y brushing con volumen.' },
  { id: 'planchita', nombre: 'Planchita', categoria: 'Corte y peinado', duracionMin: 30, precio: 11000, descripcion: 'Alisado con planchita, sin química.' },

  { id: 'color', nombre: 'Color entero', categoria: 'Color', duracionMin: 120, precio: 42000, descripcion: 'Coloración completa de raíz a puntas.' },
  { id: 'raiz', nombre: 'Retoque de raíz', categoria: 'Color', duracionMin: 90, precio: 29000, descripcion: 'Solo el crecimiento, para mantener el color.' },
  { id: 'mechas', nombre: 'Mechas', categoria: 'Color', duracionMin: 180, precio: 65000, descripcion: 'Con papel o gorro, según el pelo.' },
  { id: 'balayage', nombre: 'Balayage', categoria: 'Color', duracionMin: 210, precio: 78000, descripcion: 'Degradé a mano alzada, con matizado.' },
  { id: 'babylights', nombre: 'Babylights', categoria: 'Color', duracionMin: 180, precio: 68000, descripcion: 'Mechas finas para un aclarado natural.' },

  { id: 'nutricion', nombre: 'Nutrición capilar', categoria: 'Tratamientos', duracionMin: 45, precio: 16000, descripcion: 'Para pelo seco o castigado por el color.' },
  { id: 'hidratacion', nombre: 'Hidratación', categoria: 'Tratamientos', duracionMin: 45, precio: 16000, descripcion: 'Devuelve brillo y manejabilidad.' },
  { id: 'botox', nombre: 'Botox capilar', categoria: 'Tratamientos', duracionMin: 90, precio: 38000, descripcion: 'Rellena la fibra y baja el frizz.' },
  { id: 'keratina', nombre: 'Keratina', categoria: 'Tratamientos', duracionMin: 120, precio: 52000, descripcion: 'Alisado progresivo con keratina.' },
  { id: 'alisado', nombre: 'Alisado', categoria: 'Tratamientos', duracionMin: 150, precio: 60000, descripcion: 'Alisado de larga duración.' },

  { id: 'peinado', nombre: 'Peinado / recogido', categoria: 'Eventos', duracionMin: 60, precio: 22000, descripcion: 'Para fiesta, civil o evento.' },
  { id: 'peinado-novia', nombre: 'Peinado de novia', categoria: 'Eventos', duracionMin: 90, precio: 45000, descripcion: 'Incluye prueba previa coordinada aparte.' },
  { id: 'maquillaje', nombre: 'Maquillaje social', categoria: 'Eventos', duracionMin: 60, precio: 25000, descripcion: 'Maquillaje para evento, dura toda la noche.' },
  { id: 'maquillaje-peinado', nombre: 'Maquillaje + peinado', categoria: 'Eventos', duracionMin: 120, precio: 42000, descripcion: 'El combo completo para el día del evento.' },
]

export const CATEGORIAS = ['Corte y peinado', 'Color', 'Tratamientos', 'Eventos']

// Las agendas son deliberadamente dispares. Si las cuatro trabajaran los
// mismos dias, el paso "con quien" y la agenda del salon se verian identicos
// entre si y la demo no mostraria el problema que resuelve.
export const PROFESIONALES: Profesional[] = [
  {
    id: 'caro',
    nombre: 'Caro Franco',
    rol: 'Dueña. Estilista y color',
    foto: '/fotos/equipo/caro.jpg',
    serviciosIds: ['corte', 'corte-brushing', 'brushing', 'color', 'raiz', 'mechas', 'balayage', 'peinado', 'maquillaje'],
    horario: {
      0: null, 1: null,
      2: { desde: '09:00', hasta: '19:00', cortes: [{ desde: '13:00', hasta: '14:00' }] },
      3: { desde: '09:00', hasta: '19:00', cortes: [{ desde: '13:00', hasta: '14:00' }] },
      4: { desde: '09:00', hasta: '19:00', cortes: [{ desde: '13:00', hasta: '14:00' }] },
      5: { desde: '09:00', hasta: '19:00', cortes: [{ desde: '13:00', hasta: '14:00' }] },
      6: { desde: '09:00', hasta: '17:00' },
    },
  },
  {
    id: 'belen',
    nombre: 'Belén Ríos',
    rol: 'Colorista',
    foto: '/fotos/equipo/belen.jpg',
    serviciosIds: ['color', 'raiz', 'mechas', 'balayage', 'babylights', 'nutricion', 'hidratacion', 'botox', 'keratina'],
    horario: {
      0: null, 1: null,
      2: { desde: '10:00', hasta: '19:00' },
      3: { desde: '10:00', hasta: '19:00' },
      4: { desde: '10:00', hasta: '19:00' },
      5: { desde: '10:00', hasta: '19:00' },
      6: { desde: '09:00', hasta: '17:00' },
    },
  },
  {
    id: 'agustina',
    nombre: 'Agustina Vera',
    rol: 'Estilista. Cortes y brushing',
    foto: '/fotos/equipo/agustina.jpg',
    serviciosIds: ['corte', 'corte-brushing', 'brushing', 'planchita', 'nutricion', 'hidratacion', 'alisado'],
    horario: {
      0: null, 1: null, 2: null,
      3: { desde: '09:00', hasta: '18:00' },
      4: { desde: '09:00', hasta: '18:00' },
      5: { desde: '09:00', hasta: '18:00' },
      6: { desde: '09:00', hasta: '17:00' },
    },
  },
  {
    id: 'rocio',
    nombre: 'Rocío Medina',
    rol: 'Peinados y maquillaje',
    foto: '/fotos/equipo/rocio.jpg',
    serviciosIds: ['peinado', 'peinado-novia', 'maquillaje', 'maquillaje-peinado', 'brushing'],
    horario: {
      0: null, 1: null, 2: null, 3: null,
      4: { desde: '10:00', hasta: '19:00' },
      5: { desde: '10:00', hasta: '19:00' },
      6: { desde: '08:00', hasta: '18:00' },
    },
  },
]

export const servicioPorId = (id: string) => SERVICIOS.find((s) => s.id === id)
export const profesionalPorId = (id: string) => PROFESIONALES.find((p) => p.id === id)
