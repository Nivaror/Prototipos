import Nav from "./Nav";
import Hero from "./Hero";
import IdentitySection from "./IdentitySection";
import HoursSection from "./HoursSection";
import Reputation from "./Reputation";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IdentitySection />
        <HoursSection />
        <Reputation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
