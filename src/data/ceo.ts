export interface CEO {
  id: string;
  image: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  experience: string;
  education: string;
  achievements: string[];
  message: {
    greeting: string;
    vision: string;
    commitment: string;
  };
}

export const ceoData: CEO = {
  id: "ceo-1",
  image: "/src/assets/ceo-formal.jpg",
  name: "Yuki Tanaka",
  title: "Chief Executive Officer",
  company: "Nihon Moments Co., Ltd.",
  bio: "With over 15 years of experience in international education and cultural exchange, Yuki Tanaka has dedicated his career to helping students achieve their dreams of studying in Japan.",
  experience: "15+ years in international education, former university admissions officer, certified education consultant",
  education: "Master's in International Education, Tokyo University; Bachelor's in Business Administration, Waseda University",
  achievements: [
    "Certified Education Consultant (CEC)",
    "Former Admissions Officer at Tokyo University",
    "Published author on Japanese education system",
    "Speaker at international education conferences",
    "Recipient of Excellence in Education Award"
  ],
  message: {
    greeting: "Welcome to Nihon Moments! As the CEO of this company, I am honored to share our vision and mission with you, our future students and partners in this incredible journey to Japan.",
    vision: "Our company was founded with a simple yet powerful belief: every student deserves the opportunity to pursue their dreams of studying in Japan, regardless of their background or circumstances.",
    commitment: "At Nihon Moments, we don't just provide services; we build relationships. We believe in the power of personalized guidance, cultural understanding, and unwavering support."
  }
};

export const getCEOData = (): CEO => {
  return ceoData;
};
