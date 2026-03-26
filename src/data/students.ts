import student1 from "@/assets/students/student-1.jpg";
import student2 from "@/assets/students/student-2.jpg";
import student3 from "@/assets/students/student-3.jpg";
import student4 from "@/assets/students/student-4.jpg";
import student5 from "@/assets/students/student-5.jpg";
import student6 from "@/assets/students/student-6.jpg";

export interface SuccessStory {
  image: string;
  i18nKey: string;
}

export const successStories: SuccessStory[] = [
  { image: student1, i18nKey: "students.sakura" },
  { image: student2, i18nKey: "students.michael" },
  { image: student3, i18nKey: "students.emily" },
  { image: student4, i18nKey: "students.david" },
  { image: student5, i18nKey: "students.anna" },
  { image: student6, i18nKey: "students.james" },
];
