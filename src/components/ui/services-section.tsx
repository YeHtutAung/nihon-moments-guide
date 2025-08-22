import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Award, MessageSquare } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Application Guidance",
    description: "Navigate the complex application process with our expert guidance. We help you prepare all necessary documents, meet deadlines, and present your best self to Japanese institutions."
  },
  {
    icon: Award,
    title: "Certificate of Eligibility (COE)",
    description: "We streamline the COE application process, handling all the paperwork and coordination with Japanese immigration authorities to ensure a smooth and successful application."
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description: "Build confidence with our comprehensive interview coaching. We provide mock interviews, cultural insights, and personalized feedback to help you excel in your admissions interviews."
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-mountain">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We make the process of studying in Japan smooth and stress-free, providing comprehensive 
            support at every stage of your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-mountain-gray">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};