import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { ServicesSection } from "@/components/ui/services-section";
import { SupportSection } from "@/components/ui/support-section";
import { WhyChooseSection } from "@/components/ui/why-choose-section";
import { CTASection } from "@/components/ui/cta-section";
import { useLanguageEffect } from "@/hooks/use-language-effect";

const Index = () => {
  useLanguageEffect();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <HeroSection />
        <ServicesSection />
        <SupportSection />
        <WhyChooseSection />
        <CTASection />
      </main>
    </>
  );
};

export default Index;