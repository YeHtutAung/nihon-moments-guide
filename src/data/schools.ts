import { MapPin, GraduationCap, Building, Globe } from "lucide-react";

export interface School {
  id: string;
  name: string;
  japaneseName: string;
  type: 'university' | 'language-school' | 'college';
  address: string;
  latitude: number;
  longitude: number;
  website: string;
  phone: string;
  email: string;
  programs: string[];
  description: string;
  isActive: boolean;
  order: number;
  icon: any;
}

export const defaultSchools: School[] = [
  {
    id: "tokyo-university",
    name: "The University of Tokyo",
    japaneseName: "東京大学",
    type: "university",
    address: "7-3-1 Hongo, Bunkyo City, Tokyo 113-8654, Japan",
    latitude: 35.7127,
    longitude: 139.7620,
    website: "https://www.u-tokyo.ac.jp/",
    phone: "+81-3-3812-2111",
    email: "info@u-tokyo.ac.jp",
    programs: ["Computer Science", "Engineering", "Medicine", "Law", "Economics"],
    description: "Japan's most prestigious university, known for its rigorous academic standards and research excellence.",
    isActive: true,
    order: 1,
    icon: GraduationCap
  },
  {
    id: "waseda-university",
    name: "Waseda University",
    japaneseName: "早稲田大学",
    type: "university",
    address: "1-104 Totsukamachi, Shinjuku City, Tokyo 169-8050, Japan",
    latitude: 35.7055,
    longitude: 139.7208,
    website: "https://www.waseda.jp/",
    phone: "+81-3-3203-4141",
    email: "info@waseda.jp",
    programs: ["Political Science", "Economics", "Law", "Literature", "Science and Engineering"],
    description: "One of Japan's top private universities, known for its international programs and research.",
    isActive: true,
    order: 2,
    icon: GraduationCap
  },
  {
    id: "keio-university",
    name: "Keio University",
    japaneseName: "慶應義塾大学",
    type: "university",
    address: "2-15-45 Mita, Minato City, Tokyo 108-8345, Japan",
    latitude: 35.6478,
    longitude: 139.7454,
    website: "https://www.keio.ac.jp/",
    phone: "+81-3-3453-4511",
    email: "info@keio.ac.jp",
    programs: ["Medicine", "Economics", "Law", "Business", "Science and Technology"],
    description: "Japan's oldest private university, known for its business and medical programs.",
    isActive: true,
    order: 3,
    icon: GraduationCap
  },
  {
    id: "sophia-university",
    name: "Sophia University",
    japaneseName: "上智大学",
    type: "university",
    address: "7-1 Kioicho, Chiyoda City, Tokyo 102-8554, Japan",
    latitude: 35.6812,
    longitude: 139.7671,
    website: "https://www.sophia.ac.jp/",
    phone: "+81-3-3238-3111",
    email: "info@sophia.ac.jp",
    programs: ["International Relations", "Economics", "Law", "Literature", "Science and Technology"],
    description: "A prestigious private university with strong international focus and language programs.",
    isActive: true,
    order: 4,
    icon: GraduationCap
  },
  {
    id: "tokyo-institute-of-technology",
    name: "Tokyo Institute of Technology",
    japaneseName: "東京工業大学",
    type: "university",
    address: "2-12-1 Ookayama, Meguro City, Tokyo 152-8550, Japan",
    latitude: 35.6064,
    longitude: 139.6842,
    website: "https://www.titech.ac.jp/",
    phone: "+81-3-5734-2000",
    email: "info@titech.ac.jp",
    programs: ["Engineering", "Science", "Technology", "Architecture", "Computer Science"],
    description: "Japan's leading science and technology university, known for engineering excellence.",
    isActive: true,
    order: 5,
    icon: Building
  },
  {
    id: "hitotsubashi-university",
    name: "Hitotsubashi University",
    japaneseName: "一橋大学",
    type: "university",
    address: "2-1 Naka, Kunitachi City, Tokyo 186-8601, Japan",
    latitude: 35.7321,
    longitude: 139.4468,
    website: "https://www.hit-u.ac.jp/",
    phone: "+81-42-580-8000",
    email: "info@hit-u.ac.jp",
    programs: ["Economics", "Commerce", "Law", "Social Sciences"],
    description: "Specialized in social sciences and humanities, known for economics and business programs.",
    isActive: true,
    order: 6,
    icon: GraduationCap
  }
];

// Icon mapping for different school types
export const schoolIconMap = {
  GraduationCap,
  Building,
  Globe
};

export const getActiveSchools = (): School[] => {
  return defaultSchools.filter(school => school.isActive).sort((a, b) => a.order - b.order);
};

export const getSchoolById = (id: string): School | undefined => {
  return defaultSchools.find(school => school.id === id);
};

export const getSchoolsByType = (type: School['type']): School[] => {
  return defaultSchools.filter(school => school.type === type && school.isActive);
};
