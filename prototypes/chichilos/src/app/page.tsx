import { DemoBanner } from "@/components/DemoBanner";
import { Hero } from "@/components/Hero";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <main>
        <Hero />
        <WeeklySchedule />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
