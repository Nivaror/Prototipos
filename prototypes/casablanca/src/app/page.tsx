import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuickFacts from "@/components/QuickFacts";
import Atmosphere from "@/components/Atmosphere";
import ReserveBanner from "@/components/ReserveBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <QuickFacts />
        <Atmosphere />
        <ReserveBanner />
      </main>
      <Footer />
    </>
  );
}
