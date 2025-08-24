import { FileText, Award, MessageSquare, Newspaper } from "lucide-react";

export interface Service {
  id: string;
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  isActive: boolean;
  order: number;
}

export const defaultServices: Service[] = [
  {
    id: "application-guidance",
    icon: FileText,
    title: "Application Guidance",
    description: "Navigate the complex application process with our expert guidance. We help you prepare all necessary documents, meet deadlines, and present your best self to Japanese institutions.",
    isActive: true,
    order: 1
  },
  {
    id: "coe",
    icon: Award,
    title: "Certificate of Eligibility (COE)",
    description: "We streamline the COE application process, handling all the paperwork and coordination with Japanese immigration authorities to ensure a smooth and successful application.",
    isActive: true,
    order: 2
  },
  {
    id: "interview-prep",
    icon: MessageSquare,
    title: "Interview Preparation",
    description: "Build confidence with our comprehensive interview coaching. We provide mock interviews, cultural insights, and personalized feedback to help you excel in your admissions interviews.",
    isActive: true,
    order: 3
  },
  {
    id: "part-time-job",
    icon: Newspaper,
    title: "Part-time Job",
    description: "We offer newspaper delivery opportunities for students in Japan. This door-to-door service provides flexible hours and helps you earn while studying. Perfect for students looking to support their living expenses.",
    isActive: true,
    order: 4
  }
];

// Icon mapping for dynamic icon loading
export const iconMap = {
  FileText,
  Award,
  MessageSquare,
  Newspaper
};

export const getActiveServices = (): Service[] => {
  return defaultServices.filter(service => service.isActive).sort((a, b) => a.order - b.order);
};

export const getServiceById = (id: string): Service | undefined => {
  return defaultServices.find(service => service.id === id);
};
