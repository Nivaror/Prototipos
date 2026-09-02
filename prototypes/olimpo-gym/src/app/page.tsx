import Nav from "./Nav";
import Hero from "./Hero";
import Services from "./Services";
import HoursSection from "./HoursSection";
import Reputation from "./Reputation";
import ContactBar from "./ContactBar";
import Footer from "./Footer";
import MembershipSection from "./MembershipSection";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <HoursSection />
      <Reputation />
      <MembershipSection />
      <ContactBar />
      <Footer />
    </>
  );
}
