import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AttendanceRecord, QuizResult, MufrodatCard } from '../types';
import { INITIAL_MUFRODAT_CARDS } from '../data/mufrodatData';

interface AppContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loginAsAdmin: (username: string, pass: string) => boolean;
  loginWithGoogle: (customEmail?: string, customName?: string) => void;
  loginAsStudent: (name: string, studentClass: string, nisn?: string) => void;
  logout: () => void;

  // Mufrodat Cards
  cards: MufrodatCard[];
  addCard: (card: Omit<MufrodatCard, 'id'>) => void;
  deleteCard: (id: string) => void;
  memorizedCardIds: string[];
  toggleMemorized: (id: string) => void;
  favoriteCardIds: string[];
  toggleFavorite: (id: string) => void;

  // Attendance
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, 'id' | 'timestamp'>) => void;
  deleteAttendanceRecord: (id: string) => void;
  updateAttendanceStatus: (id: string, status: AttendanceRecord['status']) => void;

  // Quiz Results
  quizResults: QuizResult[];
  saveQuizResult: (result: Omit<QuizResult, 'id' | 'timestamp'>) => void;

  // Navigation Tab
  activeTab: 'mufrodat' | 'game' | 'quiz' | 'absensi' | 'admin' | 'tutor';
  setActiveTab: (tab: 'mufrodat' | 'game' | 'quiz' | 'absensi' | 'admin' | 'tutor') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'mufrodat_user',
  CARDS: 'mufrodat_cards_custom',
  MEMORIZED: 'mufrodat_memorized_ids',
  FAVORITES: 'mufrodat_favorite_ids',
  ATTENDANCE: 'mufrodat_attendance_records',
  QUIZ_RESULTS: 'mufrodat_quiz_results',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (mandatory login)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cards state
  const [cards, setCards] = useState<MufrodatCard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CARDS);
      if (saved) {
        const customCards = JSON.parse(saved);
        return [...INITIAL_MUFRODAT_CARDS, ...customCards];
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MUFRODAT_CARDS;
  });

  // Memorized and Favorite Ids
  const [memorizedCardIds, setMemorizedCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMORIZED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favoriteCardIds, setFavoriteCardIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Attendance Records
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    // Seed initial dummy records for realistic high school attendance demonstration
    return [
      {
        id: 'att-seed-1',
        userId: 'std-101',
        userName: 'Ahmad Faiz Al-Faruq',
        studentClass: 'XI-IPA 1 SMA',
        nisn: '0061234501',
        date: new Date().toISOString().split('T')[0],
        time: '07:15',
        status: 'Hadir',
        subject: 'Bahasa Arab SMA',
        notes: 'Tepat waktu di kelas',
        verified: true,
        timestamp: Date.now() - 3600000 * 2,
      },
      {
        id: 'att-seed-2',
        userId: 'std-102',
        userName: 'Zahra Nurul Izzah',
        studentClass: 'XI-IPA 1 SMA',
        nisn: '0061234502',
        date: new Date().toISOString().split('T')[0],
        time: '07:18',
        status: 'Hadir',
        subject: 'Bahasa Arab SMA',
        notes: 'Membawa buku mufrodat',
        verified: true,
        timestamp: Date.now() - 3600000 * 1.8,
      },
      {
        id: 'att-seed-3',
        userId: 'std-103',
        userName: 'Muhammad Rayhan Pratama',
        studentClass: 'X-2 SMA',
        nisn: '0071234599',
        date: new Date().toISOString().split('T')[0],
        time: '07:30',
        status: 'Sakit',
        subject: 'Bahasa Arab SMA',
        notes: 'Demam (Surat dokter terlampir)',
        verified: true,
        timestamp: Date.now() - 3600000 * 1.5,
      },
      {
        id: 'att-seed-4',
        userId: 'std-104',
        userName: 'Fathimah Azzahra',
        studentClass: 'XII-IPS 1 SMA',
        nisn: '0051234588',
        date: new Date().toISOString().split('T')[0],
        time: '07:22',
        status: 'Hadir',
        subject: 'Bahasa Arab SMA',
        notes: 'Hadir di lab bahasa',
        verified: true,
        timestamp: Date.now() - 3600000 * 1.2,
      }
    ];
  });

  // Quiz Results
  const [quizResults, setQuizResults] = useState<QuizResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed sample test results
    return [
      {
        id: 'res-seed-1',
        userId: 'std-101',
        userName: 'Ahmad Faiz Al-Faruq',
        studentClass: 'XI-IPA 1 SMA',
        category: 'sekolah',
        totalQuestions: 5,
        correctAnswers: 5,
        score: 100,
        grade: 'A',
        predicate: 'Mumtaz (ممتاز)',
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now() - 86400000,
        details: []
      },
      {
        id: 'res-seed-2',
        userId: 'std-102',
        userName: 'Zahra Nurul Izzah',
        studentClass: 'XI-IPA 1 SMA',
        category: 'profesi',
        totalQuestions: 5,
        correctAnswers: 4,
        score: 80,
        grade: 'B',
        predicate: 'Jayyid Jiddan (جيد جداً)',
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now() - 43200000,
        details: []
      }
    ];
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'mufrodat' | 'game' | 'quiz' | 'absensi' | 'admin' | 'tutor'>('mufrodat');

  // Persistence effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMORIZED, JSON.stringify(memorizedCardIds));
  }, [memorizedCardIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favoriteCardIds));
  }, [favoriteCardIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(quizResults));
  }, [quizResults]);

  // Login as admin: username: madityadahlan, pass: 051119
  const loginAsAdmin = (username: string, pass: string): boolean => {
    if (username.trim() === 'madityadahlan' && pass.trim() === '051119') {
      const adminUser: User = {
        id: 'admin_madityadahlan',
        username: 'madityadahlan',
        name: 'M. Aditya Dahlan, S.Pd.I',
        role: 'admin',
        title: 'Guru Pengampu Bahasa Arab SMA',
        email: 'madityadahlan@sma.sch.id',
        studentClass: 'Dewan Guru SMA',
        nisn: 'NIP. 198905112015031002',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
      };
      setCurrentUser(adminUser);
      setActiveTab('mufrodat');
      return true;
    }
    return false;
  };

  // Google Sign-In Simulation
  const loginWithGoogle = (customEmail?: string, customName?: string) => {
    const studentUser: User = {
      id: 'google_user_' + Date.now().toString(36),
      name: customName || 'Aditya Pratama (Siswa)',
      role: 'student',
      email: customEmail || 'adityadahlan05@gmail.com',
      studentClass: 'XI-IPA 1 SMA',
      nisn: '0067891234',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
    };
    setCurrentUser(studentUser);
    setActiveTab('mufrodat');
  };

  // Custom student login
  const loginAsStudent = (name: string, studentClass: string, nisn?: string) => {
    const studentUser: User = {
      id: 'student_' + Date.now().toString(36),
      name: name.trim() || 'Siswa Bahasa Arab SMA',
      role: 'student',
      email: `${name.toLowerCase().replace(/\s+/g, '')}@student.sma.sch.id`,
      studentClass: studentClass || 'X-1 SMA',
      nisn: nisn || '0071234567',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
    };
    setCurrentUser(studentUser);
    setActiveTab('mufrodat');
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleMemorized = (id: string) => {
    setMemorizedCardIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavoriteCardIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addCard = (cardData: Omit<MufrodatCard, 'id'>) => {
    const newCard: MufrodatCard = {
      ...cardData,
      id: 'custom-' + Date.now().toString(36),
      isCustom: true
    };
    const updatedCards = [newCard, ...cards];
    setCards(updatedCards);

    // Save custom cards to local storage
    const customOnly = updatedCards.filter(c => c.isCustom);
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(customOnly));
  };

  const deleteCard = (id: string) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    const customOnly = updated.filter(c => c.isCustom);
    localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(customOnly));
  };

  const addAttendanceRecord = (record: Omit<AttendanceRecord, 'id' | 'timestamp'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: 'att-' + Date.now().toString(36),
      timestamp: Date.now()
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  const deleteAttendanceRecord = (id: string) => {
    setAttendanceRecords(prev => prev.filter(r => r.id !== id));
  };

  const updateAttendanceStatus = (id: string, status: AttendanceRecord['status']) => {
    setAttendanceRecords(prev =>
      prev.map(r => r.id === id ? { ...r, status, verified: true } : r)
    );
  };

  const saveQuizResult = (result: Omit<QuizResult, 'id' | 'timestamp'>) => {
    const newResult: QuizResult = {
      ...result,
      id: 'res-' + Date.now().toString(36),
      timestamp: Date.now()
    };
    setQuizResults(prev => [newResult, ...prev]);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        loginAsAdmin,
        loginWithGoogle,
        loginAsStudent,
        logout,
        cards,
        addCard,
        deleteCard,
        memorizedCardIds,
        toggleMemorized,
        favoriteCardIds,
        toggleFavorite,
        attendanceRecords,
        addAttendanceRecord,
        deleteAttendanceRecord,
        updateAttendanceStatus,
        quizResults,
        saveQuizResult,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
