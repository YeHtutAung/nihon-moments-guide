import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Heart, Globe } from "lucide-react";

const supportFeatures = [
  {
    icon: Users,
    title: "Personalized Attention",
    description: "Every student receives individual attention tailored to their unique goals and circumstances. Our dedicated counselors work closely with you to create a personalized roadmap to success."
  },
  {
    icon: Heart,
    title: "Success Stories",
    description: "Join hundreds of successful students who have achieved their dreams through our guidance. Their stories inspire us and prove that with the right support, anything is possible."
  },
  {
    icon: Globe,
    title: "Strong Local Network",
    description: "Our established partnerships with Japanese institutions and local contacts ensure you have support even before you arrive in Japan. You're never alone in this journey."
  }
];

export const SupportSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            Personalized Support & 
            <span className="text-primary block">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Nihon Moments, we believe every student deserves dedicated support and guidance. 
            Our student-focused approach and welcoming community ensure you feel supported every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {supportFeatures.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-soft bg-gradient-cherry">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-mountain-gray">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-mountain-gray/80">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Testimonial */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-soft border border-border/50">
          <div className="text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-mountain-gray mb-6 italic leading-relaxed">
              "Nihon Moments didn't just help me with paperwork – they helped me build my future. 
              The personalized guidance and constant support made all the difference."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-cherry rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">Y.S.</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-mountain-gray">Yuki Sato</p>
                <p className="text-muted-foreground">Tokyo University Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};