import { HeroSection } from "@/components/ui/hero-section";
import { ServicesSection } from "@/components/ui/services-section";
import { SupportSection } from "@/components/ui/support-section";
import { WhyChooseSection } from "@/components/ui/why-choose-section";
import { CTASection } from "@/components/ui/cta-section";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <SupportSection />
      <WhyChooseSection />
      <CTASection />
    </main>
  );
};

export default Index;