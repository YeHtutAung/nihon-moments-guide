import { FileText, Award, MessageSquare, Newspaper, type LucideIcon } from "lucide-react";

export interface Service {
  icon: LucideIcon;
  i18nKey: string;
}

export const services: Service[] = [
  { icon: FileText, i18nKey: "services.applicationGuidance" },
  { icon: Award, i18nKey: "services.coe" },
  { icon: MessageSquare, i18nKey: "services.interviewPrep" },
  { icon: Newspaper, i18nKey: "services.partTimeJob" },
];
