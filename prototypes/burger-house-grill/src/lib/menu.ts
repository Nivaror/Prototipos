export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
};

// Placeholder menu content (plausible burger-joint items and ARS prices) per
// the vault's prototype workflow: unverifiable filler is fair game, nothing
// here contradicts a confirmed fact about the business.
export const menu: MenuItem[] = [
  {
    id: "clasica",
    name: "Clásica",
    description: "Medallón de carne, cheddar, lechuga, tomate y salsa de la casa.",
    price: 8500,
    image: "/images/menu-burger-classic.jpg",
  },
  {
    id: "doble-bacon",
    name: "Doble Bacon",
    description: "Doble medallón, panceta crocante, cheddar y cebolla caramelizada.",
    price: 11800,
    image: "/images/menu-burger-cola.jpg",
  },
  {
    id: "bbq-onion",
    name: "BBQ Onion",
    description: "Medallón, salsa BBQ, aros de cebolla y provolone.",
    price: 9900,
  },
  {
    id: "veggie",
    name: "Veggie",
    description: "Medallón de vegetales grillado, palta, rúcula y mayo de ajo.",
    price: 8900,
  },
];

export function formatARS(value: number): string {
  return value.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });
}
