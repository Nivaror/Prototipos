import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HoursBoard from "@/components/HoursBoard";
import MenuOrder from "@/components/MenuOrder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HoursBoard />
        <MenuOrder />
      </main>
      <Footer />
    </>
  );
}
