export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'tong_hop';

export interface Question {
  id: string;
  lessonId: number;
  lessonTitle: string;
  topicId: number;
  topicTitle: string;
  level: 'nhan_biet' | 'thong_hieu' | 'van_dung';
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3 (A, B, C, D)
  explanation: string;
  textbookRef?: string; // e.g. "SGK trang 5, Hộp kiến thức"
  hint?: string;
  codeSnippet?: string;
  tableData?: { headers: string[]; rows: string[][] };
}

export interface Lesson {
  id: number;
  topicId: number;
  title: string;
  pages: string;
  shortDesc: string;
  keyPoints: string[];
}

export interface Topic {
  id: number;
  title: string;
  color: string;
  iconName: string;
  lessonIds: number[];
}

export type QuizMode = 'practice' | 'exam' | 'flashcard';

export interface QuizSettings {
  selectedLessonIds: number[]; // empty means all lessons
  questionCount: number;
  difficulty: DifficultyLevel; // 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'tong_hop'
  mode: QuizMode;
  timeLimitMinutes?: number; // e.g. 15, 30, 45 or 0 for unlimited
  shuffleOptions: boolean;
  matrixRatio?: {
    nhanBiet: number; // e.g. 40%
    thongHieu: number; // e.g. 30%
    vanDung: number; // e.g. 30%
  };
}

export interface UserAnswer {
  questionId: string;
  selectedOption: number | null;
  isFlagged: boolean;
  timeSpentSeconds: number;
}

export interface QuizResult {
  quizId: string;
  date: string;
  settings: QuizSettings;
  questions: Question[];
  userAnswers: Record<string, number | null>;
  totalQuestions: number;
  correctCount: number;
  score: number; // Scale 10
  timeSpentSeconds: number;
  statsByLevel: {
    nhan_biet: { total: number; correct: number };
    thong_hieu: { total: number; correct: number };
    van_dung: { total: number; correct: number };
  };
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  studentClass?: string;
  email?: string;
  role?: 'student' | 'teacher' | 'admin';
  createdAt?: string;
}
