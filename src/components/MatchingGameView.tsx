import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MufrodatCard } from '../types';
import { speakArabic, soundFX } from '../utils/audio';
import {
  Layers,
  RotateCcw,
  Trophy,
  Sparkles,
  Timer,
  CheckCircle,
  HelpCircle,
  Award
} from 'lucide-react';

interface GameTile {
  uniqueId: string;
  cardId: string;
  type: 'arabic' | 'meaning';
  content: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MatchingGameView: React.FC = () => {
  const { cards } = useApp();

  const [category, setCategory] = useState<string>('all');
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<GameTile[]>([]);
  const [matchesCount, setMatchesCount] = useState<number>(0);
  const [totalPairs, setTotalPairs] = useState<number>(6);
  const [moves, setMoves] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Initialize Game Board
  const initGame = () => {
    // Filter pool
    let pool = cards;
    if (category !== 'all') {
      pool = cards.filter(c => c.category === category);
    }
    if (pool.length < 6) pool = cards; // fallback

    // Shuffle and pick 6 cards
    const shuffledCards = [...pool].sort(() => 0.5 - Math.random()).slice(0, 6);
    setTotalPairs(shuffledCards.length);

    const generatedTiles: GameTile[] = [];
    shuffledCards.forEach((c) => {
      generatedTiles.push({
        uniqueId: `ar-${c.id}`,
        cardId: c.id,
        type: 'arabic',
        content: c.arabic,
        category: c.category,
        isFlipped: false,
        isMatched: false
      });
      generatedTiles.push({
        uniqueId: `id-${c.id}`,
        cardId: c.id,
        type: 'meaning',
        content: c.meaning,
        category: c.category,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle tiles
    setTiles(generatedTiles.sort(() => 0.5 - Math.random()));
    setSelectedTiles([]);
    setMatchesCount(0);
    setMoves(0);
    setTimer(0);
    setIsCompleted(false);
    setIsGameActive(true);
  };

  useEffect(() => {
    initGame();
  }, [category]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, isCompleted]);

  const handleTileClick = (tile: GameTile) => {
    if (tile.isMatched || tile.isFlipped || selectedTiles.length === 2) return;

    soundFX.playFlip();

    // If arabic tile, speak it
    if (tile.type === 'arabic') {
      speakArabic(tile.content);
    }

    const updatedTiles = tiles.map(t =>
      t.uniqueId === tile.uniqueId ? { ...t, isFlipped: true } : t
    );
    setTiles(updatedTiles);

    const newSelected = [...selectedTiles, tile];
    setSelectedTiles(newSelected);

    if (newSelected.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newSelected;

      // Check match: same cardId, different type
      if (first.cardId === second.cardId && first.type !== second.type) {
        soundFX.playCorrect();
        setTimeout(() => {
          setTiles(prev =>
            prev.map(t =>
              t.cardId === first.cardId ? { ...t, isMatched: true, isFlipped: true } : t
            )
          );
          setSelectedTiles([]);
          setMatchesCount(m => {
            const next = m + 1;
            if (next === totalPairs) {
              setIsCompleted(true);
              setIsGameActive(false);
            }
            return next;
          });
        }, 400);
      } else {
        soundFX.playWrong();
        setTimeout(() => {
          setTiles(prev =>
            prev.map(t =>
              t.uniqueId === first.uniqueId || t.uniqueId === second.uniqueId
                ? { ...t, isFlipped: false }
                : t
            )
          );
          setSelectedTiles([]);
        }, 900);
      }
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Game Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Layers className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
              Game Jodohkan Mufrodat
            </h2>
            <span className="font-arabic text-sm text-emerald-800 font-semibold px-2 py-0.5 rounded-full bg-emerald-50">
              لُعْبَةُ الْمُطَابَقَةِ
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Cocokkan kartu kata bahasa Arab dengan kartu artinya dalam bahasa Indonesia secepat mungkin!
          </p>
        </div>

        {/* Stats & Reset */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Timer className="w-4 h-4 text-emerald-600" />
            <span>Waktu: <strong>{formatTimer(timer)}</strong></span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Langkah: <strong>{moves}</strong></span>
          </div>

          <button
            type="button"
            onClick={initGame}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-colors shadow-xs cursor-pointer"
            title="Mulai Ulang Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori:</span>
        {['all', 'sekolah', 'hewan', 'profesi'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
              category === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Campuran (Acak)' : cat}
          </button>
        ))}
      </div>

      {/* Game Board Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {tiles.map((tile) => {
          const isSelected = selectedTiles.some(s => s.uniqueId === tile.uniqueId);
          const showContent = tile.isFlipped || tile.isMatched;

          return (
            <div
              key={tile.uniqueId}
              onClick={() => handleTileClick(tile)}
              className={`h-28 sm:h-32 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-300 transform ${
                tile.isMatched
                  ? 'bg-emerald-100/90 border-2 border-emerald-400 text-emerald-950 scale-98 shadow-inner'
                  : showContent
                  ? 'bg-white border-2 border-emerald-500 shadow-md scale-102'
                  : 'bg-gradient-to-br from-emerald-800 to-teal-900 text-white hover:brightness-110 shadow-sm border border-emerald-700'
              }`}
            >
              {showContent ? (
                <div className="animate-in fade-in zoom-in duration-150">
                  {tile.type === 'arabic' ? (
                    <div>
                      <p className="font-arabic text-xl sm:text-2xl font-bold text-slate-900 leading-tight" dir="rtl">
                        {tile.content}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Bahasa Arab
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug">
                        {tile.content}
                      </p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600">
                        Arti Indonesia
                      </span>
                    </div>
                  )}

                  {tile.isMatched && (
                    <div className="mt-1 flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-80">
                  <span className="font-arabic text-3xl font-bold mb-1">ع</span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-200">
                    Buka Kartu
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-emerald-100 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <p className="font-arabic text-3xl font-bold text-emerald-800 mb-1" dir="rtl">
              مُمْتَازٌ! أَحْسَنْتَ
            </p>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Luar Biasa, Kamu Berhasil!
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Seluruh pasangan mufrodat berhasil dijodohkan dengan sempurna.
            </p>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl mb-6">
              <div>
                <p className="text-xs text-slate-400 font-semibold">Total Waktu</p>
                <p className="text-xl font-extrabold text-emerald-700">{formatTimer(timer)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold">Jumlah Langkah</p>
                <p className="text-xl font-extrabold text-slate-800">{moves} kali</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={initGame}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-emerald-600/30 cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Sekali Lagi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
