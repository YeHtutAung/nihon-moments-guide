import { StudentsSection } from "@/components/ui/students-section";
import { StudentAdmin } from "@/components/ui/student-admin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, Eye } from "lucide-react";

const StudentsDemo = () => {
  const [viewMode, setViewMode] = useState<'view' | 'admin'>('view');

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
                Admin Panel
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
        ) : (
          <div className="space-y-8">
            {/* Admin Features Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Admin Panel Features
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
