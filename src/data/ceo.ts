import ceoImage from "@/assets/ceo-formal.jpg";

export interface CompanyLeader {
  image: string;
  name: string;
  title: string;
  company: string;
  message: {
    greeting: string;
    vision: string;
    commitment: string;
  };
}

export const companyLeader: CompanyLeader = {
  image: ceoImage,
  name: "Hsu Yamin Eaim",
  title: "Chief Executive Officer",
  company: "Nihon Moments Co., Ltd.",
  message: {
    greeting: "Welcome to Nihon Moments! As the CEO of this company, I am honored to share our vision and mission with you, our future students and partners in this incredible journey to Japan.",
    vision: "Our company was founded with a simple yet powerful belief: every student deserves the opportunity to pursue their dreams of studying in Japan, regardless of their background or circumstances.",
    commitment: "At Nihon Moments, we don't just provide services; we build relationships. We believe in the power of personalized guidance, cultural understanding, and unwavering support."
  }
};
