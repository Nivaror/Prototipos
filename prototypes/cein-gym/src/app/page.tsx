import Nav from "./Nav";
import Hero from "./Hero";
import HoursSection from "./HoursSection";
import Services from "./Services";
import Reputation from "./Reputation";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HoursSection />
        <Services />
        <Reputation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
