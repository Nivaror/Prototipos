import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import UrgencyBento from "@/components/UrgencyBento";
import TurnoSection from "@/components/TurnoSection";
import AboutOverlap from "@/components/AboutOverlap";
import HoursLocation from "@/components/HoursLocation";
import ClosingCta from "@/components/ClosingCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <UrgencyBento />
        <TurnoSection />
        <AboutOverlap />
        <HoursLocation />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
