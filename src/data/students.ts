import student1 from "@/assets/students/student-1.jpg";
import student2 from "@/assets/students/student-2.jpg";
import student3 from "@/assets/students/student-3.jpg";
import student4 from "@/assets/students/student-4.jpg";
import student5 from "@/assets/students/student-5.jpg";
import student6 from "@/assets/students/student-6.jpg";

export interface SuccessStory {
  image: string;
  name: string;
  country: string;
  university: string;
  program: string;
  testimonial: string;
}

export const successStories: SuccessStory[] = [
  {
    image: student1,
    name: "Sakura Tanaka",
    country: "Japan",
    university: "Tokyo University",
    program: "Computer Science",
    testimonial: "Nihon Moments made my dream of studying at Tokyo University a reality. The personalized guidance was incredible!"
  },
  {
    image: student2,
    name: "Michael Chen",
    country: "Singapore",
    university: "Waseda University",
    program: "International Relations",
    testimonial: "The application process was smooth and stress-free thanks to their expert guidance."
  },
  {
    image: student3,
    name: "Emily Rodriguez",
    country: "Philippines",
    university: "Keio University",
    program: "Business Administration",
    testimonial: "From application to arrival, they supported me every step of the way."
  },
  {
    image: student4,
    name: "David Kim",
    country: "South Korea",
    university: "Osaka University",
    program: "Engineering",
    testimonial: "The interview preparation was invaluable. I felt confident and well-prepared."
  },
  {
    image: student5,
    name: "Anna Sato",
    country: "Malaysia",
    university: "Kyoto University",
    program: "Cultural Studies",
    testimonial: "They helped me understand Japanese culture and academic expectations perfectly."
  },
  {
    image: student6,
    name: "James Wilson",
    country: "United Kingdom",
    university: "Sophia University",
    program: "Japanese Literature",
    testimonial: "The COE process was handled professionally. I couldn't have done it without them."
  }
];
