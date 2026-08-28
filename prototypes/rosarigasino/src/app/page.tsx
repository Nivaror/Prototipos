import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import InfoBand from "@/components/InfoBand";
import Agenda from "@/components/Agenda";
import ReservationSection from "@/components/ReservationSection";
import Reputation from "@/components/Reputation";
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
        <ReservationSection />
        <Reputation />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
