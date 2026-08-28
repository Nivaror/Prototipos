import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ReservationWindows from "@/components/ReservationWindows";
import Ambiance from "@/components/Ambiance";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ReservationWindows />
        <Ambiance />
      </main>
      <Footer />
    </>
  );
}
