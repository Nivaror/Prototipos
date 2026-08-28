import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FactsBar from "@/components/FactsBar";
import BookingFlow from "@/components/BookingFlow";
import ComedorPrivado from "@/components/ComedorPrivado";
import Nosotros from "@/components/Nosotros";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <FactsBar />
        <BookingFlow />
        <ComedorPrivado />
        <Nosotros />
      </main>
      <Footer />
    </>
  );
}
