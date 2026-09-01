import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Disciplines from "@/components/Disciplines";
import Philosophy from "@/components/Philosophy";
import Plans from "@/components/Plans";
import HoursLocation from "@/components/HoursLocation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Disciplines />
        <Philosophy />
        <Plans />
        <HoursLocation />
      </main>
      <Footer />
    </>
  );
}
