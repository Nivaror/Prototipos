import Image from "next/image";
import { Coffee, Leaf, Wine } from "@phosphor-icons/react/dist/ssr";
import cartaDetail from "../../public/images/carta-detail.jpg";

const COLUMNS = [
  {
    key: "cafe",
    title: "Café",
    icon: Coffee,
    items: ["Café de especialidad", "Cappuccino", "Cold brew"],
  },
  {
    key: "te",
    title: "Té",
    icon: Leaf,
    items: ["Té verde", "Té negro con especias", "Infusión de manzanilla"],
  },
  {
    key: "vino",
    title: "Vino",
    icon: Wine,
    items: [
      "Copa de tinto de la casa",
      "Copa de blanco",
      "Selección de vinos regionales",
    ],
  },
] as const;

export default function Carta() {
  return (
    <section className="section carta" id="carta">
      <div className="wrap">
        <div className="section-head">
          <h2>Lo que más se repite en las reseñas</h2>
          <p>
            Café, té y vino aparecen una y otra vez en los comentarios de
            Cuervo Blanco. Hoy esa carta solo se ve scrolleando Instagram.
          </p>
        </div>
        <div className="carta__grid">
          <div className="carta__image">
            <Image
              src={cartaDetail}
              alt="Mesa servida en Cuervo Blanco"
              fill
              sizes="(max-width: 900px) 100vw, 25vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {COLUMNS.map(({ key, title, icon: Icon, items }) => (
            <div className="carta__col" key={key}>
              <div className="carta__col-head">
                <Icon size={20} weight="regular" />
                <h3>{title}</h3>
              </div>
              <ul className="carta__items">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
