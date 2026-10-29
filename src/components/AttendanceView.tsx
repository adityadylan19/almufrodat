import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AttendanceRecord, AttendanceStatus } from '../types';
import {
  ClipboardCheck,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  AlertCircle,
  FileCheck,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { currentUser, attendanceRecords, addAttendanceRecord, isAdmin, setActiveTab } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const nowTimeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  // Form state
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentClass, setStudentClass] = useState(currentUser?.studentClass || 'XI-IPA 1 SMA');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState(nowTimeStr);
  const [status, setStatus] = useState<AttendanceStatus>('Hadir');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if current user already checked in today
  const alreadyCheckedInToday = attendanceRecords.some(
    r => (r.userId === currentUser?.id || r.userName === currentUser?.name) && r.date === todayStr
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim()) {
      setErrorMsg('Nama siswa tidak boleh kosong');
      return;
    }

    addAttendanceRecord({
      userId: currentUser?.id || 'std-' + Date.now().toString(36),
      userName: studentName.trim(),
      studentClass,
      nisn: currentUser?.nisn || '0061234500',
      date,
      time,
      status,
      subject: 'Bahasa Arab SMA',
      notes: notes.trim() || (status === 'Hadir' ? 'Hadir tepat waktu mengikuti pembelajaran' : ''),
      verified: true
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setNotes('');
    }, 3000);
  };

  // Filter attendance records for current student view
  const myRecords = isAdmin
    ? attendanceRecords
    : attendanceRecords.filter(r => r.userId === currentUser?.id || r.userName === currentUser?.name);

  // Stats calculation
  const totalMyRecords = myRecords.length;
  const hadirCount = myRecords.filter(r => r.status === 'Hadir').length;
  const sakitCount = myRecords.filter(r => r.status === 'Sakit').length;
  const izinCount = myRecords.filter(r => r.status === 'Izin').length;
  const hadirPercent = totalMyRecords > 0 ? Math.round((hadirCount / totalMyRecords) * 100) : 100;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-300" />
            Sistem Presensi & Kehadiran SMA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Absensi Pembelajaran Bahasa Arab
          </h2>
          <p className="font-arabic text-xl text-emerald-200 font-bold" dir="rtl">
            كَشْفُ حُضُوْرِ الطُّلَّابِ وَالطَّالِبَاتِ
          </p>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Catat kehadiran Anda pada setiap pertemuan mata pelajaran Bahasa Arab SMA. Data tersimpan rapi dan dapat ditinjau langsung oleh guru pengampu.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-center min-w-[220px]">
          <p className="text-xs text-emerald-200 font-semibold mb-1">Tingkat Kehadiran:</p>
          <span className="text-4xl font-extrabold text-amber-300">{hadirPercent}%</span>
          <p className="text-[11px] text-emerald-100 mt-1">
            {hadirCount} Hadir dari {totalMyRecords} Total Pertemuan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- FORM PRESENSI (LEFT COLUMN) --- */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5 sticky top-24">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Formulir Presensi Hari Ini</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 font-arabic">حُضُوْرٌ</span>
            </div>

            {alreadyCheckedInToday && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-3.5 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Anda sudah melakukan presensi hari ini!</p>
                  <p className="text-emerald-700 mt-0.5">
                    Data kehadiran Anda telah tercatat dan diverifikasi di sistem sekolah.
                  </p>
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl p-3 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="font-semibold">Alhamdulillah, presensi berhasil dicatat!</span>
              </div>
            )}

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-3 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Nama Siswa
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Nama Lengkap Siswa"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Kelas SMA
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
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

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Waktu
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="block w-full px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Status Radio Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Status Kehadiran:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Hadir', arabic: 'حَاضِرٌ', color: 'emerald' },
                    { id: 'Sakit', arabic: 'مَرِيْضٌ', color: 'amber' },
                    { id: 'Izin', arabic: 'إِذْنٌ', color: 'sky' },
                    { id: 'Alpa', arabic: 'غَائِبٌ', color: 'rose' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatus(st.id as AttendanceStatus)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                        status === st.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-2xs ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <span className="text-xs">{st.id}</span>
                      <span className="font-arabic text-xs font-semibold opacity-75">{st.arabic}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Keterangan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Hadir di kelas / Surat dokter menyusul"
                  className="block w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Kirim Presensi Sekarang</span>
              </button>
            </form>
          </div>
        </div>

        {/* --- RIWAYAT PRESENSI TABEL (RIGHT COLUMN) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Counter Badges */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Hadir</span>
              <p className="text-xl font-black text-emerald-600">{hadirCount}</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Sakit</span>
              <p className="text-xl font-black text-amber-600">{sakitCount}</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Izin</span>
              <p className="text-xl font-black text-sky-600">{izinCount}</p>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Alpa</span>
              <p className="text-xl font-black text-rose-600">
                {myRecords.filter(r => r.status === 'Alpa').length}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  Rekap Catatan Kehadiran
                </h3>
                <p className="text-xs text-slate-500">
                  {isAdmin ? 'Semua siswa terdaftar di mata pelajaran Bahasa Arab' : `Histori absensi untuk: ${currentUser?.name}`}
                </p>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors cursor-pointer"
                >
                  Buka Panel Rekap Admin →
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] font-bold">
                  <tr>
                    <th className="py-3 px-4">Tanggal & Waktu</th>
                    <th className="py-3 px-4">Nama Siswa</th>
                    <th className="py-3 px-4">Kelas</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">Keterangan</th>
                    <th className="py-3 px-4 text-center">Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                        Belum ada riwayat absensi yang tercatat.
                      </td>
                    </tr>
                  ) : (
                    myRecords.map((r) => {
                      const statusStyles = {
                        Hadir: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                        Sakit: 'bg-amber-100 text-amber-800 border-amber-200',
                        Izin: 'bg-sky-100 text-sky-800 border-sky-200',
                        Alpa: 'bg-rose-100 text-rose-800 border-rose-200',
                      }[r.status];

                      return (
                        <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                            <span className="font-bold text-slate-800">{r.date}</span>
                            <span className="text-slate-400 ml-1.5">({r.time})</span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {r.userName}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                            {r.studentClass}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyles}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">
                            {r.notes || '-'}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Valid</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
