import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { Benefits } from "@/components/Benefits";
import { OrderFlow } from "@/components/OrderFlow";
import { LocationBand } from "@/components/LocationBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsStrip />
        <Benefits />
        <OrderFlow />
        <LocationBand />
      </main>
      <Footer />
    </>
  );
}
