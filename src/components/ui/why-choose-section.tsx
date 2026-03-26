import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CheckCircle, Star, MapPin, Users2 } from "lucide-react";

export const WhyChooseSection = () => {
  const { t } = useTranslation();

  const whyChooseFeatures = [
    {
      icon: Star,
      title: t('whyChoose.expertise.title'),
      description: t('whyChoose.expertise.description')
    },
    {
      icon: CheckCircle,
      title: t('whyChoose.success.title'),
      description: t('whyChoose.success.description')
    },
    {
      icon: MapPin,
      title: t('whyChoose.partnerships.title'),
      description: t('whyChoose.partnerships.description')
    },
    {
      icon: Users2,
      title: t('whyChoose.community.title'),
      description: t('whyChoose.community.description')
    }
  ];

  return (
    <section className="py-20 bg-soft-pink/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            {t('whyChoose.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('whyChoose.subtitle')}
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
            <div className="text-muted-foreground">{t('whyChoose.stats.studentsSupported')}</div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">{t('whyChoose.stats.successRate')}</div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-soft">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">{t('whyChoose.stats.partnerInstitutions')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
