import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { HoursSection } from "./HoursSection";
import { ReputationSection } from "./ReputationSection";
import { InstagramSection } from "./InstagramSection";
import { ContactSection } from "./ContactSection";
import { SiteFooter } from "./SiteFooter";
import MembershipSection from "./MembershipSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HoursSection />
        <ReputationSection />
        <InstagramSection />
        <MembershipSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
