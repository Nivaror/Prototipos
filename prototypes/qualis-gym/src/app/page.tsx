import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { HoursSection } from "./HoursSection";
import { ReputationSection } from "./ReputationSection";
import { InstagramSection } from "./InstagramSection";
import { ContactSection } from "./ContactSection";
import { SiteFooter } from "./SiteFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HoursSection />
        <ReputationSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
