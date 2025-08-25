import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Star, Target, Heart } from "lucide-react";
import { getCEOFromStorage } from "@/utils/ceo-management";

export const GreetingSection = () => {
  const { t } = useTranslation();
  const ceo = getCEOFromStorage();

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
          {/* CEO Photo and Info - Student Section Style */}
          <div className="text-center lg:text-left">
            <div className="w-32 h-32 mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-soft mb-4">
              <img
                src={ceo.image}
                alt={`${ceo.name} - ${ceo.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-mountain-gray text-center lg:text-left mb-1">
                {ceo.name}
              </h3>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                {ceo.title}
              </p>
              <p className="text-xs text-muted-foreground text-center lg:text-left">
                {ceo.company}
              </p>
            </div>
          </div>

          {/* Greeting Message - Dynamic from CEO Data */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-mountain-gray mb-4 leading-tight">
                {t('greeting.title')}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-3">
                <p>{ceo.message.greeting}</p>
                <p>{ceo.message.vision}</p>
                <p>{ceo.message.commitment}</p>
              </div>
            </div>

            {/* Vision, Mission, Values - Compact Cards */}
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
