import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  RotateCcw,
  MapPin,
  Eye,
  EyeOff,
  GripVertical,
  GraduationCap,
  Building,
  Globe,
  ExternalLink,
  Phone,
  Mail,
  X
} from "lucide-react";
import { School, schoolIconMap } from "@/data/schools";
import { 
  getSchoolsFromStorage, 
  addSchool, 
  updateSchool, 
  deleteSchool, 
  toggleSchoolStatus,
  reorderSchools,
  getSchoolStats,
  exportSchoolsData,
  importSchoolsData,
  resetToDefaultSchools
} from "@/utils/school-management";

interface SchoolFormData {
  name: string;
  japaneseName: string;
  type: 'university' | 'language-school' | 'college';
  address: string;
  latitude: number;
  longitude: number;
  website: string;
  phone: string;
  email: string;
  programs: string[];
  description: string;
  isActive: boolean;
  order: number;
  iconName: string;
}

const defaultFormData: SchoolFormData = {
  name: "",
  japaneseName: "",
  type: "university",
  address: "",
  latitude: 35.6762,
  longitude: 139.6503,
  website: "",
  phone: "",
  email: "",
  programs: [],
  description: "",
  isActive: true,
  order: 1,
  iconName: "GraduationCap"
};

export const SchoolAdmin = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [stats, setStats] = useState(getSchoolStats());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState<SchoolFormData>(defaultFormData);
  const [draggedSchool, setDraggedSchool] = useState<string | null>(null);
  const [newProgram, setNewProgram] = useState("");

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = () => {
    const currentSchools = getSchoolsFromStorage();
    setSchools(currentSchools);
    setStats(getSchoolStats());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const schoolData = {
      ...formData,
      icon: schoolIconMap[formData.iconName as keyof typeof schoolIconMap] || schoolIconMap.GraduationCap
    };
    
    if (editingSchool) {
      updateSchool(editingSchool.id, schoolData);
    } else {
      addSchool(schoolData);
    }
    
    setIsAddDialogOpen(false);
    setEditingSchool(null);
    setFormData(defaultFormData);
    loadSchools();
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      japaneseName: school.japaneseName,
      type: school.type,
      address: school.address,
      latitude: school.latitude,
      longitude: school.longitude,
      website: school.website,
      phone: school.phone,
      email: school.email,
      programs: [...school.programs],
      description: school.description,
      isActive: school.isActive,
      order: school.order,
      iconName: Object.keys(schoolIconMap).find(key => schoolIconMap[key as keyof typeof schoolIconMap] === school.icon) || 'GraduationCap'
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this school?")) {
      deleteSchool(id);
      loadSchools();
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleSchoolStatus(id);
    loadSchools();
  };

  const handleDragStart = (e: React.DragEvent, schoolId: string) => {
    setDraggedSchool(schoolId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSchoolId: string) => {
    e.preventDefault();
    
    if (draggedSchool && draggedSchool !== targetSchoolId) {
      const currentOrder = schools.map(s => s.id);
      const draggedIndex = currentOrder.indexOf(draggedSchool);
      const targetIndex = currentOrder.indexOf(targetSchoolId);
      
      const newOrder = [...currentOrder];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedSchool);
      
      reorderSchools(newOrder);
      loadSchools();
    }
    
    setDraggedSchool(null);
  };

  const handleExport = () => {
    const data = exportSchoolsData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schools-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        if (importSchoolsData(data)) {
          loadSchools();
          alert('Schools data imported successfully!');
        } else {
          alert('Invalid data format!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to default data? This will remove all custom changes.")) {
      resetToDefaultSchools();
      loadSchools();
    }
  };

  const addProgram = () => {
    if (newProgram.trim() && !formData.programs.includes(newProgram.trim())) {
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, newProgram.trim()]
      }));
      setNewProgram("");
    }
  };

  const removeProgram = (index: number) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-mountain-gray">School Management</h1>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" asChild>
            <label>
              <Upload className="w-4 h-4 mr-2" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add School
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSchool ? 'Edit School' : 'Add New School'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">School Name (English)</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">School Name (Japanese)</label>
                    <Input
                      value={formData.japaneseName}
                      onChange={(e) => setFormData(prev => ({ ...prev, japaneseName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="language-school">Language School</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Icon</label>
                    <Select value={formData.iconName} onValueChange={(value) => setFormData(prev => ({ ...prev, iconName: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(schoolIconMap).map(iconName => (
                          <SelectItem key={iconName} value={iconName}>
                            {iconName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Order</label>
                    <Input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Latitude</label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Longitude</label>
                    <Input
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Website</label>
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+81-3-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="info@school.ac.jp"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Programs</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newProgram}
                      onChange={(e) => setNewProgram(e.target.value)}
                      placeholder="Add a program..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProgram())}
                    />
                    <Button type="button" onClick={addProgram} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.programs.map((program, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {program}
                        <button
                          type="button"
                          onClick={() => removeProgram(index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Active
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingSchool ? 'Update' : 'Add'} School
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <MapPin className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <EyeOff className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.inactive}</p>
                <p className="text-sm text-muted-foreground">Inactive Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <GraduationCap className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.universities}</p>
                <p className="text-sm text-muted-foreground">Universities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Globe className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.languageSchools}</p>
                <p className="text-sm text-muted-foreground">Language Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.colleges}</p>
                <p className="text-sm text-muted-foreground">Colleges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schools List */}
      <Card>
        <CardHeader>
          <CardTitle>Schools ({schools.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schools.sort((a, b) => a.order - b.order).map((school) => {
              const IconComponent = school.icon;
              return (
                <Card 
                  key={school.id} 
                  className={`relative ${draggedSchool === school.id ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, school.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, school.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{school.name}</h3>
                          <p className="text-sm text-muted-foreground">{school.japaneseName}</p>
                          <p className="text-xs text-muted-foreground">{school.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={school.isActive ? "default" : "secondary"}>
                          {school.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Order: {school.order}</Badge>
                        <Badge variant="outline">
                          {school.type === 'university' ? 'University' : 
                           school.type === 'language-school' ? 'Language School' : 'College'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleStatus(school.id)}
                        >
                          {school.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(school)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(school.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
