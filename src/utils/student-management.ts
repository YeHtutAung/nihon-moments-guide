import { Student, successfulStudents } from "@/data/students";

// Local storage key for student data
const STUDENTS_STORAGE_KEY = 'nihon-moments-students';

// Get students from local storage or fall back to default data
export const getStudentsFromStorage = (): Student[] => {
  try {
    const stored = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading students from storage:', error);
  }
  return successfulStudents;
};

// Save students to local storage
export const saveStudentsToStorage = (students: Student[]): void => {
  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error('Error saving students to storage:', error);
  }
};

// Add a new student
export const addStudent = (student: Omit<Student, 'id'>): Student => {
  const students = getStudentsFromStorage();
  const newStudent: Student = {
    ...student,
    id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  };
  
  const updatedStudents = [...students, newStudent];
  saveStudentsToStorage(updatedStudents);
  return newStudent;
};

// Update an existing student
export const updateStudent = (id: string, updates: Partial<Student>): Student | null => {
  const students = getStudentsFromStorage();
  const index = students.findIndex(student => student.id === id);
  
  if (index === -1) return null;
  
  const updatedStudent = { ...students[index], ...updates };
  students[index] = updatedStudent;
  saveStudentsToStorage(students);
  return updatedStudent;
};

// Delete a student
export const deleteStudent = (id: string): boolean => {
  const students = getStudentsFromStorage();
  const filteredStudents = students.filter(student => student.id !== id);
  
  if (filteredStudents.length === students.length) return false;
  
  saveStudentsToStorage(filteredStudents);
  return true;
};

// Get student statistics
export const getStudentStats = () => {
  const students = getStudentsFromStorage();
  
  const stats = {
    total: students.length,
    byUniversity: {} as Record<string, number>,
    byProgram: {} as Record<string, number>,
    byYear: {} as Record<string, number>,
    byCountry: {} as Record<string, number>,
    universities: new Set<string>(),
    programs: new Set<string>(),
    years: new Set<string>(),
    countries: new Set<string>()
  };
  
  students.forEach(student => {
    // Count by university
    stats.byUniversity[student.university] = (stats.byUniversity[student.university] || 0) + 1;
    
    // Count by program
    stats.byProgram[student.program] = (stats.byProgram[student.program] || 0) + 1;
    
    // Count by year
    stats.byYear[student.year] = (stats.byYear[student.year] || 0) + 1;
    
    // Count by country
    stats.byCountry[student.country] = (stats.byCountry[student.country] || 0) + 1;
    
    // Add to sets
    stats.universities.add(student.university);
    stats.programs.add(student.program);
    stats.years.add(student.year);
    stats.countries.add(student.country);
  });
  
  return stats;
};

// Reset to default data
export const resetToDefaultStudents = (): void => {
  localStorage.removeItem(STUDENTS_STORAGE_KEY);
};

// Export students data
export const exportStudentsData = (): string => {
  const students = getStudentsFromStorage();
  return JSON.stringify(students, null, 2);
};

// Import students data
export const importStudentsData = (data: string): boolean => {
  try {
    const students = JSON.parse(data);
    if (Array.isArray(students) && students.every(student => 
      student.id && student.name && student.university && student.program
    )) {
      saveStudentsToStorage(students);
      return true;
    }
  } catch (error) {
    console.error('Error importing students data:', error);
  }
  return false;
};
