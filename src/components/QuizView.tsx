import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion, QuizAnswerDetail, QuizResult } from '../types';
import { speakArabic, soundFX } from '../utils/audio';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  Clock,
  Sparkles,
  ChevronRight,
  BookOpen,
  History,
  FileText,
  Printer
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { currentUser, quizResults, saveQuizResult } = useApp();

  const [quizState, setQuizState] = useState<'idle' | 'testing' | 'finished'>('idle');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(5);

  // Active quiz session state
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(180); // in seconds
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  // Filter history for current user
  const userHistory = quizResults.filter(r => r.userId === currentUser?.id || r.userName === currentUser?.name);

  // Start a new test
  const handleStartQuiz = () => {
    let pool = INITIAL_QUIZ_QUESTIONS;
    if (selectedCategory !== 'all') {
      pool = INITIAL_QUIZ_QUESTIONS.filter(q => q.category === selectedCategory);
    }
    // Shuffle and pick questions
    const picked = [...pool].sort(() => 0.5 - Math.random()).slice(0, questionCount);
    setActiveQuestions(picked);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimeRemaining(questionCount * 30); // 30s per question
    setQuizState('testing');
  };

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (quizState === 'testing') {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizState, activeQuestions, userAnswers]);

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    let correctCount = 0;
    const answerDetails: QuizAnswerDetail[] = [];

    activeQuestions.forEach((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;

      answerDetails.push({
        questionId: q.id,
        questionText: q.question,
        userAnswer: selected !== undefined ? selected : -1,
        correctAnswer: q.correctAnswer,
        isCorrect
      });
    });

    const calculatedScore = Math.round((correctCount / activeQuestions.length) * 100);

    let grade: 'A' | 'B' | 'C' | 'D' = 'D';
    let predicate = 'Rosib (راسب) - Perlu Belajar Lagi';

    if (calculatedScore >= 90) {
      grade = 'A';
      predicate = 'Mumtaz (ممتاز) - Sangat Memuaskan';
      soundFX.playCorrect();
    } else if (calculatedScore >= 80) {
      grade = 'B';
      predicate = 'Jayyid Jiddan (جيد جداً) - Baik Sekali';
      soundFX.playCorrect();
    } else if (calculatedScore >= 70) {
      grade = 'B';
      predicate = 'Jayyid (جيد) - Baik';
      soundFX.playCorrect();
    } else if (calculatedScore >= 60) {
      grade = 'C';
      predicate = 'Maqbul (مقبول) - Cukup';
    } else {
      soundFX.playWrong();
    }

    const resultRecord: QuizResult = {
      id: 'res-' + Date.now().toString(36),
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Siswa SMA',
      studentClass: currentUser?.studentClass || 'XI-IPA SMA',
      category: selectedCategory === 'all' ? 'Campuran (Sekolah, Hewan, Profesi)' : selectedCategory,
      totalQuestions: activeQuestions.length,
      correctAnswers: correctCount,
      score: calculatedScore,
      grade,
      predicate,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      timestamp: Date.now(),
      details: answerDetails
    };

    saveQuizResult(resultRecord);
    setLastResult(resultRecord);
    setQuizState('finished');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* --- 1. QUIZ IDLE / SELECTION STATE --- */}
      {quizState === 'idle' && (
        <div className="space-y-8">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
                <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                Evaluasi Pembelajaran Bahasa Arab SMA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Uji Soal Mufrodat & Penilaian
              </h2>
              <p className="font-arabic text-xl text-emerald-200 font-bold" dir="rtl">
                اِخْتِبَارُ اللُّغَةِ الْعَرَبِيَّةِ لِلْمَرْحَلَةِ الثَّانَوِيَّةِ
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/80">
                Uji kemampuan penguasaan kosa kata Anda dengan soal pilihan ganda, arti kalimat, dan audio lafadz. Dapatkan nilai langsung berskala 0 - 100 dengan predikat resmi SMA.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center min-w-[200px]">
              <Award className="w-8 h-8 text-amber-300 mx-auto mb-2" />
              <p className="text-xs text-emerald-200 font-semibold">Skala Predikat:</p>
              <p className="text-sm font-bold text-white mt-1">90-100: Mumtaz (A)</p>
              <p className="text-xs text-emerald-100">80-89: Jayyid Jiddan (B+)</p>
              <p className="text-xs text-emerald-100">70-79: Jayyid (B)</p>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Atur Lembar Soal Ujian:</span>
            </h3>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. Pilih Tema Kosakata:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'all', label: 'Semua Tema (Campuran)', icon: '📚' },
                  { id: 'sekolah', label: 'Sekolah (المدرسة)', icon: '🏫' },
                  { id: 'hewan', label: 'Hewan (الحيوانات)', icon: '🦁' },
                  { id: 'profesi', label: 'Profesi (المهن)', icon: '👨‍⚕️' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCategory(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedCategory === item.id
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <span className="text-xl mb-1">{item.icon}</span>
                    <span className="text-xs sm:text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question count selection */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                2. Jumlah Soal:
              </label>
              <div className="flex gap-3">
                {[5, 10, 15].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      questionCount === cnt
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cnt} Butir Soal
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Waktu pengerjaan: <strong>{questionCount * 30} detik</strong>
              </div>

              <button
                type="button"
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Kerjakan Ujian</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* History of Quiz Results */}
          {userHistory.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Riwayat Nilai Ujian Anda ({userHistory.length})</span>
              </h3>

              <div className="divide-y divide-slate-100">
                {userHistory.slice(0, 5).map((res) => (
                  <div key={res.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800 capitalize">
                        Ujian Tema: {res.category}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {res.date} • {res.correctAnswers} dari {res.totalQuestions} soal benar
                      </p>
                    </div>

                    <div className="text-right">
                      <span className={`text-base font-extrabold ${
                        res.score >= 80 ? 'text-emerald-700' : res.score >= 60 ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {res.score}
                      </span>
                      <p className="text-[10px] font-semibold text-slate-500">
                        {res.predicate.split(' - ')[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- 2. ACTIVE TESTING STATE --- */}
      {quizState === 'testing' && activeQuestions[currentIndex] && (
        <div className="space-y-6">
          {/* Top Status: Question Counter & Timer */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Soal Nomor
              </span>
              <p className="text-base font-extrabold text-slate-800">
                {currentIndex + 1}{' '}
                <span className="text-xs font-normal text-slate-400">
                  / {activeQuestions.length}
                </span>
              </p>
            </div>

            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold ${
              timeRemaining < 30 ? 'bg-rose-50 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'
            }`}>
              <Clock className="w-4 h-4" />
              <span>Sisa Waktu: {formatTimer(timeRemaining)}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            ></div>
          </div>

          {/* Current Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Tema: {activeQuestions[currentIndex].category}
              </span>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2">
                {activeQuestions[currentIndex].question}
              </h3>

              {/* Arabic Prompt if available */}
              {activeQuestions[currentIndex].arabicPrompt && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                  <p className="font-arabic text-3xl font-bold text-slate-900 leading-relaxed" dir="rtl">
                    {activeQuestions[currentIndex].arabicPrompt}
                  </p>

                  <button
                    type="button"
                    onClick={() => speakArabic(activeQuestions[currentIndex].audioPromptText || activeQuestions[currentIndex].arabicPrompt!)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengarkan Lafadz</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="space-y-3">
              {activeQuestions[currentIndex].options.map((option, optIdx) => {
                const isSelected = userAnswers[currentIndex] === optIdx;
                const letter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/90 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {letter}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {userAnswers[currentIndex] === undefined ? 'Pilih salah satu jawaban' : 'Jawaban tersimpan'}
              </span>

              <button
                type="button"
                disabled={userAnswers[currentIndex] === undefined}
                onClick={handleNext}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{currentIndex < activeQuestions.length - 1 ? 'Soal Berikutnya' : 'Selesai & Lihat Nilai'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. FINISHED / SCORE CARD & REVIEW STATE --- */}
      {quizState === 'finished' && lastResult && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Printable Result Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Lembar Hasil Evaluasi Siswa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">
                Nilai Uji Soal Mufrodat SMA
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Nama: <strong>{lastResult.userName}</strong> | Kelas: <strong>{lastResult.studentClass}</strong> | Tanggal: {lastResult.date}
              </p>
            </div>

            {/* Giant Score Circle */}
            <div className="my-6">
              <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-emerald-50 border-4 border-emerald-500 text-emerald-800 shadow-inner">
                <span className="text-4xl sm:text-5xl font-black">{lastResult.score}</span>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">dari 100</span>
              </div>

              <div className="mt-4">
                <span className="font-arabic text-2xl font-bold text-emerald-800">
                  {lastResult.predicate.split(' - ')[0]}
                </span>
                <p className="text-sm font-bold text-slate-700 mt-0.5">
                  {lastResult.predicate.split(' - ')[1]} (Grade: {lastResult.grade})
                </p>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <p className="text-[11px] text-slate-400 font-semibold">Total Soal</p>
                <p className="text-base font-bold text-slate-800">{lastResult.totalQuestions}</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-semibold">Jawaban Benar</p>
                <p className="text-base font-bold text-emerald-600">{lastResult.correctAnswers} Soal</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[11px] text-slate-400 font-semibold">Jawaban Salah</p>
                <p className="text-base font-bold text-rose-600">
                  {lastResult.totalQuestions - lastResult.correctAnswers} Soal
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Nilai</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizState('idle')}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Uji Soal Lainnya</span>
              </button>
            </div>
          </div>

          {/* In-depth Answer Review & Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              <span>Pembahasan Soal & Kunci Jawaban Lengkap</span>
            </h3>

            <div className="space-y-4">
              {activeQuestions.map((q, idx) => {
                const detail = lastResult.details[idx];
                const isCorrect = detail?.isCorrect;
                const userChoice = detail?.userAnswer !== -1 && detail?.userAnswer !== undefined ? q.options[detail.userAnswer] : 'Tidak dijawab';
                const correctChoice = q.options[q.correctAnswer];

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-500">Soal {idx + 1}:</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}>
                          {isCorrect ? 'Benar ✓' : 'Salah ✕'}
                        </span>
                      </div>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    <p className="text-sm font-bold text-slate-800 mb-2">{q.question}</p>

                    {q.arabicPrompt && (
                      <p className="font-arabic text-xl font-bold text-slate-900 mb-3" dir="rtl">
                        {q.arabicPrompt}
                      </p>
                    )}

                    <div className="text-xs space-y-1 mb-3">
                      <p>
                        <span className="text-slate-500">Jawaban Anda: </span>
                        <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                          {userChoice}
                        </strong>
                      </p>
                      {!isCorrect && (
                        <p>
                          <span className="text-slate-500">Kunci Jawaban Benar: </span>
                          <strong className="text-emerald-700">{correctChoice}</strong>
                        </p>
                      )}
                    </div>

                    {/* Educational explanation */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/60 text-xs text-slate-600">
                      <p className="font-semibold text-slate-700 mb-0.5">💡 Pembahasan Kaidah:</p>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
