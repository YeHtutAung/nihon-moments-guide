import student1 from "@/assets/students/student-1.jpg";
import student2 from "@/assets/students/student-2.jpg";
import student3 from "@/assets/students/student-3.jpg";
import student4 from "@/assets/students/student-4.jpg";
import student5 from "@/assets/students/student-5.jpg";
import student6 from "@/assets/students/student-6.jpg";

export interface Student {
  id: string;
  image: string;
  name: string;
  university: string;
  program: string;
  year: string;
  country: string;
  testimonial?: string;
  achievements?: string[];
}

export const successfulStudents: Student[] = [
  {
    id: "student-1",
    image: student1,
    name: "Sakura Tanaka",
    university: "Tokyo University",
    program: "Computer Science",
    year: "2024",
    country: "Japan",
    testimonial: "Nihon Moments made my dream of studying at Tokyo University a reality. The personalized guidance was incredible!",
    achievements: ["Dean's List", "Research Assistant", "International Student Ambassador"]
  },
  {
    id: "student-2",
    image: student2,
    name: "Michael Chen",
    university: "Waseda University",
    program: "International Relations",
    year: "2023",
    country: "Singapore",
    testimonial: "The application process was smooth and stress-free thanks to their expert guidance.",
    achievements: ["Merit Scholarship", "Student Council Member", "Language Exchange Program Leader"]
  },
  {
    id: "student-3",
    image: student3,
    name: "Emily Rodriguez",
    university: "Keio University",
    program: "Business Administration",
    year: "2024",
    country: "Philippines",
    testimonial: "From application to arrival, they supported me every step of the way.",
    achievements: ["Academic Excellence Award", "Business Case Competition Winner", "Mentorship Program Participant"]
  },
  {
    id: "student-4",
    image: student4,
    name: "David Kim",
    university: "Osaka University",
    program: "Engineering",
    year: "2023",
    country: "South Korea",
    testimonial: "The interview preparation was invaluable. I felt confident and well-prepared.",
    achievements: ["Engineering Innovation Award", "Research Publication", "Technical Project Leader"]
  },
  {
    id: "student-5",
    image: student5,
    name: "Anna Sato",
    university: "Kyoto University",
    program: "Cultural Studies",
    year: "2024",
    country: "Malaysia",
    testimonial: "They helped me understand Japanese culture and academic expectations perfectly.",
    achievements: ["Cultural Exchange Scholarship", "International Student Representative", "Cultural Event Organizer"]
  },
  {
    id: "student-6",
    image: student6,
    name: "James Wilson",
    university: "Sophia University",
    program: "Japanese Literature",
    year: "2023",
    country: "United Kingdom",
    testimonial: "The COE process was handled professionally. I couldn't have done it without them.",
    achievements: ["Literature Prize", "Translation Project", "Literary Magazine Editor"]
  },
  {
    id: "student-7",
    image: student1, // Reusing image for demo
    name: "Yuki Nakamura",
    university: "Hokkaido University",
    program: "Environmental Science",
    year: "2024",
    country: "Canada",
    testimonial: "Their expertise in Japanese university applications is unmatched.",
    achievements: ["Environmental Research Grant", "Sustainability Project Leader", "International Conference Presenter"]
  },
  {
    id: "student-8",
    image: student2, // Reusing image for demo
    name: "Sarah Johnson",
    university: "Nagoya University",
    program: "Biotechnology",
    year: "2023",
    country: "Australia",
    testimonial: "The personalized approach made all the difference in my application success.",
    achievements: ["Biotech Innovation Award", "Laboratory Research Assistant", "Science Communication Volunteer"]
  }
];

export const getFeaturedStudents = (count: number = 6): Student[] => {
  return successfulStudents.slice(0, count);
};

export const getStudentById = (id: string): Student | undefined => {
  return successfulStudents.find(student => student.id === id);
};

export const getStudentsByUniversity = (university: string): Student[] => {
  return successfulStudents.filter(student => 
    student.university.toLowerCase().includes(university.toLowerCase())
  );
};

export const getStudentsByProgram = (program: string): Student[] => {
  return successfulStudents.filter(student => 
    student.program.toLowerCase().includes(program.toLowerCase())
  );
};
