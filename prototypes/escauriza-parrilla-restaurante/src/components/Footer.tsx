import { MapPin } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="border-t border-[#f3ece1]/10 bg-[#18130f] px-4 py-12 text-sm text-[#f3ece1]/70 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-lg text-[#f3ece1]">Escauriza Parrilla Restaurante</p>
        <p className="mt-2 flex items-center gap-1.5">
          <MapPin size={16} />
          Escauriza 3612, La Florida, Rosario
        </p>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t border-[#f3ece1]/10 pt-6 text-xs text-[#f3ece1]/45">
        Esta página es una muestra de Nivaror pensada para Escauriza Parrilla Restaurante y no es su
        sitio oficial. Los horarios de reserva son los publicados en Google, la disponibilidad
        mostrada es ilustrativa.
      </p>
    </footer>
  );
}
