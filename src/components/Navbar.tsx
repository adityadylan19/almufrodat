import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Layers,
  GraduationCap,
  ClipboardCheck,
  ShieldAlert,
  Bot,
  LogOut,
  User as UserIcon,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  onOpenAITutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAITutor }) => {
  const { currentUser, isAdmin, logout, activeTab, setActiveTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { id: 'mufrodat', label: 'Kartu Mufrodat', arabic: 'المُفْرَدَاتُ', icon: BookOpen },
    { id: 'game', label: 'Game Jodohkan', arabic: 'لُعْبَةُ الْمُطَابَقَةِ', icon: Layers },
    { id: 'quiz', label: 'Uji Soal & Nilai', arabic: 'الْاِخْتِبَارُ', icon: GraduationCap },
    { id: 'absensi', label: 'Absensi Siswa', arabic: 'كِشْفُ الْحُضُوْرِ', icon: ClipboardCheck },
  ];

  if (isAdmin) {
    navItems.push({
      id: 'admin',
      label: 'Panel Guru Admin',
      arabic: 'لَوْحَةُ الْمُعَلِّمِ',
      icon: ShieldAlert
    });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo & School Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 ring-2 ring-emerald-200">
                <span className="font-arabic text-2xl font-bold">ع</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-bold text-lg sm:text-xl text-slate-800 tracking-tight flex items-center gap-1.5">
                    Mufrodat <span className="text-emerald-700 font-extrabold">SMA</span>
                  </h1>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                    Bahasa Arab SMA
                  </span>
                </div>
                <p className="font-arabic text-xs text-emerald-800 font-semibold tracking-wide">
                  مَنْ جَدَّ وَجَدَ • Pembelajaran Interaktif
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isSpecialAdmin = item.id === 'admin';

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`relative px-3.5 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? isSpecialAdmin
                          ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                          : 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                        : isSpecialAdmin
                        ? 'text-amber-700 hover:bg-amber-50 border border-amber-200'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"></span>
                    )}
                  </button>
                );
              })}

              {/* AI Tutor Button */}
              <button
                onClick={onOpenAITutor}
                className="ml-1 px-3 py-2 rounded-lg font-medium text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Tanya Ustadz AI seputar bahasa Arab"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                <span className="hidden lg:inline">Tanya</span> Ustadz AI
                <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
              </button>
            </nav>

            {/* User Profile & Logout Button */}
            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="flex items-center gap-2.5">
                  <div className="hidden lg:block text-right">
                    <p className="text-xs font-bold text-slate-800 leading-tight">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser.role === 'admin' ? (
                        <span className="font-semibold text-amber-600">Guru Pengampu</span>
                      ) : (
                        currentUser.studentClass || 'Siswa SMA'
                      )}
                    </p>
                  </div>

                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs ${
                    isAdmin ? 'bg-amber-600 ring-2 ring-amber-300' : 'bg-emerald-600 ring-2 ring-emerald-200'
                  }`}>
                    {isAdmin ? 'G' : currentUser.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Prominent Logout Button */}
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                    title="Keluar dari akun (Logout)"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Keluar</span>
                  </button>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-1 shadow-xl">
            {currentUser && (
              <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-slate-800">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">
                    {isAdmin ? 'Administrator / Guru' : currentUser.studentClass}
                  </p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  isAdmin ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {isAdmin ? 'Akun Admin' : 'Siswa'}
                </span>
              </div>
            )}

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-arabic text-xs opacity-75">{item.arabic}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAITutor();
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Tanya Ustadz AI</span>
            </button>
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              Konfirmasi Keluar (Logout)
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Apakah Anda yakin ingin keluar dari akun <strong className="text-slate-800">{currentUser?.name}</strong>?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex-1"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  logout();
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer flex-1 shadow-sm shadow-rose-600/30"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
