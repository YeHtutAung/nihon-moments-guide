import { Service, defaultServices, iconMap } from "@/data/services";

const SERVICES_STORAGE_KEY = 'nihon-moments-services';

// Get services from local storage or fall back to default data
export const getServicesFromStorage = (): Service[] => {
  try {
    const stored = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (stored) {
      const parsedServices = JSON.parse(stored);
      // Map icon names back to actual icon components
      return parsedServices.map((service: any) => ({
        ...service,
        icon: iconMap[service.iconName as keyof typeof iconMap] || iconMap.FileText
      }));
    }
  } catch (error) {
    console.error('Error reading services from storage:', error);
  }
  return defaultServices;
};

// Save services to local storage
export const saveServicesToStorage = (services: Service[]): void => {
  try {
    // Convert icon components to names for storage
    const servicesForStorage = services.map(service => ({
      ...service,
      iconName: Object.keys(iconMap).find(key => iconMap[key as keyof typeof iconMap] === service.icon) || 'FileText'
    }));
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(servicesForStorage));
  } catch (error) {
    console.error('Error saving services to storage:', error);
  }
};

// Add a new service
export const addService = (service: Omit<Service, 'id'>): Service => {
  const services = getServicesFromStorage();
  const newService: Service = {
    ...service,
    id: `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  const updatedServices = [...services, newService];
  saveServicesToStorage(updatedServices);
  return newService;
};

// Update an existing service
export const updateService = (id: string, updates: Partial<Service>): Service | null => {
  const services = getServicesFromStorage();
  const index = services.findIndex(service => service.id === id);
  
  if (index === -1) return null;
  
  const updatedService = { ...services[index], ...updates };
  services[index] = updatedService;
  saveServicesToStorage(services);
  return updatedService;
};

// Delete a service
export const deleteService = (id: string): boolean => {
  const services = getServicesFromStorage();
  const filteredServices = services.filter(service => service.id !== id);
  
  if (filteredServices.length === services.length) return false;
  
  saveServicesToStorage(filteredServices);
  return true;
};

// Toggle service active status
export const toggleServiceStatus = (id: string): Service | null => {
  const services = getServicesFromStorage();
  const service = services.find(s => s.id === id);
  
  if (!service) return null;
  
  return updateService(id, { isActive: !service.isActive });
};

// Reorder services
export const reorderServices = (serviceIds: string[]): void => {
  const services = getServicesFromStorage();
  const updatedServices = serviceIds.map((id, index) => {
    const service = services.find(s => s.id === id);
    return service ? { ...service, order: index + 1 } : null;
  }).filter(Boolean) as Service[];
  
  saveServicesToStorage(updatedServices);
};

// Get service statistics
export const getServiceStats = () => {
  const services = getServicesFromStorage();
  
  return {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length
  };
};

// Reset to default data
export const resetToDefaultServices = (): void => {
  localStorage.removeItem(SERVICES_STORAGE_KEY);
};

// Export services data
export const exportServicesData = (): string => {
  const services = getServicesFromStorage();
  return JSON.stringify(services, null, 2);
};

// Import services data
export const importServicesData = (data: string): boolean => {
  try {
    const services = JSON.parse(data);
    if (Array.isArray(services) && services.every(service => 
      service.id && service.title && service.description
    )) {
      saveServicesToStorage(services);
      return true;
    }
  } catch (error) {
    console.error('Error importing services data:', error);
  }
  return false;
};
