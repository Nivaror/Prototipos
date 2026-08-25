// Illustrative flavors and formats — the lead's actual menu wasn't in the audit,
// so these are plausible, generic Argentine heladería staples (placeholder-content
// rule: fair game because they're unverifiable filler, not a specific invented
// signature the audit gives no hint of).

export type Flavor = {
  id: string;
  name: string;
  tone: string;
};

export const FLAVORS: Flavor[] = [
  { id: "dulce-de-leche", name: "Dulce de leche", tone: "#c68a4b" },
  { id: "chocolate-amargo", name: "Chocolate amargo", tone: "#4a2e23" },
  { id: "vainilla", name: "Vainilla", tone: "#f3e7c9" },
  { id: "frutilla", name: "Frutilla a la crema", tone: "#e8547a" },
  { id: "limon", name: "Limón", tone: "#e9e257" },
  { id: "pistacho", name: "Pistacho", tone: "#a9c57c" },
  { id: "maracuya", name: "Maracuyá", tone: "#f2a93b" },
  { id: "menta-granizada", name: "Menta granizada", tone: "#7fcbb0" },
];

export type Size = {
  id: string;
  label: string;
  format: string;
  maxFlavors: number;
  price: number;
};

export const SIZES: Size[] = [
  { id: "cucurucho", label: "Cucurucho", format: "1 gusto, en cono", maxFlavors: 1, price: 3200 },
  { id: "vasito", label: "Vasito", format: "hasta 2 gustos", maxFlavors: 2, price: 3800 },
  { id: "cuarto", label: "1/4 kg", format: "hasta 2 gustos", maxFlavors: 2, price: 6500 },
  { id: "medio", label: "1/2 kg", format: "hasta 3 gustos", maxFlavors: 3, price: 11500 },
  { id: "kilo", label: "1 kg", format: "hasta 4 gustos", maxFlavors: 4, price: 20500 },
];

export function formatPrice(pesos: number): string {
  return pesos.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

// ponytail: smallest check that fails if the flavor cap logic breaks.
export function canAddFlavor(selected: string[], size: Size | null): boolean {
  if (!size) return false;
  return selected.length < size.maxFlavors;
}

if (process.env.NODE_ENV === "test") {
  const small = SIZES[0];
  console.assert(canAddFlavor([], small) === true, "should allow first flavor");
  console.assert(canAddFlavor(["dulce-de-leche"], small) === false, "should cap at maxFlavors");
}
