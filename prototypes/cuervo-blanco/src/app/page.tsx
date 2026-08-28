import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HorarioStrip from "@/components/HorarioStrip";
import Carta from "@/components/Carta";
import Reservas from "@/components/Reservas";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HorarioStrip />
        <Carta />
        <Reservas />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
