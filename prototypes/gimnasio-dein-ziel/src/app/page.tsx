import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { AccessibilitySection } from "./AccessibilitySection";
import { ClassesSection } from "./ClassesSection";
import { TrialSection } from "./TrialSection";
import { SiteFooter } from "./SiteFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <AccessibilitySection />
        <ClassesSection />
        <TrialSection />
      </main>
      <SiteFooter />
    </>
  );
}
