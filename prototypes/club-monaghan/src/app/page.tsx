import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ReservationSection } from "@/components/ReservationSection";
import { MenuTeaser } from "@/components/MenuTeaser";
import { HoursLocation } from "@/components/HoursLocation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ReservationSection />
        <MenuTeaser />
        <HoursLocation />
      </main>
      <Footer />
    </>
  );
}
