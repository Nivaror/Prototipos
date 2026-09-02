import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Offerings from "@/components/Offerings";
import EventsSpotlight from "@/components/EventsSpotlight";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Offerings />
        <EventsSpotlight />
      </main>
      <Footer />
    </>
  );
}
