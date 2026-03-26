import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { MapPin, GraduationCap } from "lucide-react";
import { successStories, type SuccessStory } from "@/data/students";

export const StudentsSection = () => {
  const { t } = useTranslation();

  const StudentCard = ({ story }: { story: SuccessStory }) => {
    const [imageError, setImageError] = useState(false);
    const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";

    return (
      <Card className="border-0 shadow-soft bg-gradient-cherry overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={imageError ? defaultImage : (story.image || defaultImage)}
            alt={`${t(`${story.i18nKey}.name`)} - ${t(`${story.i18nKey}.university`)} student`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <CardContent className="p-4">
          <h4 className="font-semibold text-mountain-gray text-center mb-1">
            {t(`${story.i18nKey}.name`)}
          </h4>
          <div className="flex items-center justify-center text-sm text-muted-foreground mb-1">
            <GraduationCap className="w-3 h-3 mr-1" />
            {t(`${story.i18nKey}.university`)}
          </div>
          <p className="text-xs text-muted-foreground text-center mb-2">
            {t(`${story.i18nKey}.program`)}
          </p>
          <div className="flex items-center justify-center text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            {t(`${story.i18nKey}.country`)}
          </div>
        </CardContent>
      </Card>
    );
  };

  const StudentDetailDialog = ({ story }: { story: SuccessStory }) => {
    const [imageError, setImageError] = useState(false);
    const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full h-auto p-0">
            <StudentCard story={story} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-mountain-gray">
              {t(`${story.i18nKey}.name`)}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={imageError ? defaultImage : (story.image || defaultImage)}
                alt={t(`${story.i18nKey}.name`)}
                className="w-full h-64 object-cover rounded-lg"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-mountain-gray mb-2">{t('studentDetail.academicInfo')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{t('studentDetail.university')}:</span>
                    <span className="ml-2">{t(`${story.i18nKey}.university`)}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{t('studentDetail.program')}:</span>
                    <span className="ml-2">{t(`${story.i18nKey}.program`)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-medium">{t('studentDetail.country')}:</span>
                    <span className="ml-2">{t(`${story.i18nKey}.country`)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-mountain-gray mb-2">{t('studentDetail.testimonial')}</h3>
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                  "{t(`${story.i18nKey}.testimonial`)}"
                </blockquote>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-mountain-gray mb-4">
          {t('support.students.title')}
        </h3>
        <p className="text-lg text-muted-foreground">
          {t('support.students.subtitle')}
        </p>
      </div>

      {/* Students Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {successStories.map((story, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <StudentDetailDialog story={story} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white/90 hover:bg-white shadow-soft" />
        <CarouselNext className="right-0 bg-white/90 hover:bg-white shadow-soft" />
      </Carousel>
    </div>
  );
};
