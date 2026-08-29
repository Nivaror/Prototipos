// Placeholder menu, illustrative only — El Banquete's own listing gives no
// menu/price data. Kept to generic, standard pizzería items (no invented
// signature dish or specialty), per core/prototype-workflow.md's
// placeholder-content rule. Prices are plausible ARS figures for a barrio
// pizzería, not sourced from the business.

export interface MenuItem {
  id: string;
  name: string;
  note: string;
  price: number;
}

export const MENU: MenuItem[] = [
  { id: "muzzarella", name: "Muzzarella", note: "Salsa, muzzarella, aceitunas", price: 7200 },
  { id: "napolitana", name: "Napolitana", note: "Muzzarella, tomate, ajo, orégano", price: 7900 },
  { id: "fugazzeta", name: "Fugazzeta rellena", note: "Cebolla, doble muzzarella", price: 9400 },
  { id: "cuatro-quesos", name: "Cuatro quesos", note: "Muzzarella, provolone, roquefort, parmesano", price: 9800 },
  { id: "jamon-morrones", name: "Jamón y morrones", note: "Muzzarella, jamón, morrones", price: 8600 },
  { id: "especial", name: "Especial de la casa", note: "Con fainá aparte", price: 8100 },
];

export const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
