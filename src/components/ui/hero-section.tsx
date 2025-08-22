import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-japan.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 animate-fade-up">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your Journey to
          <span className="block text-cherry-blossom">Japan Begins Here</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
          Nihon Moments is your trusted partner in making your dream of studying in Japan a reality. 
          We guide you through every step of the journey, from application to arrival, with personalized 
          support and expert guidance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Start Your Journey
          </Button>
          <Button variant="outline-white" size="lg" className="text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="w-4 h-4 bg-cherry-blossom rounded-full"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <div className="w-6 h-6 bg-soft-pink rounded-full"></div>
      </div>
      <div className="absolute top-1/2 left-1/4 animate-float opacity-25" style={{ animationDelay: '4s' }}>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </section>
  );
};