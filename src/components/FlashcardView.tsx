import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MufrodatCardItem } from './MufrodatCardItem';
import { MufrodatCard } from '../types';
import {
  Search,
  Filter,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  LayoutGrid,
  Maximize2,
  Table,
  CheckCircle2,
  Bookmark,
  Volume2
} from 'lucide-react';

interface FlashcardViewProps {
  onAskAI: (card?: MufrodatCard) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({ onAskAI }) => {
  const { cards, memorizedCardIds, favoriteCardIds } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'focus' | 'table'>('grid');
  const [audioSpeed, setAudioSpeed] = useState<number>(0.85);
  const [focusIndex, setFocusIndex] = useState<number>(0);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      // Category filter
      if (selectedCategory === 'sekolah' && card.category !== 'sekolah') return false;
      if (selectedCategory === 'hewan' && card.category !== 'hewan') return false;
      if (selectedCategory === 'profesi' && card.category !== 'profesi') return false;
      if (selectedCategory === 'memorized' && !memorizedCardIds.includes(card.id)) return false;
      if (selectedCategory === 'unmemorized' && memorizedCardIds.includes(card.id)) return false;
      if (selectedCategory === 'favorite' && !favoriteCardIds.includes(card.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchArabic = card.arabic.includes(query);
        const matchTrans = card.transliteration.toLowerCase().includes(query);
        const matchMeaning = card.meaning.toLowerCase().includes(query);
        return matchArabic || matchTrans || matchMeaning;
      }

      return true;
    });
  }, [cards, selectedCategory, searchQuery, memorizedCardIds, favoriteCardIds]);

  // Memorization Statistics
  const totalCards = cards.length;
  const memorizedCount = memorizedCardIds.length;
  const memorizedPercent = totalCards > 0 ? Math.round((memorizedCount / totalCards) * 100) : 0;

  const currentFocusCard = filteredCards[focusIndex] || filteredCards[0];

  const handleNextFocus = () => {
    if (focusIndex < filteredCards.length - 1) {
      setFocusIndex(focusIndex + 1);
    } else {
      setFocusIndex(0);
    }
  };

  const handlePrevFocus = () => {
    if (focusIndex > 0) {
      setFocusIndex(focusIndex - 1);
    } else {
      setFocusIndex(filteredCards.length - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner with Arabic Quote & Memorization Progress */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
          <span className="font-arabic text-9xl font-bold">كِتَاب</span>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Kurikulum Bahasa Arab SMA Fase E & F
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pembelajaran Mufrodat Interaktif
            </h2>
            <p className="font-arabic text-xl text-emerald-100 font-semibold leading-relaxed" dir="rtl">
              العِلْمُ فِي الصِّغَرِ كَالنَّقْشِ عَلَى الحَجَرِ
            </p>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Tingkatkan penguasaan kosa kata tematik Sekolah, Hewan, dan Profesi dengan kartu 3D berharakat, audio lafadz, dan contoh kalimat komunikatif.
            </p>
          </div>

          {/* Memorization Progress Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Target Hafalan Mufrodat
              </span>
              <span className="text-amber-300 font-bold text-sm">{memorizedPercent}%</span>
            </div>

            <div className="w-full bg-emerald-950/60 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${memorizedPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-[11px] text-emerald-200">
              <span>Sudah Dihafal: <strong>{memorizedCount}</strong> kata</span>
              <span>Total: <strong>{totalCards}</strong> kata</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search, View Modes & Audio Speed */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search & Top Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kosa kata, latin, atau arti..."
              className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            {/* Audio Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
              <Volume2 className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <button
                type="button"
                onClick={() => setAudioSpeed(0.85)}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  audioSpeed === 0.85 ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-500'
                }`}
                title="Kecepatan Lafadz Normal"
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setAudioSpeed(0.65)}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  audioSpeed === 0.65 ? 'bg-white shadow-xs text-emerald-700 font-bold' : 'text-slate-500'
                }`}
                title="Kecepatan Lafadz Pelan untuk Menyimak"
              >
                Pelan
              </button>
            </div>

            {/* View Mode Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Tampilan Grid Kartu"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('focus');
                  setFocusIndex(0);
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'focus' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Mode Belajar Fokus (Carousel Satu per Satu)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Daftar Tabel Ringkas"
              >
                <Table className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5" />
            Tema:
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({cards.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('sekolah')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'sekolah'
                ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/30'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <span>🏫 Sekolah (المَدْرَسَةُ)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('hewan')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'hewan'
                ? 'bg-amber-600 text-white shadow-xs shadow-amber-600/30'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <span>🦁 Hewan (الحَيَوَانَاتُ)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('profesi')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'profesi'
                ? 'bg-sky-600 text-white shadow-xs shadow-sky-600/30'
                : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
            }`}
          >
            <span>👨‍⚕️ Profesi (المِهَنُ)</span>
          </button>

          <div className="h-4 border-l border-slate-300 mx-1 shrink-0"></div>

          <button
            type="button"
            onClick={() => setSelectedCategory('unmemorized')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
              selectedCategory === 'unmemorized'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <span>Belum Dihafal</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('memorized')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
              selectedCategory === 'memorized'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sudah Hafal ({memorizedCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('favorite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
              selectedCategory === 'favorite'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Favorit ({favoriteCardIds.length})</span>
          </button>
        </div>
      </div>

      {/* --- CONTENT BASED ON VIEW MODE --- */}

      {/* 1. GRID MODE */}
      {viewMode === 'grid' && (
        <div>
          {filteredCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <p className="text-slate-500 font-medium">
                Tidak ada kosa kata yang cocok dengan filter atau pencarian Anda.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <MufrodatCardItem
                  key={card.id}
                  card={card}
                  onAskAI={onAskAI}
                  speed={audioSpeed}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. FOCUS CAROUSEL MODE */}
      {viewMode === 'focus' && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between text-sm font-semibold text-slate-600 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span>
              Kartu ke <strong className="text-emerald-700">{focusIndex + 1}</strong> dari{' '}
              {filteredCards.length}
            </span>
            <span className="text-xs text-slate-400">Gunakan panah untuk navigasi</span>
          </div>

          {currentFocusCard ? (
            <div className="h-[400px]">
              <MufrodatCardItem
                card={currentFocusCard}
                onAskAI={onAskAI}
                speed={audioSpeed}
              />
            </div>
          ) : (
            <p className="text-center text-slate-500">Tidak ada kartu tersedia.</p>
          )}

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={handlePrevFocus}
              className="flex-1 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const randIndex = Math.floor(Math.random() * filteredCards.length);
                setFocusIndex(randIndex);
              }}
              className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-2xl shadow-xs cursor-pointer"
              title="Acak Kartu"
            >
              <Shuffle className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNextFocus}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 3. TABLE VIEW MODE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="py-3.5 px-4">No</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4 text-right">Lafadz Arab (المفردات)</th>
                  <th className="py-3.5 px-4">Transliterasi</th>
                  <th className="py-3.5 px-4">Arti Indonesia</th>
                  <th className="py-3.5 px-4">Contoh Kalimat</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCards.map((card, idx) => {
                  const isHafal = memorizedCardIds.includes(card.id);
                  return (
                    <tr key={card.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                          {card.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-arabic text-xl font-bold text-slate-900" dir="rtl">
                          {card.arabic}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-emerald-800 text-xs italic">
                        {card.transliteration}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 text-sm">
                        {card.meaning}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs truncate">
                        {card.exampleSentence.indonesian}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isHafal ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {isHafal ? 'Hafal ✓' : 'Belum'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
