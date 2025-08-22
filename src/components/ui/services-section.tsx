import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { FileText, Award, MessageSquare } from "lucide-react";

export const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: FileText,
      title: t('services.applicationGuidance.title'),
      description: t('services.applicationGuidance.description')
    },
    {
      icon: Award,
      title: t('services.coe.title'),
      description: t('services.coe.description')
    },
    {
      icon: MessageSquare,
      title: t('services.interviewPrep.title'),
      description: t('services.interviewPrep.description')
    }
  ];

  return (
    <section className="py-20 bg-gradient-mountain">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
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