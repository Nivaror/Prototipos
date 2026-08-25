import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Menu } from "@/components/Menu";
import { QuickOrder } from "@/components/QuickOrder";
import { HoursLocation } from "@/components/HoursLocation";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <Menu />
        <QuickOrder />
        <HoursLocation />
      </main>
      <Footer />
    </>
  );
}
