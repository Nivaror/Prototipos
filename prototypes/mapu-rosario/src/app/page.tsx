import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import BookingFlow from "@/components/BookingFlow";
import Ambiente from "@/components/Ambiente";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Highlights />
        <BookingFlow />
        <Ambiente />
      </main>
      <Footer />
    </>
  );
}
