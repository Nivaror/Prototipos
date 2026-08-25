import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Plans } from "@/components/Plans";
import { Amenities } from "@/components/Amenities";
import { HoursLocation } from "@/components/HoursLocation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Plans />
        <Amenities />
        <HoursLocation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
