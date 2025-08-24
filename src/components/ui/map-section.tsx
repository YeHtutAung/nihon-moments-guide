import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  MapPin, 
  Search, 
  Filter, 
  ExternalLink, 
  Phone, 
  Mail, 
  GraduationCap,
  Building,
  Globe,
  X
} from "lucide-react";
import { getSchoolsFromStorage } from "@/utils/school-management";
import { School } from "@/data/schools";

// Google Maps component (will be implemented with actual Google Maps API)
const GoogleMap = ({ schools, onMarkerClick }: { 
  schools: School[], 
  onMarkerClick: (school: School) => void 
}) => {
  // This is a placeholder - in a real implementation, you would use @react-google-maps/api
  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Tokyo Schools Map</h3>
        <p className="text-blue-600 mb-4">
          {schools.length} schools in Tokyo
        </p>
        <div className="space-y-2">
          {schools.slice(0, 3).map((school) => (
            <div 
              key={school.id}
              className="bg-white p-3 rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onMarkerClick(school)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="font-medium text-sm">{school.name}</span>
              </div>
            </div>
          ))}
          {schools.length > 3 && (
            <div className="text-blue-600 text-sm">
              +{schools.length - 3} more schools
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// School detail dialog component
const SchoolDetailDialog = ({ school }: { school: School }) => {
  const IconComponent = school.icon;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full h-auto p-0">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <IconComponent className="w-4 h-4 text-primary" />
              <span className="font-semibold">{school.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{school.japaneseName}</p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <IconComponent className="w-5 h-5 text-primary" />
            {school.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg">{school.japaneseName}</h4>
            <p className="text-muted-foreground">{school.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Location</h5>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>{school.address}</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-2">Contact</h5>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{school.email}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-semibold mb-2">Programs</h5>
            <div className="flex flex-wrap gap-1">
              {school.programs.map((program, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {program}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={school.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface MapSectionProps {
  showFilters?: boolean;
  showSearch?: boolean;
  maxSchools?: number;
}

export const MapSection = ({
  showFilters = true,
  showSearch = true,
  maxSchools = 6
}: MapSectionProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // Get schools from storage
  const allSchools = useMemo(() => getSchoolsFromStorage(), []);
  
  // Filter schools based on search and type
  const filteredSchools = useMemo(() => {
    let filtered = allSchools.filter(school => school.isActive);
    
    if (selectedType !== "all") {
      filtered = filtered.filter(school => school.type === selectedType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(school =>
        school.name.toLowerCase().includes(query) ||
        school.japaneseName.toLowerCase().includes(query) ||
        school.address.toLowerCase().includes(query) ||
        school.programs.some(program => program.toLowerCase().includes(query))
      );
    }
    
    return filtered.slice(0, maxSchools);
  }, [allSchools, searchQuery, selectedType, maxSchools]);

  const handleMarkerClick = (school: School) => {
    setSelectedSchool(school);
  };

  const schoolTypes = [
    { value: "all", label: "All Schools" },
    { value: "university", label: "Universities" },
    { value: "language-school", label: "Language Schools" },
    { value: "college", label: "Colleges" }
  ];

  return (
    <section className="py-20 bg-gradient-mountain">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-mountain-gray mb-6">
            {t('map.title', 'Tokyo Schools Map')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('map.subtitle', 'Explore top universities and schools in Tokyo. Find the perfect institution for your academic journey in Japan.')}
          </p>
        </div>

        {/* Filters and Search */}
        {(showFilters || showSearch) && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {showSearch && (
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder={t('map.searchPlaceholder', 'Search schools, programs, or locations...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
              
              {showFilters && (
                <div className="md:w-48">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {schoolTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            {searchQuery && (
              <div className="text-sm text-muted-foreground">
                Found {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t('map.mapTitle', 'Interactive Tokyo Map')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleMap 
                  schools={filteredSchools} 
                  onMarkerClick={handleMarkerClick} 
                />
              </CardContent>
            </Card>
          </div>

          {/* School List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-mountain-gray">
              {t('map.schoolsList', 'Featured Schools')}
            </h3>
            
            <div className="space-y-3">
              {filteredSchools.map((school) => (
                <Card key={school.id} className="border-0 shadow-soft bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <SchoolDetailDialog school={school} />
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {school.type === 'university' ? 'University' : 
                         school.type === 'language-school' ? 'Language School' : 'College'}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{school.programs.length} programs</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredSchools.length === 0 && (
              <Card className="border-0 shadow-soft bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    {searchQuery 
                      ? `No schools found matching "${searchQuery}"`
                      : 'No schools available'
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
