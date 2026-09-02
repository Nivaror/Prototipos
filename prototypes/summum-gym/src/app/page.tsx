import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Reconciliation } from "./Reconciliation";
import { Reputation } from "./Reputation";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import MembershipSection from "./MembershipSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reconciliation />
        <Reputation />
        <MembershipSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
