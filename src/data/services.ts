import { FileText, Award, MessageSquare, Newspaper, type LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    icon: FileText,
    title: "Application Guidance",
    description: "Navigate the complex application process with our expert guidance. We help you prepare all necessary documents, meet deadlines, and present your best self to Japanese institutions."
  },
  {
    icon: Award,
    title: "Certificate of Eligibility (COE)",
    description: "We streamline the COE application process, handling all the paperwork and coordination with Japanese immigration authorities to ensure a smooth and successful application."
  },
  {
    icon: MessageSquare,
    title: "Interview Preparation",
    description: "Build confidence with our comprehensive interview coaching. We provide mock interviews, cultural insights, and personalized feedback to help you excel in your admissions interviews."
  },
  {
    icon: Newspaper,
    title: "Part-time Job",
    description: "We offer newspaper delivery opportunities for students in Japan. This door-to-door service provides flexible hours and helps you earn while studying. Perfect for students looking to support their living expenses."
  }
];
