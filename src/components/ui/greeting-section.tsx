import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Quote, Star, Target, Heart } from "lucide-react";

export const GreetingSection = () => {
  const { t } = useTranslation();

  const visionMissionPoints = [
    {
      icon: Star,
      title: t('greeting.vision.title'),
      description: t('greeting.vision.description')
    },
    {
      icon: Target,
      title: t('greeting.mission.title'),
      description: t('greeting.mission.description')
    },
    {
      icon: Heart,
      title: t('greeting.values.title'),
      description: t('greeting.values.description')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-soft-pink/20 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* CEO Photo and Info */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-6">
              <div className="w-48 h-48 mx-auto lg:mx-0 rounded-full overflow-hidden border-4 border-primary/20 shadow-elegant">
                <img
                  src="/ceo-photo.svg"
                  alt={t('greeting.ceo.name')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-mountain-gray mb-2">
                {t('greeting.ceo.name')}
              </h3>
              <p className="text-lg text-primary font-semibold mb-1">
                {t('greeting.ceo.title')}
              </p>
              <p className="text-muted-foreground">
                {t('greeting.ceo.company')}
              </p>
            </div>

            {/* CEO Signature */}
            <div className="text-right">
              <div className="text-3xl font-serif text-primary mb-2">
                {t('greeting.ceo.signature')}
              </div>
              <div className="w-24 h-0.5 bg-primary mx-auto lg:ml-auto"></div>
            </div>
          </div>

          {/* Greeting Message */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6 leading-tight">
                {t('greeting.title')}
              </h2>
              <div className="text-xl text-muted-foreground leading-relaxed space-y-4">
                <p>{t('greeting.message.paragraph1')}</p>
                <p>{t('greeting.message.paragraph2')}</p>
                <p>{t('greeting.message.paragraph3')}</p>
              </div>
            </div>

            {/* Vision, Mission, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visionMissionPoints.map((point, index) => (
                <Card key={index} className="border-0 shadow-soft bg-white/80 hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <point.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-mountain-gray mb-2">
                      {point.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
