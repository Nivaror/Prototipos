import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ReputationMarquee } from "@/components/ReputationMarquee";
import { MenuOrder } from "@/components/MenuOrder";
import { HoursBand } from "@/components/HoursBand";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Nav />
      <main>
        <Hero />
        <ReputationMarquee />
        <MenuOrder />
        <HoursBand />
      </main>
      <Footer />
    </>
  );
}
