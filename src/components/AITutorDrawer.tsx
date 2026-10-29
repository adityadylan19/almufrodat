import React, { useState, useEffect, useRef } from 'react';
import { MufrodatCard } from '../types';
import { speakArabic } from '../utils/audio';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Volume2,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCard?: MufrodatCard | null;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  arabicAudio?: string;
  timestamp: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({
  isOpen,
  onClose,
  selectedCard
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `أَهْلًا وَسَهْلًا! Ahlan wa Sahlan! Saya **Ustadz AI**, asisten pembelajaran bahasa Arab khusus siswa SMA.

Silakan tanyakan seputar:
1. Makna dan cara melafalkan mufrodat (sekolah, hewan, profesi)
2. Kaidah dasar (mudzakkar, mu'annats, jamak taksir)
3. Contoh kalimat percakapan sehari-hari di SMA!`,
      timestamp: 'Baru saja'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // When a card is selected from card item "Tanya Ustadz AI"
  useEffect(() => {
    if (selectedCard) {
      const prompt = `Ustadz, tolong jelaskan lebih mendalam tentang kata "${selectedCard.arabic}" (${selectedCard.meaning}), termasuk contoh kalimat dan tips menghafalnya.`;
      handleSendMessage(prompt);
    }
  }, [selectedCard]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now().toString(36),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          contextCategory: selectedCard?.category || 'Umum SMA',
          studentLevel: 'Tingkat SMA'
        })
      });

      const data = await res.json();
      const reply = data.reply || 'Maaf, tidak dapat memproses jawaban saat ini.';

      const aiMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now().toString(36),
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: 'msg-ai-err-' + Date.now().toString(36),
        sender: 'ai',
        text: `Mumtaz! Kosa kata yang Anda tanyakan sangat penting dalam kurikulum SMA. Pastikan Anda mengingat harakat akhir dan mengulang lafalnya dengan fasih. Jangan ragu menyimak audio di kartu kosa kata!`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Contoh percakapan di sekolah SMA',
    'Perbedaan Mudzakkar & Mu\'annats',
    'Tips cepat menghafal mufrodat',
    'Jelaskan kata كِتَابٌ dan jamaknya'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-4 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-base">Ustadz AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-amber-950">
                  Tutor SMA
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Konsultasi Mufrodat & Tata Bahasa Arab
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm shadow-2xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                }`}
              >
                {/* Render simple formatting */}
                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.sender === 'ai' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ustadz AI</span>
                    <button
                      type="button"
                      onClick={() => {
                        // Extract any arabic characters from text and speak
                        const arabicTextMatch = m.text.match(/[\u0600-\u06FF\s]+/g);
                        if (arabicTextMatch) {
                          speakArabic(arabicTextMatch.join(' '));
                        }
                      }}
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Lafalkan Arab</span>
                    </button>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit">
              <Bot className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>Ustadz AI sedang mengetik jawaban...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-[11px] font-semibold shrink-0 border border-emerald-200 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ketik pertanyaan seputar bahasa Arab..."
              className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
