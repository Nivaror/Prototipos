import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { Reservation } from "@/components/Reservation";
import { Catering } from "@/components/Catering";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoStrip />
      <Reservation />
      <Catering />
      <Footer />
    </>
  );
}
