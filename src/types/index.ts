export type MufrodatCategory = 'sekolah' | 'hewan' | 'profesi';

export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  username?: string;
  name: string;
  role: UserRole;
  email?: string;
  studentClass?: string; // e.g., 'X-1 SMA', 'XI-IPA SMA', 'XII-IPS SMA'
  nisn?: string;
  avatarUrl?: string;
  title?: string;
}

export interface ExampleSentence {
  arabic: string;
  transliteration: string;
  indonesian: string;
}

export interface MufrodatCard {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: MufrodatCategory;
  gender: 'mudzakkar' | 'muannats';
  plural?: string;
  exampleSentence: ExampleSentence;
  notes?: string;
  visualColor: string;
  iconName: string;
  isCustom?: boolean;
}

export type AttendanceStatus = 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  studentClass: string;
  nisn?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AttendanceStatus;
  subject: string;
  notes?: string;
  verified: boolean;
  timestamp: number;
}

export interface QuizQuestion {
  id: string;
  category: MufrodatCategory | 'campuran';
  type: 'pilihan_ganda' | 'tebak_gambar' | 'audio_lafadz' | 'susun_kalimat';
  question: string;
  arabicPrompt?: string;
  audioPromptText?: string;
  options: string[];
  correctAnswer: number; // 0-based index
  explanation: string;
}

export interface QuizAnswerDetail {
  questionId: string;
  questionText: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  userId: string;
  userName: string;
  studentClass: string;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // 0 - 100
  grade: 'A' | 'B' | 'C' | 'D';
  predicate: string; // Mumtaz, Jayyid Jiddan, etc.
  date: string;
  timestamp: number;
  details: QuizAnswerDetail[];
}
