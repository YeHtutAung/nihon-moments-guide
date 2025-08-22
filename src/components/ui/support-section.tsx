import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from "react-i18next";
import { Users, Heart, Globe } from "lucide-react";
import student1 from "@/assets/students/student-1.jpg";
import student2 from "@/assets/students/student-2.jpg";
import student3 from "@/assets/students/student-3.jpg";
import student4 from "@/assets/students/student-4.jpg";
import student5 from "@/assets/students/student-5.jpg";
import student6 from "@/assets/students/student-6.jpg";

export const SupportSection = () => {
  const { t } = useTranslation();

  const supportFeatures = [
    {
      icon: Users,
      title: t('support.personalized.title'),
      description: t('support.personalized.description')
    },
    {
      icon: Heart,
      title: t('support.proven.title'),
      description: t('support.proven.description')
    },
    {
      icon: Globe,
      title: "Strong Local Network",
      description: "Our established partnerships with Japanese institutions and local contacts ensure you have support even before you arrive in Japan. You're never alone in this journey."
    }
  ];

  const successfulStudents = [
    {
      image: student1,
      name: "Sakura Tanaka",
      university: "Tokyo University",
      program: "Computer Science"
    },
    {
      image: student2,
      name: "Michael Chen",
      university: "Waseda University",
      program: "International Relations"
    },
    {
      image: student3,
      name: "Emily Rodriguez",
      university: "Keio University",
      program: "Business Administration"
    },
    {
      image: student4,
      name: "David Kim",
      university: "Osaka University",
      program: "Engineering"
    },
    {
      image: student5,
      name: "Anna Sato",
      university: "Kyoto University",
      program: "Cultural Studies"
    },
    {
      image: student6,
      name: "James Wilson",
      university: "Sophia University",
      program: "Japanese Literature"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            {t('support.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('support.subtitle')}
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
        
        {/* Success Stories Gallery */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-mountain-gray mb-4">
              Meet Our <span className="text-primary">Successful Students</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              COE approved students now studying at top Japanese universities
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {successfulStudents.map((student, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <Card className="border-0 shadow-soft bg-gradient-cherry overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={student.image} 
                          alt={`${student.name} - ${student.university} student`}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-mountain-gray text-center mb-1">
                          {student.name}
                        </h4>
                        <p className="text-sm text-muted-foreground text-center mb-1">
                          {student.university}
                        </p>
                        <p className="text-xs text-muted-foreground text-center">
                          {student.program}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/90 hover:bg-white shadow-soft" />
            <CarouselNext className="right-0 bg-white/90 hover:bg-white shadow-soft" />
          </Carousel>
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