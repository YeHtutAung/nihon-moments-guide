import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Filter, Star, MapPin, GraduationCap, Award } from "lucide-react";
import { Student } from "@/data/students";
import { getStudentsFromStorage } from "@/utils/student-management";

interface StudentsSectionProps {
  showFilters?: boolean;
  maxStudents?: number;
  showTestimonials?: boolean;
}

export const StudentsSection = ({ 
  showFilters = true, 
  maxStudents = 6, 
  showTestimonials = true 
}: StudentsSectionProps) => {
  const { t } = useTranslation();
  const [selectedUniversity, setSelectedUniversity] = useState<string>("all");
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  // Get students from storage
  const students = useMemo(() => getStudentsFromStorage(), []);

  // Get unique values for filters
  const universities = useMemo(() => 
    [...new Set(students.map(student => student.university))].sort(), 
    [students]
  );
  
  const programs = useMemo(() => 
    [...new Set(students.map(student => student.program))].sort(), 
    [students]
  );
  
  const years = useMemo(() => 
    [...new Set(students.map(student => student.year))].sort().reverse(), 
    [students]
  );
  
  const countries = useMemo(() => 
    [...new Set(students.map(student => student.country))].sort(), 
    [students]
  );

  // Filter students based on selected criteria
  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (selectedUniversity !== "all") {
      filtered = filtered.filter(student => student.university === selectedUniversity);
    }
    if (selectedProgram !== "all") {
      filtered = filtered.filter(student => student.program === selectedProgram);
    }
    if (selectedYear !== "all") {
      filtered = filtered.filter(student => student.year === selectedYear);
    }
    if (selectedCountry !== "all") {
      filtered = filtered.filter(student => student.country === selectedCountry);
    }

    return filtered.slice(0, maxStudents);
  }, [students, selectedUniversity, selectedProgram, selectedYear, selectedCountry, maxStudents]);

  const resetFilters = () => {
    setSelectedUniversity("all");
    setSelectedProgram("all");
    setSelectedYear("all");
    setSelectedCountry("all");
  };

  const StudentCard = ({ student }: { student: Student }) => {
    const [imageError, setImageError] = useState(false);
    const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
    
    return (
      <Card className="border-0 shadow-soft bg-gradient-cherry overflow-hidden group hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={imageError ? defaultImage : (student.image || defaultImage)} 
            alt={`${student.name} - ${student.university} student`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 text-primary text-xs">
              {student.year}
            </Badge>
          </div>
        </div>
      <CardContent className="p-4">
        <h4 className="font-semibold text-mountain-gray text-center mb-1">
          {student.name}
        </h4>
        <div className="flex items-center justify-center text-sm text-muted-foreground mb-1">
          <GraduationCap className="w-3 h-3 mr-1" />
          {student.university}
        </div>
        <p className="text-xs text-muted-foreground text-center mb-2">
          {student.program}
        </p>
        <div className="flex items-center justify-center text-xs text-muted-foreground">
          <MapPin className="w-3 h-3 mr-1" />
          {student.country}
        </div>
        {student.achievements && student.achievements.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1 justify-center">
            {student.achievements.slice(0, 2).map((achievement, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Award className="w-2 h-2 mr-1" />
                {achievement}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    );
  };

  const StudentDetailDialog = ({ student }: { student: Student }) => {
    const [imageError, setImageError] = useState(false);
    const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='Arial' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full h-auto p-0">
            <StudentCard student={student} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-mountain-gray">
              {student.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={imageError ? defaultImage : (student.image || defaultImage)} 
                alt={student.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={() => setImageError(true)}
              />
            </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-mountain-gray mb-2">Academic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">University:</span>
                  <span className="ml-2">{student.university}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">Program:</span>
                  <span className="ml-2">{student.program}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">Country:</span>
                  <span className="ml-2">{student.country}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-primary" />
                  <span className="font-medium">Year:</span>
                  <span className="ml-2">{student.year}</span>
                </div>
              </div>
            </div>
            
            {student.achievements && student.achievements.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg text-mountain-gray mb-2">Achievements</h3>
                <div className="space-y-1">
                  {student.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Award className="w-3 h-3 mr-2 text-primary" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {student.testimonial && (
              <div>
                <h3 className="font-semibold text-lg text-mountain-gray mb-2">Testimonial</h3>
                <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                  "{student.testimonial}"
                </blockquote>
              </div>
            )}
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

      {/* Filters */}
      {showFilters && (
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-mountain-gray">
              {t('support.students.filterBy')}:
            </span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t('support.students.university')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map(university => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t('support.students.program')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map(program => (
                  <SelectItem key={program} value={program}>
                    {program}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder={t('support.students.year')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder={t('support.students.country')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Students Carousel */}
      {filteredStudents.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filteredStudents.map((student, index) => (
              <CarouselItem key={student.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <StudentDetailDialog student={student} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white/90 hover:bg-white shadow-soft" />
          <CarouselNext className="right-0 bg-white/90 hover:bg-white shadow-soft" />
        </Carousel>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No students found with the selected criteria. Try adjusting your filters.
          </p>
          <Button onClick={resetFilters} className="mt-4">
            Reset Filters
          </Button>
        </div>
      )}

      {/* Show All Students Button */}
      {maxStudents < students.length && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            {t('support.students.viewAll')}
          </Button>
        </div>
      )}
    </div>
  );
};
