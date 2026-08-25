import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WeeklySchedule } from "@/components/WeeklySchedule";
import { Programs } from "@/components/Programs";
import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WeeklySchedule />
        <Programs />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
