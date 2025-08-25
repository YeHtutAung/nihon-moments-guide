import { CEOAdmin } from "@/components/ui/ceo-admin";
import { GreetingSection } from "@/components/ui/greeting-section";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const CEODemo = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">CEO Management Demo</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={showAdmin ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAdmin(!showAdmin)}
                className="flex items-center gap-2"
              >
                {showAdmin ? <Eye className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                {showAdmin ? "View Preview" : "Manage CEO"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8">
        {showAdmin ? (
          <CEOAdmin />
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                CEO Greeting Section Preview
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This is how the CEO greeting section will appear on your website. 
                Use the "Manage CEO" button above to customize the content, photo, and messages.
              </p>
            </div>
            
            <GreetingSection />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Features Available:
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Dynamic CEO photo management</li>
                <li>• Editable name, title, and company information</li>
                <li>• Customizable greeting, vision, and commitment messages</li>
                <li>• Real-time preview of changes</li>
                <li>• Local storage for persistent data</li>
                <li>• Reset to default functionality</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
