import { lazy, Suspense } from "react";
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { GreetingSection } from "@/components/ui/greeting-section";
import { ServicesSection } from "@/components/ui/services-section";
import { IntakeSection } from "@/components/ui/intake-section";
import { SupportSection } from "@/components/ui/support-section";
import { WhyChooseSection } from "@/components/ui/why-choose-section";
import { CTASection } from "@/components/ui/cta-section";
import { useLanguageEffect } from "@/hooks/use-language-effect";

const StatisticsSection = lazy(() =>
  import("@/components/ui/statistics-section").then((m) => ({ default: m.StatisticsSection }))
);

const Index = () => {
  useLanguageEffect();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <HeroSection />
        <GreetingSection />
        <ServicesSection />
        <IntakeSection />
        <SupportSection />
        <WhyChooseSection />
        <Suspense fallback={<div className="py-16" />}>
          <StatisticsSection />
        </Suspense>
        <CTASection />
      </main>
    </>
  );
};

export default Index;
