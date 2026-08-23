// Categorías y variedades típicas de una pizzería de barrio en Corrientes.
// Sin precios: no hay dato real de precio para Sabor Costanera, y no se inventa uno.
export type MenuItem = {
  id: string;
  name: string;
  note: string;
};

export type MenuGroup = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const MENU: MenuGroup[] = [
  {
    id: "clasicas",
    label: "Clásicas",
    items: [
      { id: "muzzarella", name: "Muzzarella", note: "La de siempre, bien de horno de barro" },
      { id: "napolitana", name: "Napolitana", note: "Con rodajas de tomate y ajo" },
      { id: "fugazzeta", name: "Fugazzeta", note: "Doble cebolla, doble queso" },
      { id: "especial", name: "Especial de la casa", note: "Jamón, morrones y aceitunas" },
    ],
  },
  {
    id: "para-picar",
    label: "Para picar",
    items: [
      { id: "faina", name: "Fainá", note: "Porción, para acompañar la pizza" },
      { id: "empanadas", name: "Empanadas", note: "Docena, fritas o al horno" },
    ],
  },
  {
    id: "para-tomar",
    label: "Para tomar",
    items: [
      { id: "gaseosa", name: "Gaseosa línea Coca-Cola", note: "1.5 litros" },
      { id: "cerveza", name: "Cerveza", note: "Botella 1 litro" },
    ],
  },
];
