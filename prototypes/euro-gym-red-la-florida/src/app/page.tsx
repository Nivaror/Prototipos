import Nav from "./Nav";
import Hero from "./Hero";
import HoursSpotlight from "./HoursSpotlight";
import Offerings from "./Offerings";
import Reputation from "./Reputation";
import Contact from "./Contact";
import Footer from "./Footer";
import MembershipSection from "./MembershipSection";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HoursSpotlight />
      <Offerings />
      <Reputation />
      <MembershipSection />
      <Contact />
      <Footer />
    </>
  );
}
