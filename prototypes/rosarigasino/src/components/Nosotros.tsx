import { FacebookLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const FACEBOOK_URL = "https://facebook.com/Rosarigasino-269429860221134";

export default function Nosotros() {
  return (
    <section id="nosotros" className="nosotros">
      <div className="wrap nosotros__inner">
        <div>
          <h2 className="font-display">Un lugar con historia en Las Malvinas</h2>
          <p>
            Rosarigasino combina ambiente clásico, buena mesa y una agenda que no
            se detiene: cena todos los días, música en vivo los fines de semana y
            fútbol en pantalla los domingos. También ofrecen delivery, coordinado
            por Facebook.
          </p>
        </div>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary nosotros__cta"
        >
          <FacebookLogo size={20} weight="fill" />
          Ver Facebook
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
