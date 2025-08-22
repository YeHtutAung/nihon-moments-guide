import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to Start Your
          <span className="block text-cherry-blossom">Japanese Adventure?</span>
        </h2>
        
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
          Don't let your dreams of studying in Japan remain just dreams. 
          Connect with Nihon Moments today and take the first step toward your brighter future.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero-white" size="lg" className="text-lg px-8 py-6 group">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline-white" size="lg" className="text-lg px-8 py-6">
            Schedule Consultation
          </Button>
        </div>
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-center opacity-90">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-cherry-blossom" />
            <span>+81 (0) 123-456-7890</span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-cherry-blossom" />
            <span>hello@nihonmoments.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};