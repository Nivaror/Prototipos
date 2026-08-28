import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import InfoBand from "@/components/InfoBand";
import Agenda from "@/components/Agenda";
import Reservas from "@/components/Reservas";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InfoBand />
        <Agenda />
        <Reservas />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
