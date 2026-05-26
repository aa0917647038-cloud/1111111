export interface VideoCard {
  id: string;
  title: string;
  category: string;
  speaker: string;
  duration: string;
  views: number;
  initialLikes: number;
  videoUrl: string; // Embed or simulated
  thumbnail: string;
  summary: string;
  keyPoints: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  hours: number;
  lectures: number;
  features: string[];
  recommendedFor: string[];
  syllabus: { title: string; duration: string }[];
  isHot?: boolean;
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface StudyPlanResult {
  weeklyHours: number;
  weeksLeft: number;
  materialsNeeded: string[];
  timetable: { day: string; task: string; focus: string }[];
  examStrategy: string[];
}

export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
