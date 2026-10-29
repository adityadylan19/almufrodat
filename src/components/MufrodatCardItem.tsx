import React, { useState } from 'react';
import { MufrodatCard } from '../types';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from './CategoryIcon';
import { speakArabic, soundFX } from '../utils/audio';
import {
  Volume2,
  CheckCircle,
  Bookmark,
  RotateCw,
  BookOpen,
  Sparkles,
  Bot
} from 'lucide-react';

interface MufrodatCardItemProps {
  card: MufrodatCard;
  onAskAI?: (card: MufrodatCard) => void;
  speed?: number;
}

export const MufrodatCardItem: React.FC<MufrodatCardItemProps> = ({
  card,
  onAskAI,
  speed = 0.85
}) => {
  const { memorizedCardIds, toggleMemorized, favoriteCardIds, toggleFavorite } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const isMemorized = memorizedCardIds.includes(card.id);
  const isFavorite = favoriteCardIds.includes(card.id);

  const handleFlip = () => {
    soundFX.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleAudio = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await speakArabic(card.arabic, speed);
    setIsPlayingAudio(false);
  };

  const categoryLabels: Record<string, { label: string; arabic: string; badgeClass: string; bgClass: string }> = {
    sekolah: {
      label: 'Sekolah',
      arabic: 'المَدْرَسَةُ',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      bgClass: 'from-emerald-50/80 to-teal-50/40'
    },
    hewan: {
      label: 'Hewan',
      arabic: 'الحَيَوَانَاتُ',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      bgClass: 'from-amber-50/80 to-orange-50/40'
    },
    profesi: {
      label: 'Profesi',
      arabic: 'المِهَنُ',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
      bgClass: 'from-sky-50/80 to-blue-50/40'
    }
  };

  const catInfo = categoryLabels[card.category] || categoryLabels.sekolah;

  return (
    <div className="perspective-1000 w-full h-[370px] select-none">
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* --- FRONT SIDE --- */}
        <div
          onClick={handleFlip}
          className={`absolute inset-0 backface-hidden rounded-3xl p-6 bg-gradient-to-b ${catInfo.bgClass} bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer group`}
        >
          {/* Top Bar: Category badge, Gender, Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catInfo.badgeClass}`}>
                {catInfo.label}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-arabic">
                {card.gender === 'muannats' ? 'مُؤَنَّثٌ' : 'مُذَكَّرٌ'}
              </span>
            </div>

            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => toggleFavorite(card.id)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isFavorite ? 'text-amber-500 bg-amber-50' : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                }`}
                title={isFavorite ? 'Hapus favorit' : 'Simpan favorit'}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                type="button"
                onClick={() => toggleMemorized(card.id)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  isMemorized ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                }`}
                title={isMemorized ? 'Sudah Dihafal' : 'Tandai sudah hafal'}
              >
                <CheckCircle className={`w-4 h-4 ${isMemorized ? 'fill-emerald-100' : ''}`} />
              </button>
            </div>
          </div>

          {/* Center Graphic & Arabic Word */}
          <div className="flex flex-col items-center justify-center my-auto text-center px-2">
            {/* Visual Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-emerald-700 mb-4 group-hover:scale-110 transition-transform">
              <CategoryIcon name={card.iconName} className="w-8 h-8" />
            </div>

            {/* Arabic Word with full Harakat */}
            <h3
              className="font-arabic text-3xl sm:text-4xl font-bold text-slate-800 leading-tight mb-2 tracking-wide"
              dir="rtl"
            >
              {card.arabic}
            </h3>

            {/* Transliteration */}
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 italic">
              {card.transliteration}
            </p>
          </div>

          {/* Bottom Bar: Audio button & Flip Prompt */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs'
              }`}
              title="Dengarkan lafadz bahasa Arab"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isPlayingAudio ? 'Melafalkan...' : 'Dengar'}</span>
            </button>

            <span className="text-[11px] text-slate-400 flex items-center gap-1 group-hover:text-emerald-600 transition-colors">
              <span>Balik kartu</span>
              <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            </span>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div
          onClick={handleFlip}
          className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-white border border-emerald-200 shadow-md flex flex-col justify-between cursor-pointer"
        >
          {/* Top Info */}
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
              <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase">
                Arti & Kaidah Kata
              </span>
              <span className="font-arabic text-xs font-semibold text-slate-500">
                {card.arabic}
              </span>
            </div>

            {/* Indonesian Meaning */}
            <div className="mb-3">
              <h4 className="text-xl font-extrabold text-slate-800">
                {card.meaning}
              </h4>
              {card.plural && (
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-semibold text-slate-700">Jamak: </span>
                  <span className="font-arabic font-bold text-emerald-800 text-sm">{card.plural}</span>
                </p>
              )}
            </div>

            {/* Example Sentence Box */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 mb-3 text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-emerald-600" />
                <span>Contoh Kalimat SMA:</span>
              </p>
              <p className="font-arabic text-base sm:text-lg font-bold text-slate-800 text-right leading-relaxed mb-1" dir="rtl">
                {card.exampleSentence.arabic}
              </p>
              <p className="text-[11px] font-semibold text-emerald-700 italic">
                {card.exampleSentence.transliteration}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                "{card.exampleSentence.indonesian}"
              </p>
            </div>

            {/* Learning Notes */}
            {card.notes && (
              <p className="text-[11px] text-slate-500 italic bg-amber-50/70 p-2 rounded-xl border border-amber-100">
                💡 {card.notes}
              </p>
            )}
          </div>

          {/* Bottom Back Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            {onAskAI && (
              <button
                type="button"
                onClick={() => onAskAI(card)}
                className="flex items-center gap-1 text-[11px] font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg border border-teal-200 transition-colors cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-teal-600" />
                <span>Tanya Ustadz AI</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleFlip}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 ml-auto cursor-pointer"
            >
              <RotateCw className="w-3 h-3" />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
