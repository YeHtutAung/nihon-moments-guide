import { School, defaultSchools, schoolIconMap } from "@/data/schools";

const SCHOOLS_STORAGE_KEY = 'nihon-moments-schools';

// Get schools from local storage or fall back to default data
export const getSchoolsFromStorage = (): School[] => {
  try {
    const stored = localStorage.getItem(SCHOOLS_STORAGE_KEY);
    if (stored) {
      const parsedSchools = JSON.parse(stored);
      // Map icon names back to actual icon components
      return parsedSchools.map((school: any) => ({
        ...school,
        icon: schoolIconMap[school.iconName as keyof typeof schoolIconMap] || schoolIconMap.GraduationCap
      }));
    }
  } catch (error) {
    console.error('Error reading schools from storage:', error);
  }
  return defaultSchools;
};

// Save schools to local storage
export const saveSchoolsToStorage = (schools: School[]): void => {
  try {
    // Convert icon components to names for storage
    const schoolsForStorage = schools.map(school => ({
      ...school,
      iconName: Object.keys(schoolIconMap).find(key => schoolIconMap[key as keyof typeof schoolIconMap] === school.icon) || 'GraduationCap'
    }));
    localStorage.setItem(SCHOOLS_STORAGE_KEY, JSON.stringify(schoolsForStorage));
  } catch (error) {
    console.error('Error saving schools to storage:', error);
  }
};

// Add a new school
export const addSchool = (school: Omit<School, 'id'>): School => {
  const schools = getSchoolsFromStorage();
  const newSchool: School = {
    ...school,
    id: `school-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  const updatedSchools = [...schools, newSchool];
  saveSchoolsToStorage(updatedSchools);
  return newSchool;
};

// Update an existing school
export const updateSchool = (id: string, updates: Partial<School>): School | null => {
  const schools = getSchoolsFromStorage();
  const index = schools.findIndex(school => school.id === id);
  
  if (index === -1) return null;
  
  const updatedSchool = { ...schools[index], ...updates };
  schools[index] = updatedSchool;
  saveSchoolsToStorage(schools);
  return updatedSchool;
};

// Delete a school
export const deleteSchool = (id: string): boolean => {
  const schools = getSchoolsFromStorage();
  const filteredSchools = schools.filter(school => school.id !== id);
  
  if (filteredSchools.length === schools.length) return false;
  
  saveSchoolsToStorage(filteredSchools);
  return true;
};

// Toggle school active status
export const toggleSchoolStatus = (id: string): School | null => {
  const schools = getSchoolsFromStorage();
  const school = schools.find(s => s.id === id);
  
  if (!school) return null;
  
  return updateSchool(id, { isActive: !school.isActive });
};

// Reorder schools
export const reorderSchools = (schoolIds: string[]): void => {
  const schools = getSchoolsFromStorage();
  const updatedSchools = schoolIds.map((id, index) => {
    const school = schools.find(s => s.id === id);
    return school ? { ...school, order: index + 1 } : null;
  }).filter(Boolean) as School[];
  
  saveSchoolsToStorage(updatedSchools);
};

// Get school statistics
export const getSchoolStats = () => {
  const schools = getSchoolsFromStorage();
  
  return {
    total: schools.length,
    active: schools.filter(s => s.isActive).length,
    inactive: schools.filter(s => !s.isActive).length,
    universities: schools.filter(s => s.type === 'university' && s.isActive).length,
    languageSchools: schools.filter(s => s.type === 'language-school' && s.isActive).length,
    colleges: schools.filter(s => s.type === 'college' && s.isActive).length
  };
};

// Reset to default data
export const resetToDefaultSchools = (): void => {
  localStorage.removeItem(SCHOOLS_STORAGE_KEY);
};

// Export schools data
export const exportSchoolsData = (): string => {
  const schools = getSchoolsFromStorage();
  return JSON.stringify(schools, null, 2);
};

// Import schools data
export const importSchoolsData = (data: string): boolean => {
  try {
    const schools = JSON.parse(data);
    if (Array.isArray(schools) && schools.every(school => 
      school.id && school.name && school.address && 
      typeof school.latitude === 'number' && typeof school.longitude === 'number'
    )) {
      saveSchoolsToStorage(schools);
      return true;
    }
  } catch (error) {
    console.error('Error importing schools data:', error);
  }
  return false;
};

// Get schools by type
export const getSchoolsByType = (type: School['type']): School[] => {
  const schools = getSchoolsFromStorage();
  return schools.filter(school => school.type === type && school.isActive);
};

// Search schools by name or address
export const searchSchools = (query: string): School[] => {
  const schools = getSchoolsFromStorage();
  const lowercaseQuery = query.toLowerCase();
  
  return schools.filter(school => 
    school.isActive && (
      school.name.toLowerCase().includes(lowercaseQuery) ||
      school.japaneseName.toLowerCase().includes(lowercaseQuery) ||
      school.address.toLowerCase().includes(lowercaseQuery) ||
      school.programs.some(program => program.toLowerCase().includes(lowercaseQuery))
    )
  );
};
