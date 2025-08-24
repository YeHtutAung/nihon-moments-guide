import { StudentsSection } from "@/components/ui/students-section";
import { StudentAdmin } from "@/components/ui/student-admin";
import { ServiceAdmin } from "@/components/ui/service-admin";
import { MapSection } from "@/components/ui/map-section";
import { SchoolAdmin } from "@/components/ui/school-admin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Eye, Briefcase, MapPin } from "lucide-react";

const StudentsDemo = () => {
  const [viewMode, setViewMode] = useState<'view' | 'admin' | 'services' | 'map' | 'schools'>('view');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Dynamic Students Section Demo</h1>
          <p className="text-xl opacity-90">
            Showcasing the fully dynamic "Meet Our Successful Students" section with advanced features
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={viewMode === 'view' ? 'default' : 'outline'}
                onClick={() => setViewMode('view')}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Students
              </Button>
              <Button
                variant={viewMode === 'admin' ? 'default' : 'outline'}
                onClick={() => setViewMode('admin')}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Student Admin
              </Button>
                             <Button
                 variant={viewMode === 'services' ? 'default' : 'outline'}
                 onClick={() => setViewMode('services')}
                 className="flex items-center gap-2"
               >
                 <Briefcase className="w-4 h-4" />
                 Service Admin
               </Button>
               <Button
                 variant={viewMode === 'map' ? 'default' : 'outline'}
                 onClick={() => setViewMode('map')}
                 className="flex items-center gap-2"
               >
                 <MapPin className="w-4 h-4" />
                 View Map
               </Button>
               <Button
                 variant={viewMode === 'schools' ? 'default' : 'outline'}
                 onClick={() => setViewMode('schools')}
                 className="flex items-center gap-2"
               >
                 <MapPin className="w-4 h-4" />
                 School Admin
               </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              Dynamic Content Management
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {viewMode === 'view' ? (
          <div className="space-y-8">
            {/* Features Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Students Section Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔍 Advanced Filtering</h4>
                    <p className="text-sm text-muted-foreground">
                      Filter students by university, program, year, and country with real-time results
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📱 Interactive Cards</h4>
                    <p className="text-sm text-muted-foreground">
                      Click any student card to view detailed information in a modal dialog
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🏷️ Achievement Badges</h4>
                    <p className="text-sm text-muted-foreground">
                      Visual display of student achievements with overflow indicators
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🌐 Multi-language</h4>
                    <p className="text-sm text-muted-foreground">
                      Supports English and Burmese languages with dynamic translations
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">💾 Data Persistence</h4>
                    <p className="text-sm text-muted-foreground">
                      Changes are automatically saved to localStorage and persist across sessions
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📱 Responsive Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Works perfectly on all device sizes with adaptive layouts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Students Section */}
            <StudentsSection 
              showFilters={true} 
              maxStudents={12} 
              showTestimonials={true} 
            />
          </div>
                 ) : viewMode === 'admin' ? (
           <div className="space-y-8">
             {/* Admin Features Overview */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Settings className="w-5 h-5" />
                   Student Admin Features
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">📊 Statistics Dashboard</h4>
                     <p className="text-sm text-muted-foreground">
                       Real-time statistics showing total students, universities, programs, and countries
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">✏️ CRUD Operations</h4>
                     <p className="text-sm text-muted-foreground">
                       Create, read, update, and delete students with full form validation
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">📁 Import/Export</h4>
                     <p className="text-sm text-muted-foreground">
                       Export student data as JSON and import from JSON files for backup
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">🖼️ Image Management</h4>
                     <p className="text-sm text-muted-foreground">
                       Upload images directly or use URLs with preview and validation
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">🏷️ Achievement System</h4>
                     <p className="text-sm text-muted-foreground">
                       Add and manage multiple achievements per student with visual badges
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">🔄 Reset Functionality</h4>
                     <p className="text-sm text-muted-foreground">
                       Reset to default data or clear all custom changes with confirmation
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Admin Interface */}
             <StudentAdmin />
           </div>
         ) : (
           <div className="space-y-8">
             {/* Service Admin Features Overview */}
             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Briefcase className="w-5 h-5" />
                   Service Admin Features
                 </CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">📊 Service Statistics</h4>
                     <p className="text-sm text-muted-foreground">
                       Real-time statistics showing total, active, and inactive services
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">✏️ Service Management</h4>
                     <p className="text-sm text-muted-foreground">
                       Create, edit, and delete services with icon selection and status control
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">🔄 Drag & Drop Reordering</h4>
                     <p className="text-sm text-muted-foreground">
                       Reorder services by dragging and dropping for custom display order
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">👁️ Status Toggle</h4>
                     <p className="text-sm text-muted-foreground">
                       Activate or deactivate services with instant visibility control
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">📁 Import/Export</h4>
                     <p className="text-sm text-muted-foreground">
                       Export service data as JSON and import from JSON files for backup
                     </p>
                   </div>
                   <div className="p-4 border rounded-lg">
                     <h4 className="font-semibold mb-2">🔄 Reset to Default</h4>
                     <p className="text-sm text-muted-foreground">
                       Reset to default services or clear all custom changes with confirmation
                     </p>
                   </div>
                 </div>
               </CardContent>
             </Card>

                           {/* Service Admin Interface */}
              <ServiceAdmin />
            </div>
          ) : viewMode === 'map' ? (
            <div className="space-y-8">
              {/* Map Features Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Tokyo Schools Map Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🗺️ Interactive Map</h4>
                      <p className="text-sm text-muted-foreground">
                        Interactive Tokyo map with school markers and location details
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🔍 Search & Filter</h4>
                      <p className="text-sm text-muted-foreground">
                        Search schools by name, program, or location with real-time filtering
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📚 School Details</h4>
                      <p className="text-sm text-muted-foreground">
                        Detailed school information with programs, contact details, and descriptions
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📍 Location Data</h4>
                      <p className="text-sm text-muted-foreground">
                        Precise coordinates and addresses for all schools in Tokyo
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🌐 Multi-language</h4>
                      <p className="text-sm text-muted-foreground">
                        School names in both English and Japanese with full descriptions
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📱 Responsive Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Works perfectly on all devices with adaptive map and list layouts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Section */}
              <MapSection showFilters={true} showSearch={true} maxSchools={12} />
            </div>
          ) : (
            <div className="space-y-8">
              {/* School Admin Features Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    School Admin Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📊 School Statistics</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time statistics showing total, active, and inactive schools by type
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">✏️ School Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Create, edit, and delete schools with comprehensive location and contact data
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📍 Location Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Set precise coordinates and addresses for accurate map positioning
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📚 Program Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Add and manage multiple programs per school with dynamic badges
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📁 Import/Export</h4>
                      <p className="text-sm text-muted-foreground">
                        Export school data as JSON and import from JSON files for backup
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🔄 Reset to Default</h4>
                      <p className="text-sm text-muted-foreground">
                        Reset to default schools or clear all custom changes with confirmation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* School Admin Interface */}
              <SchoolAdmin />
            </div>
          )}
      </div>

      {/* Footer */}
      <div className="bg-muted/50 border-t mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Dynamic Students Section</h3>
            <p className="text-muted-foreground mb-4">
              A fully customizable and dynamic component for showcasing student success stories
            </p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>✅ Real-time Updates</span>
              <span>✅ Local Storage</span>
              <span>✅ Image Upload</span>
              <span>✅ Multi-language</span>
              <span>✅ Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsDemo;
