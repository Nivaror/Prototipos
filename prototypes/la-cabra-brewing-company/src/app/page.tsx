import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HorarioGrid from "@/components/HorarioGrid";
import Reservas from "@/components/Reservas";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HorarioGrid />
        <Reservas />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
