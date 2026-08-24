import { DemoBanner } from "@/components/DemoBanner";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { Services } from "@/components/Services";
import { BookingFlow } from "@/components/BookingFlow";
import { SocialProof } from "@/components/SocialProof";
import { LocationHours } from "@/components/LocationHours";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <SiteNav />
      <main>
        <Hero />
        <InfoStrip />
        <Services />
        <BookingFlow />
        <SocialProof />
        <LocationHours />
      </main>
      <SiteFooter />
    </>
  );
}
