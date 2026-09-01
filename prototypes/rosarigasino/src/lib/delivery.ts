// Delivery ordering via WhatsApp. The lead's audit found delivery is offered
// but with no ordering flow beyond Facebook - this demos a proper one.
//
// Menu items and prices are plausible placeholder content (no real menu was
// sourced), per core/prototype-workflow.md's placeholder-content carve-out.
// Labelled "orientativos" in the UI so nothing here reads as sourced fact.
//
// ponytail: WHATSAPP_NUMBER is a placeholder, not Rosarigasino's real number
// (kept off public demo pages until there's an agreement with the business -
// see prototypes/rosarigasino.md). Swap for the real number before this is
// ever shown to the lead.
export const WHATSAPP_NUMBER = "5493410000000";

export type DeliveryCategory = "Para picar" | "Platos" | "Bebidas";

export type DeliveryItem = {
  id: string;
  name: string;
  price: number;
  category: DeliveryCategory;
};

export const DELIVERY_ITEMS: DeliveryItem[] = [
  { id: "empanadas", name: "Empanadas (docena mixta)", price: 9800, category: "Para picar" },
  { id: "picada", name: "Picada para 2", price: 14500, category: "Para picar" },
  { id: "hamburguesa", name: "Hamburguesa completa", price: 8900, category: "Platos" },
  { id: "milanesa", name: "Sándwich de milanesa napolitana", price: 9400, category: "Platos" },
  { id: "cerveza", name: "Cerveza artesanal (pinta)", price: 4200, category: "Bebidas" },
  { id: "gaseosa", name: "Gaseosa línea Coca-Cola", price: 2800, category: "Bebidas" },
];

export function formatARS(amount: number): string {
  return amount.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}

export function buildOrderMessage(quantities: Record<string, number>): string {
  const lines = DELIVERY_ITEMS.filter((item) => quantities[item.id] > 0).map(
    (item) => `- ${quantities[item.id]}x ${item.name}`,
  );
  const total = DELIVERY_ITEMS.reduce((sum, item) => sum + item.price * (quantities[item.id] ?? 0), 0);
  return [
    "Hola! Quiero hacer un pedido para delivery:",
    ...lines,
    "",
    `Total orientativo: ${formatARS(total)}`,
    "",
    "¿Me confirman tiempo de entrega?",
  ].join("\n");
}

export function buildWhatsAppOrderLink(quantities: Record<string, number>): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(quantities))}`;
}
