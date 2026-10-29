import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AttendanceStatus, MufrodatCard, MufrodatCategory } from '../types';
import {
  ShieldAlert,
  Users,
  Award,
  ClipboardCheck,
  PlusCircle,
  Download,
  Printer,
  Sparkles,
  Bot,
  Trash2,
  CheckCircle,
  Clock,
  Filter,
  FileSpreadsheet
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const {
    currentUser,
    cards,
    addCard,
    deleteCard,
    attendanceRecords,
    updateAttendanceStatus,
    deleteAttendanceRecord,
    quizResults
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'attendance' | 'grades' | 'mufrodat' | 'ai-generator'>('attendance');

  // Attendance filters
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Add Mufrodat Form State
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [meaning, setMeaning] = useState('');
  const [category, setCategory] = useState<MufrodatCategory>('sekolah');
  const [gender, setGender] = useState<'mudzakkar' | 'muannats'>('mudzakkar');
  const [plural, setPlural] = useState('');
  const [sentenceArabic, setSentenceArabic] = useState('');
  const [sentenceTrans, setSentenceTrans] = useState('');
  const [sentenceIndo, setSentenceIndo] = useState('');
  const [notes, setNotes] = useState('');
  const [cardSuccessMsg, setCardSuccessMsg] = useState('');

  // AI Quiz Generator State
  const [aiQuizTheme, setAiQuizTheme] = useState('Sekolah');
  const [aiQuizCount, setAiQuizCount] = useState(3);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  // Filter attendance records
  const filteredAttendance = attendanceRecords.filter(r => {
    if (filterClass !== 'all' && r.studentClass !== filterClass) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  // Calculate statistics
  const totalAttendance = attendanceRecords.length;
  const hadirCount = attendanceRecords.filter(r => r.status === 'Hadir').length;
  const hadirRate = totalAttendance > 0 ? Math.round((hadirCount / totalAttendance) * 100) : 100;

  const totalQuizzesTaken = quizResults.length;
  const avgQuizScore = totalQuizzesTaken > 0
    ? Math.round(quizResults.reduce((acc, curr) => acc + curr.score, 0) / totalQuizzesTaken)
    : 0;

  // Export Attendance to CSV
  const exportAttendanceCSV = () => {
    const headers = ['ID', 'Nama Siswa', 'Kelas', 'NISN', 'Tanggal', 'Waktu', 'Status', 'Keterangan'];
    const rows = filteredAttendance.map(r => [
      r.id,
      `"${r.userName}"`,
      `"${r.studentClass}"`,
      `"${r.nisn || '-'}"`,
      r.date,
      r.time,
      r.status,
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Presensi_Bahasa_Arab_SMA_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Grades to CSV
  const exportGradesCSV = () => {
    const headers = ['ID', 'Nama Siswa', 'Kelas', 'Kategori Ujian', 'Tanggal', 'Total Soal', 'Benar', 'Skor', 'Grade', 'Predikat'];
    const rows = quizResults.map(q => [
      q.id,
      `"${q.userName}"`,
      `"${q.studentClass}"`,
      `"${q.category}"`,
      q.date,
      q.totalQuestions,
      q.correctAnswers,
      q.score,
      q.grade,
      `"${q.predicate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Buku_Nilai_Bahasa_Arab_SMA_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit New Mufrodat Card
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!arabic.trim() || !meaning.trim()) return;

    addCard({
      arabic: arabic.trim(),
      transliteration: transliteration.trim() || meaning.trim(),
      meaning: meaning.trim(),
      category,
      gender,
      plural: plural.trim() || undefined,
      notes: notes.trim() || undefined,
      visualColor: category === 'sekolah' ? 'emerald' : category === 'hewan' ? 'amber' : 'sky',
      iconName: category === 'sekolah' ? 'BookOpen' : category === 'hewan' ? 'Sparkles' : 'Award',
      exampleSentence: {
        arabic: sentenceArabic.trim() || arabic.trim(),
        transliteration: sentenceTrans.trim() || transliteration.trim(),
        indonesian: sentenceIndo.trim() || meaning.trim()
      }
    });

    setCardSuccessMsg(`Kartu kosa kata "${meaning}" berhasil ditambahkan!`);
    setTimeout(() => setCardSuccessMsg(''), 3000);

    // Reset fields
    setArabic('');
    setTransliteration('');
    setMeaning('');
    setPlural('');
    setSentenceArabic('');
    setSentenceTrans('');
    setSentenceIndo('');
    setNotes('');
  };

  // Generate AI Questions via Express backend
  const handleGenerateAIQuiz = async () => {
    setIsGeneratingQuiz(true);
    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: aiQuizTheme, count: aiQuizCount })
      });
      const data = await res.json();
      if (data.questions) {
        setGeneratedQuestions(data.questions);
      }
    } catch (err) {
      console.error(err);
      // Fallback sample questions
      setGeneratedQuestions([
        {
          question: `Kalimat pertanyaan tentang tema ${aiQuizTheme}: Manakah ungkapan yang paling tepat?`,
          arabicWord: 'مُفْرَدَاتٌ جَدِيْدَةٌ',
          options: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
          correctIndex: 0,
          explanation: 'Jawaban ini sesuai kaidah tata bahasa Arab SMA.'
        }
      ]);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Teacher Profile & Dashboard Header */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/30 border border-amber-300/40 flex items-center justify-center text-white text-3xl font-bold font-arabic shadow-md">
            م
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
                Administrator & Guru Pengampu
              </span>
              <span className="text-xs text-amber-200">SMA NIP. 198905112015031002</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {currentUser?.name || 'M. Aditya Dahlan, S.Pd.I'}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 font-arabic mt-0.5">
              لَوْحَةُ تَحَكُّمِ مُعَلِّمِ اللُّغَةِ الْعَرَبِيَّةِ لِلْمَرْحَلَةِ الثَّانَوِيَّةِ
            </p>
          </div>
        </div>

        {/* Quick action: Print whole page */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rekap</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Tingkat Kehadiran</span>
            <p className="text-2xl font-black text-slate-800">{hadirRate}%</p>
            <span className="text-[11px] text-emerald-600 font-semibold">{hadirCount} Siswa Hadir</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Rata-rata Nilai Ujian</span>
            <p className="text-2xl font-black text-slate-800">{avgQuizScore || 85}</p>
            <span className="text-[11px] text-amber-600 font-semibold">Skala 0 - 100</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Total Ujian Dikerjakan</span>
            <p className="text-2xl font-black text-slate-800">{totalQuizzesTaken}</p>
            <span className="text-[11px] text-sky-600 font-semibold">Evaluasi Mandiri</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Total Kosa Kata</span>
            <p className="text-2xl font-black text-slate-800">{cards.length}</p>
            <span className="text-[11px] text-purple-600 font-semibold">3 Tema SMA</span>
          </div>
        </div>
      </div>

      {/* Admin Panel Tab Bar */}
      <div className="flex border-b border-slate-200 space-x-2 sm:space-x-4 overflow-x-auto">
        {[
          { id: 'attendance', label: 'Rekap Presensi Siswa', icon: ClipboardCheck },
          { id: 'grades', label: 'Buku Nilai & Ujian', icon: Award },
          { id: 'mufrodat', label: 'Kelola Kosa Kata', icon: PlusCircle },
          { id: 'ai-generator', label: 'Generator Soal AI', icon: Bot },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: REKAP PRESENSI SISWA --- */}
      {activeAdminTab === 'attendance' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Rekapitulasi Presensi Seluruh Siswa SMA
              </h3>
              <p className="text-xs text-slate-500">
                Pencatatan kehadiran mata pelajaran Bahasa Arab SMA
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportAttendanceCSV}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh CSV Presensi</span>
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
            <span className="font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>

            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">Semua Kelas SMA</option>
              <option value="X-1 SMA">X-1 SMA</option>
              <option value="X-2 SMA">X-2 SMA</option>
              <option value="XI-IPA 1 SMA">XI-IPA 1 SMA</option>
              <option value="XI-IPA 2 SMA">XI-IPA 2 SMA</option>
              <option value="XI-IPS 1 SMA">XI-IPS 1 SMA</option>
              <option value="XII-IPA 1 SMA">XII-IPA 1 SMA</option>
              <option value="XII-IPS 1 SMA">XII-IPS 1 SMA</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-medium focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
              <option value="Alpa">Alpa</option>
            </select>

            <span className="text-slate-400 ml-auto">
              Menampilkan <strong>{filteredAttendance.length}</strong> data
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Tanggal & Waktu</th>
                  <th className="py-3 px-4 text-center">Status Kehadiran</th>
                  <th className="py-3 px-4">Keterangan</th>
                  <th className="py-3 px-4 text-center">Aksi Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {rec.userName}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                      {rec.studentClass}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      {rec.date} <span className="text-slate-400">({rec.time})</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <select
                        value={rec.status}
                        onChange={(e) => updateAttendanceStatus(rec.id, e.target.value as AttendanceStatus)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg border transition-colors cursor-pointer ${
                          rec.status === 'Hadir'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : rec.status === 'Sakit'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : rec.status === 'Izin'
                            ? 'bg-sky-50 text-sky-800 border-sky-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Izin">Izin</option>
                        <option value="Alpa">Alpa</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">
                      {rec.notes || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => deleteAttendanceRecord(rec.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus rekaman ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: BUKU NILAI & UJIAN --- */}
      {activeAdminTab === 'grades' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Buku Nilai & Ranking Ujian Siswa SMA
              </h3>
              <p className="text-xs text-slate-500">
                Hasil pengerjaan uji soal mufrodat oleh siswa
              </p>
            </div>

            <button
              type="button"
              onClick={exportGradesCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Unduh Buku Nilai (CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Tema Ujian</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4 text-center">Benar / Total</th>
                  <th className="py-3 px-4 text-center">Skor Nilai</th>
                  <th className="py-3 px-4">Predikat SMA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizResults.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {q.userName}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                      {q.studentClass}
                    </td>
                    <td className="py-3.5 px-4 capitalize font-medium text-slate-700">
                      {q.category}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                      {q.date}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                      {q.correctAnswers} / {q.totalQuestions}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-sm font-black px-2.5 py-1 rounded-xl ${
                        q.score >= 90
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.score >= 75
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {q.score}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-700">
                      {q.predicate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 3: KELOLA KOSA KATA --- */}
      {activeAdminTab === 'mufrodat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-600" />
              <span>Tambah Kosakata Baru</span>
            </h3>
            <p className="text-xs text-slate-500">
              Guru dapat memperkaya materi kartu mufrodat untuk siswa.
            </p>

            {cardSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cardSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddCard} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Lafadz Arab Berharakat Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={arabic}
                  onChange={(e) => setArabic(e.target.value)}
                  placeholder="مَطَارٌ دَوْلِيٌّ"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-base font-arabic font-bold text-right focus:outline-none focus:ring-2 focus:ring-amber-500"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Transliterasi Latin
                </label>
                <input
                  type="text"
                  value={transliteration}
                  onChange={(e) => setTransliteration(e.target.value)}
                  placeholder="Mathaarun Dawliyyun"
                  className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Arti Bahasa Indonesia *
                </label>
                <input
                  type="text"
                  required
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder="Bandara Internasional"
                  className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Kategori Tema
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MufrodatCategory)}
                    className="block w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="sekolah">Sekolah (المدرسة)</option>
                    <option value="hewan">Hewan (الحيوانات)</option>
                    <option value="profesi">Profesi (المهن)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Jenis
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="block w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="mudzakkar">Mudzakkar (Maskulin)</option>
                    <option value="muannats">Mu'annats (Feminin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Contoh Kalimat Arab (Opsional)
                </label>
                <input
                  type="text"
                  value={sentenceArabic}
                  onChange={(e) => setSentenceArabic(e.target.value)}
                  placeholder="يَهْبِطُ الطَّائِرُ فِي الْمَطَارِ"
                  className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm font-arabic font-bold text-right"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Arti Contoh Kalimat
                </label>
                <input
                  type="text"
                  value={sentenceIndo}
                  onChange={(e) => setSentenceIndo(e.target.value)}
                  placeholder="Pesawat mendarat di bandara"
                  className="block w-full px-3 py-1.5 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-amber-600/30 cursor-pointer"
              >
                + Simpan Kartu Mufrodat
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-800 text-base">
              Daftar Kosa Kata Tersedia ({cards.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-[550px] overflow-y-auto pr-2">
              {cards.map((c) => (
                <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-arabic text-xl font-bold text-slate-900 w-36 text-right" dir="rtl">
                      {c.arabic}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{c.meaning}</p>
                      <p className="text-[11px] text-slate-500 italic">{c.transliteration}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                      {c.category}
                    </span>
                    {c.isCustom && (
                      <button
                        type="button"
                        onClick={() => deleteCard(c.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus kosa kata kustom ini"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: GENERATOR SOAL AI --- */}
      {activeAdminTab === 'ai-generator' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
          <div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
              Ditenagai Gemini AI Server-Side
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-2 flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-600" />
              <span>Generator Soal Ujian Bahasa Arab SMA Otomatis</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Buat paket butir soal pilihan ganda baru dengan kaidah kurikulum SMA secara instan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Pilih Tema Soal:
              </label>
              <select
                value={aiQuizTheme}
                onChange={(e) => setAiQuizTheme(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="Fasilitas dan Peralatan Sekolah SMA">Sekolah (المدرسة)</option>
                <option value="Hewan dan Karakteristiknya dalam Teks Arab">Hewan (الحيوانات)</option>
                <option value="Profesi dan Cita-cita Masa Depan">Profesi (المهن)</option>
                <option value="Kombinasi Tematik SMA Fase E & F">Campuran SMA</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Jumlah Soal:
              </label>
              <select
                value={aiQuizCount}
                onChange={(e) => setAiQuizCount(Number(e.target.value))}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value={3}>3 Soal Cepat</option>
                <option value={5}>5 Soal Standar</option>
              </select>
            </div>

            <button
              type="button"
              disabled={isGeneratingQuiz}
              onClick={handleGenerateAIQuiz}
              className="mt-auto px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isGeneratingQuiz ? 'Menyusun Soal...' : 'Generate Soal Baru'}</span>
            </button>
          </div>

          {generatedQuestions.length > 0 && (
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-sm text-slate-800">
                Pratinjau Butir Soal Hasil AI:
              </h4>

              {generatedQuestions.map((q, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                  <p className="font-bold text-xs text-slate-700">Soal {idx + 1}: {q.question}</p>
                  {q.arabicWord && (
                    <p className="font-arabic text-xl font-bold text-slate-900" dir="rtl">{q.arabicWord}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {q.options?.map((opt: string, oIdx: number) => (
                      <div
                        key={oIdx}
                        className={`p-2 rounded-xl border ${
                          oIdx === q.correctIndex
                            ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        {['A', 'B', 'C', 'D'][oIdx]}. {opt} {oIdx === q.correctIndex ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="text-[11px] text-slate-500 italic mt-1 bg-white p-2 rounded-lg border border-slate-100">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
