import { Hero } from "@/components/home/hero";
import { FeaturedSets } from "@/components/home/featured-sets";
import { HowItWorks } from "@/components/home/how-it-works";
import { AboutBlock } from "@/components/home/about-block";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSets />
      <HowItWorks />
      <AboutBlock />
    </>
  );
}
