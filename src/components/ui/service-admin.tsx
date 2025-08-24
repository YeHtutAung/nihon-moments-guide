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
  Settings,
  Eye,
  EyeOff,
  GripVertical,
  FileText,
  Award,
  MessageSquare,
  Newspaper
} from "lucide-react";
import { Service, iconMap } from "@/data/services";
import { 
  getServicesFromStorage, 
  addService, 
  updateService, 
  deleteService, 
  toggleServiceStatus,
  reorderServices,
  getServiceStats,
  exportServicesData,
  importServicesData,
  resetToDefaultServices
} from "@/utils/service-management";

interface ServiceFormData {
  title: string;
  description: string;
  iconName: string;
  isActive: boolean;
  order: number;
}

const defaultFormData: ServiceFormData = {
  title: "",
  description: "",
  iconName: "FileText",
  isActive: true,
  order: 1
};

export const ServiceAdmin = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState(getServiceStats());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(defaultFormData);
  const [draggedService, setDraggedService] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    const currentServices = getServicesFromStorage();
    setServices(currentServices);
    setStats(getServiceStats());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData = {
      ...formData,
      icon: iconMap[formData.iconName as keyof typeof iconMap] || iconMap.FileText
    };
    
    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }
    
    setIsAddDialogOpen(false);
    setEditingService(null);
    setFormData(defaultFormData);
    loadServices();
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      iconName: Object.keys(iconMap).find(key => iconMap[key as keyof typeof iconMap] === service.icon) || 'FileText',
      isActive: service.isActive,
      order: service.order
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
      loadServices();
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleServiceStatus(id);
    loadServices();
  };

  const handleDragStart = (e: React.DragEvent, serviceId: string) => {
    setDraggedService(serviceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetServiceId: string) => {
    e.preventDefault();
    
    if (draggedService && draggedService !== targetServiceId) {
      const currentOrder = services.map(s => s.id);
      const draggedIndex = currentOrder.indexOf(draggedService);
      const targetIndex = currentOrder.indexOf(targetServiceId);
      
      // Reorder the array
      const newOrder = [...currentOrder];
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedService);
      
      reorderServices(newOrder);
      loadServices();
    }
    
    setDraggedService(null);
  };

  const handleExport = () => {
    const data = exportServicesData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        if (importServicesData(data)) {
          loadServices();
          alert('Services data imported successfully!');
        } else {
          alert('Invalid data format!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to default data? This will remove all custom changes.")) {
      resetToDefaultServices();
      loadServices();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-mountain-gray">Service Management</h1>
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
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Icon</label>
                    <Select value={formData.iconName} onValueChange={(value) => setFormData(prev => ({ ...prev, iconName: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(iconMap).map(iconName => (
                          <SelectItem key={iconName} value={iconName}>
                            {iconName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
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
                    {editingService ? 'Update' : 'Add'} Service
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Settings className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Services</p>
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
                <p className="text-sm text-muted-foreground">Active Services</p>
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
                <p className="text-sm text-muted-foreground">Inactive Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services List */}
      <Card>
        <CardHeader>
          <CardTitle>Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.sort((a, b) => a.order - b.order).map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className={`relative ${draggedService === service.id ? 'opacity-50' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, service.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, service.id)}
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
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">Order: {service.order}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleStatus(service.id)}
                        >
                          {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(service.id)}
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
