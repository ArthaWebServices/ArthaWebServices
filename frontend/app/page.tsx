import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { ProofBand } from "@/components/sections/ProofBand";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechStack />
      <Services />
      <ProofBand />
      <Work />
      <Process />
      <Team />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
