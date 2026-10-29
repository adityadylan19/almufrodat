/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginView } from './components/LoginView';
import { FlashcardView } from './components/FlashcardView';
import { MatchingGameView } from './components/MatchingGameView';
import { QuizView } from './components/QuizView';
import { AttendanceView } from './components/AttendanceView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AITutorDrawer } from './components/AITutorDrawer';
import { MufrodatCard } from './types';
import { Bot, Sparkles, BookOpen, GraduationCap } from 'lucide-react';

const MainApp: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedCardForAI, setSelectedCardForAI] = useState<MufrodatCard | null>(null);

  // Mandatory Login Wall
  if (!currentUser) {
    return <LoginView />;
  }

  const handleAskAICard = (card?: MufrodatCard) => {
    setSelectedCardForAI(card || null);
    setIsAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      <div>
        {/* Navigation Bar with Logout button */}
        <Navbar onOpenAITutor={() => handleAskAICard(undefined)} />

        {/* Main Content Area */}
        <main className="pb-16">
          {activeTab === 'mufrodat' && (
            <FlashcardView onAskAI={handleAskAICard} />
          )}

          {activeTab === 'game' && (
            <MatchingGameView />
          )}

          {activeTab === 'quiz' && (
            <QuizView />
          )}

          {activeTab === 'absensi' && (
            <AttendanceView />
          )}

          {activeTab === 'admin' && (
            <AdminDashboardView />
          )}
        </main>
      </div>

      {/* Floating AI Tutor Quick Trigger Button */}
      <button
        type="button"
        onClick={() => handleAskAICard(undefined)}
        className="fixed bottom-6 right-6 z-30 p-3.5 bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 hover:from-emerald-800 hover:to-teal-600 text-white rounded-2xl shadow-xl shadow-emerald-700/30 flex items-center gap-2 group transition-all hover:scale-105 cursor-pointer border border-emerald-400/30"
        title="Tanya Ustadz AI (Konsultasi Bahasa Arab)"
      >
        <Bot className="w-5 h-5 text-emerald-100 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline font-bold text-xs">Tanya Ustadz AI</span>
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
      </button>

      {/* AI Tutor Slide-over Drawer */}
      <AITutorDrawer
        isOpen={isAIOpen}
        onClose={() => {
          setIsAIOpen(false);
          setSelectedCardForAI(null);
        }}
        selectedCard={selectedCardForAI}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
            <span className="font-arabic text-lg text-emerald-700">عَرَبِيّ</span>
            <span>Mufrodat SMA • Media Pembelajaran Bahasa Arab Interaktif</span>
          </div>
          <p className="font-arabic text-sm text-emerald-800 font-semibold" dir="rtl">
            مَنْ جَدَّ وَجَدَ • مَنْ سَارَ عَلَى الدَّرْبِ وَصَلَ
          </p>
          <p className="text-[11px] text-slate-400">
            Kurikulum Merdeka & Kemenag SMA • Pengampu: M. Aditya Dahlan, S.Pd.I (NIP. 198905112015031002)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
