import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Calendar, BookOpen, Clock, Award } from "lucide-react";

export const IntakeSection = () => {
  const { t } = useTranslation();

  const intakes = [
    {
      monthKey: "january",
      japaneseMonth: "1月",
      jlptRequirement: "N3",
      icon: Calendar,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      monthKey: "april",
      japaneseMonth: "4月",
      jlptRequirement: "N5",
      icon: BookOpen,
      color: "bg-green-500",
      textColor: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      monthKey: "july",
      japaneseMonth: "7月",
      jlptRequirement: "N5",
      icon: Clock,
      color: "bg-orange-500",
      textColor: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      monthKey: "october",
      japaneseMonth: "10月",
      jlptRequirement: "N5",
      icon: Award,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            {t('intake.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('intake.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {intakes.map((intake, index) => (
            <Card
              key={index}
              className={`group border-2 ${intake.borderColor} shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2`}
            >
              <CardHeader className={`${intake.bgColor} text-center pb-4`}>
                <div className={`w-16 h-16 ${intake.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <intake.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-mountain-gray mb-2">
                  {t(`intake.months.${intake.monthKey}`)}
                </CardTitle>
                <div className="text-lg text-muted-foreground mb-2">
                  {intake.japaneseMonth}
                </div>
                <Badge
                  variant="secondary"
                  className={`${intake.textColor} ${intake.bgColor} border ${intake.borderColor} px-4 py-2 text-sm font-semibold`}
                >
                  {t('intake.jlptRequired', { level: intake.jlptRequirement })}
                </Badge>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center leading-relaxed">
                  {t(`intake.${intake.monthKey}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-mountain-gray mb-4">
                {t('intake.requirements.title')}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    <strong className="text-mountain-gray">{t('intake.requirements.januaryIntake')}:</strong> {t('intake.requirements.january')}
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">
                    <strong className="text-mountain-gray">{t('intake.requirements.otherIntakes')}:</strong> {t('intake.requirements.other')}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-mountain-gray mb-4">
                {t('intake.timeline.title')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('intake.timeline.application')}</span>
                  <span className="text-sm font-medium text-primary">{t('intake.timeline.applicationDuration')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('intake.timeline.coe')}</span>
                  <span className="text-sm font-medium text-primary">{t('intake.timeline.coeDuration')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('intake.timeline.visa')}</span>
                  <span className="text-sm font-medium text-primary">{t('intake.timeline.visaDuration')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
