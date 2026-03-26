import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Star, Target, Heart } from "lucide-react";
import { companyLeader } from "@/data/ceo";

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
    <section className="py-12 bg-gradient-to-br from-soft-pink/20 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* CEO Photo and Info */}
          <div className="text-center lg:text-left">
            <div className="w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-96 mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-soft mb-3 bg-gray-50 relative">
              <img
                src={companyLeader.image}
                alt={`${companyLeader.name} - ${t('greeting.ceoTitle')}`}
                className="absolute inset-0 w-full h-full object-cover object-[center_10%]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="mb-4 max-w-[16rem] mx-auto lg:mx-0">
              <h3 className="text-base font-semibold text-mountain-gray text-center lg:text-left mb-1">
                {companyLeader.name}
              </h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                {t('greeting.ceoTitle')}
              </p>
            </div>
          </div>

          {/* Greeting Message */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-mountain-gray mb-4 leading-tight">
                {t('greeting.title')}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-3">
                <p>{t('greeting.message.greeting')}</p>
                <p>{t('greeting.message.vision')}</p>
                <p>{t('greeting.message.commitment')}</p>
              </div>
            </div>

            {/* Vision, Mission, Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visionMissionPoints.map((point, index) => (
                <Card key={index} className="border-0 shadow-soft bg-white/80 hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <point.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="text-base font-semibold text-mountain-gray mb-2">
                      {point.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
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
