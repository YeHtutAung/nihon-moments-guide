import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Star, MapPin, Users2 } from "lucide-react";

const whyChooseFeatures = [
  {
    icon: Star,
    title: "Personalized Attention",
    description: "Individual guidance tailored to your unique goals and dreams"
  },
  {
    icon: CheckCircle,
    title: "Proven Success Stories",
    description: "Hundreds of students successfully placed in top Japanese institutions"
  },
  {
    icon: MapPin,
    title: "Local Partnerships",
    description: "Strong network of contacts and partnerships throughout Japan"
  },
  {
    icon: Users2,
    title: "Welcoming Community",
    description: "Join a supportive community of fellow students and alumni"
  }
];

export const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-soft-pink/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            Why Choose Nihon Moments?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We don't just help with paperwork – we help students build their future. 
            Our unique approach combines expert guidance with genuine care for your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {whyChooseFeatures.map((feature, index) => (
            <Card key={index} className="group border-0 shadow-soft bg-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-mountain-gray mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Students Supported</div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Partner Institutions</div>
          </div>
        </div>
      </div>
    </section>
  );
};