import { DemoBanner } from "@/components/DemoBanner";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { Reservation } from "@/components/Reservation";
import { Reputation } from "@/components/Reputation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <Nav />
      <main>
        <Hero />
        <WeeklySchedule />
        <Reservation />
        <Reputation />
      </main>
      <Footer />
    </>
  );
}
