import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ReservationStack } from "@/components/ReservationStack";
import { Reputation } from "@/components/Reputation";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Nav />
      <main>
        <Hero />
        <ReservationStack />
        <Reputation />
        <AccessibilityPanel />
      </main>
      <Footer />
    </>
  );
}
