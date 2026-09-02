import Nav from "./Nav";
import Hero from "./Hero";
import Reputation from "./Reputation";
import HoursSection from "./HoursSection";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Footer from "./Footer";
import MembershipSection from "./MembershipSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reputation />
        <HoursSection />
        <Gallery />
        <MembershipSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
