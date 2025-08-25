import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  updateCEOInfo, 
  updateCEOPhoto, 
  updateCEOMessage, 
  resetCEOToDefault,
  getCEOFromStorage 
} from "@/utils/ceo-management";
import { CEO } from "@/data/ceo";
import { Upload, Save, RotateCcw, User } from "lucide-react";

export const CEOAdmin = () => {
  const [ceo, setCeo] = useState<CEO>(getCEOFromStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [newImagePath, setNewImagePath] = useState("");

  const handleSave = () => {
    updateCEOInfo(ceo);
    setIsEditing(false);
  };

  const handleImageUpdate = () => {
    if (newImagePath.trim()) {
      updateCEOPhoto(newImagePath.trim());
      setCeo(prev => ({ ...prev, image: newImagePath.trim() }));
      setNewImagePath("");
    }
  };

  const handleMessageUpdate = (type: keyof CEO['message'], value: string) => {
    updateCEOMessage(type, value);
    setCeo(prev => ({
      ...prev,
      message: { ...prev.message, [type]: value }
    }));
  };

  const handleReset = () => {
    resetCEOToDefault();
    setCeo(getCEOFromStorage());
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            CEO Information Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CEO Photo Section */}
          <div className="space-y-4">
            <Label>CEO Photo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden shadow-soft">
                <img
                  src={ceo.image}
                  alt={ceo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Enter image path (e.g., /ceo-photo.jpg)"
                  value={newImagePath}
                  onChange={(e) => setNewImagePath(e.target.value)}
                />
                <Button 
                  onClick={handleImageUpdate}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Update Photo
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={ceo.name}
                onChange={(e) => setCeo(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={ceo.title}
                onChange={(e) => setCeo(prev => ({ ...prev, title: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={ceo.company}
                onChange={(e) => setCeo(prev => ({ ...prev, company: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* CEO Messages */}
          <div className="space-y-4">
            <Label>CEO Messages</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="greeting">Greeting Message</Label>
                <Textarea
                  id="greeting"
                  value={ceo.message.greeting}
                  onChange={(e) => handleMessageUpdate('greeting', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision Message</Label>
                <Textarea
                  id="vision"
                  value={ceo.message.vision}
                  onChange={(e) => handleMessageUpdate('vision', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commitment">Commitment Message</Label>
                <Textarea
                  id="commitment"
                  value={ceo.message.commitment}
                  onChange={(e) => handleMessageUpdate('commitment', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Edit Information
              </Button>
            ) : (
              <>
                <Button onClick={handleSave} className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            )}
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
