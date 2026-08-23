import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { PathSelector } from "./PathSelector";
import { RestaurantSection } from "./RestaurantSection";
import { CateringSection } from "./CateringSection";
import { SiteFooter } from "./SiteFooter";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <PathSelector />
      <RestaurantSection />
      <CateringSection />
      <SiteFooter />
    </>
  );
}
