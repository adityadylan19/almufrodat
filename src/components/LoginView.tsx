import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Lock,
  User as UserIcon,
  BookOpen,
  ClipboardCheck,
  Award,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  LogIn,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginAsAdmin, loginWithGoogle, loginAsStudent } = useApp();

  const [activeTab, setActiveTab] = useState<'admin' | 'student'>('admin');

  // Admin form
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Student form
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('XI-IPA 1 SMA');
  const [studentNisn, setStudentNisn] = useState('');

  // Google Sign-in modal simulation
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setIsLoading(true);

    setTimeout(() => {
      const ok = loginAsAdmin(adminUsername, adminPassword);
      setIsLoading(false);
      if (!ok) {
        setAdminError('Username atau kata sandi admin salah! Pastikan username: madityadahlan dan kata sandi: 051119');
      }
    }, 400);
  };

  const fillAdminCredentials = () => {
    setAdminUsername('madityadahlan');
    setAdminPassword('051119');
    setAdminError('');
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    loginAsStudent(studentName, studentClass, studentNisn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Islamic Background Pattern Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-500 blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-amber-400 blur-3xl"></div>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and App Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/30 mb-4 ring-4 ring-emerald-400/20">
            <span className="font-arabic text-4xl font-bold">عَرَبِيّ</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Mufrodat <span className="text-emerald-400">SMA</span>
          </h2>
          <p className="font-arabic text-lg text-emerald-200 mt-1 font-semibold">
            مَنْ جَدَّ وَجَدَ • مَنْ سَارَ عَلَى الدَّرْبِ وَصَلَ
          </p>
          <p className="text-xs text-emerald-100/70 mt-1">
            Media Pembelajaran Bahasa Arab Interaktif Tingkat Sekolah Menengah Atas
          </p>
        </div>

        {/* Login Card Container */}
        <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20">
          {/* Tab Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Guru / Admin</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('student')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Masuk Siswa</span>
            </button>
          </div>

          {/* TAB 1: ADMIN LOGIN (madityadahlan / 051119) */}
          {activeTab === 'admin' && (
            <div>
              <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Akun Guru Pengampu Bahasa Arab SMA:</p>
                  <p className="text-emerald-800">
                    Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-emerald-900">madityadahlan</code> | Sandi: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-emerald-900">051119</code>
                  </p>
                  <button
                    type="button"
                    onClick={fillAdminCredentials}
                    className="mt-1.5 text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900 cursor-pointer"
                  >
                    👉 Klik di sini untuk isi otomatis akun admin
                  </button>
                </div>
              </div>

              {adminError && (
                <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-3 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Username Admin
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="madityadahlan"
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kata Sandi
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-md shadow-emerald-600/30 cursor-pointer disabled:opacity-60"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isLoading ? 'Memverifikasi...' : 'Masuk sebagai Guru Admin'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: STUDENT LOGIN */}
          {activeTab === 'student' && (
            <div className="space-y-4">
              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={() => setShowGoogleModal(true)}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all shadow-xs cursor-pointer"
              >
                {/* Google SVG Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Masuk dengan Akun Google (Siswa)</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-4 text-xs font-semibold text-slate-400">Atau Isi Data Siswa</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleStudentSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nama Lengkap Siswa
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Muhammad Rayhan"
                    className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Kelas SMA
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                    >
                      <option value="X-1 SMA">X-1 SMA (Fase E)</option>
                      <option value="X-2 SMA">X-2 SMA (Fase E)</option>
                      <option value="XI-IPA 1 SMA">XI-IPA 1 SMA</option>
                      <option value="XI-IPA 2 SMA">XI-IPA 2 SMA</option>
                      <option value="XI-IPS 1 SMA">XI-IPS 1 SMA</option>
                      <option value="XII-IPA 1 SMA">XII-IPA 1 SMA</option>
                      <option value="XII-IPS 1 SMA">XII-IPS 1 SMA</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      NISN (Opsional)
                    </label>
                    <input
                      type="text"
                      value={studentNisn}
                      onChange={(e) => setStudentNisn(e.target.value)}
                      placeholder="0061234567"
                      className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all shadow-md shadow-teal-600/30 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Mulai Belajar Bahasa Arab</span>
                </button>
              </form>
            </div>
          )}

          {/* Quick Features Highlight */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              Materi & Fitur Unggulan SMA
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50/60 text-emerald-900 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kartu Mufrodat Bergambar</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50/60 text-emerald-900 font-medium">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Uji Soal & Nilai Mumtaz</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50/60 text-emerald-900 font-medium">
                <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Presensi / Absensi Online</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50/60 text-emerald-900 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Audio Lafadz & Ustadz AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Sign-in Interactive Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <h3 className="font-bold text-slate-800 text-sm">Pilih Akun Google</h3>
              </div>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Masuk ke <strong>Mufrodat SMA</strong> menggunakan akun Google Anda:
            </p>

            <div className="space-y-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setShowGoogleModal(false);
                  loginWithGoogle('adityadahlan05@gmail.com', 'Aditya Dahlan (Siswa SMA)');
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  AD
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Aditya Dahlan</p>
                  <p className="text-[11px] text-slate-500">adityadahlan05@gmail.com</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowGoogleModal(false);
                  loginWithGoogle('siswa.sma1@gmail.com', 'Fatimah Azzahra (Siswa SMA)');
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:border-emerald-300 transition-colors flex items-center gap-3 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                  FA
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Fatimah Azzahra</p>
                  <p className="text-[11px] text-slate-500">siswa.sma1@gmail.com</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowGoogleModal(false)}
              className="w-full py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
