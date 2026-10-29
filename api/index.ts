import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini SDK with server-side environment key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Mufrodat SMA Express Backend Active',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString()
  });
});

// Admin verification endpoint
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'madityadahlan' && password === '051119') {
    return res.json({
      success: true,
      user: {
        id: 'admin_madityadahlan',
        username: 'madityadahlan',
        name: 'M. Aditya Dahlan, S.Pd.I',
        role: 'admin',
        title: 'Guru Pengampu Bahasa Arab SMA',
        email: 'madityadahlan@sma.sch.id',
        nip: '198905112015031002'
      },
      token: 'admin-auth-token-' + Date.now()
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Username atau kata sandi admin salah!'
  });
});

// AI Arabic Tutor Chat endpoint
app.post('/api/ai/ask', async (req: Request, res: Response) => {
  try {
    const { message, contextCategory, studentLevel } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong' });
    }

    if (!ai) {
      return res.json({
        reply: `Ahlan wa Sahlan! Maaf, fitur AI saat ini berjalan dalam mode offline kosa kata. Namun kosa kata "${message}" terkait tema ${contextCategory || 'Bahasa Arab'} dapat dipelajari langsung melalui kartu mufrodat interaktif dan latihan soal di aplikasi.`,
        isFallback: true
      });
    }

    const systemInstruction = `Anda adalah "Ustadz AI", tutor bahasa Arab ramah dan interaktif khusus untuk siswa SMA di Indonesia.
Pedoman respon:
1. Berikan penjelasan yang mudah dipahami anak SMA (Fase E & F).
2. Setiap kosakata atau kalimat bahasa Arab WAJIB menyertakan harakat/tashkeel lengkap, cara baca (transliterasi latin), dan artinya dalam bahasa Indonesia.
3. Berikan contoh kalimat aplikatif yang relevan dengan kehidupan siswa SMA (sekolah, pertemanan, cita-cita, hewan, profesi).
4. Gunakan sapaan yang hangat seperti "Ahlan wa Sahlan ya Akhi/Ukhti" atau "Mumtaz!".
5. Jangan terlalu panjang, maksimal 3-4 paragraf ringkas dan berstruktur rapi dengan poin-poin.`;

    const prompt = `Pertanyaan Siswa SMA (${studentLevel || 'Tingkat SMA'}, Kategori: ${contextCategory || 'Umum'}):
${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || 'Maaf, tidak dapat menghasilkan jawaban saat ini.';
    res.json({ reply, isFallback: false });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    res.status(500).json({
      error: 'Gagal memproses permintaan AI.',
      details: error?.message || 'Server error'
    });
  }
});

// AI Quiz Generator Endpoint (for Teacher/Admin)
app.post('/api/ai/generate-quiz', async (req: Request, res: Response) => {
  try {
    const { category, count = 3, difficulty = 'sedang' } = req.body;

    if (!ai) {
      return res.status(503).json({
        error: 'Layanan AI membutuhkan konfigurasi GEMINI_API_KEY di server.'
      });
    }

    const prompt = `Buatlah ${count} soal pilihan ganda bahasa Arab tingkat SMA tentang tema "${category || 'Sekolah, Hewan, atau Profesi'}" tingkat kesulitan ${difficulty}.
Format HARUS berupa JSON array persis seperti ini (tanpa markdown backtick):
[
  {
    "question": "Kalimat pertanyaan dalam bahasa Indonesia atau Arab berharakat",
    "arabicWord": "Kata Arab dengan harakat lengkap jika relevan",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctIndex": 0,
    "explanation": "Penjelasan ringkas mengapa jawaban ini benar disertai arti lengkap"
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      }
    });

    const text = response.text || '[]';
    const parsedQuestions = JSON.parse(text);
    res.json({ questions: parsedQuestions });
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    res.status(500).json({
      error: 'Gagal membuat soal latihan otomatis',
      details: error?.message
    });
  }
});

// AI Sentence & Makhraj Tips
app.post('/api/ai/mufrodat-deepdive', async (req: Request, res: Response) => {
  try {
    const { word, meaning } = req.body;

    if (!word) {
      return res.status(400).json({ error: 'Kata harus disertakan' });
    }

    if (!ai) {
      return res.json({
        info: {
          word,
          meaning,
          tasrif: 'Bentuk mufrod (tunggal)',
          usageSentence: `ذَهَبَ الطَّالِبُ وَمَعَهُ ${word} (Siswa pergi dan bersamanya ${meaning})`,
          tips: 'Ucapkan dengan vokal harakat yang jelas dan perhatikan panjang pendek mad.'
        }
      });
    }

    const prompt = `Untuk kosakata Arab: "${word}" (arti: "${meaning || ''}")
Berikan analisis edukatif untuk siswa SMA:
1. Jamak / bentuk kata (jika ada)
2. 2 Contoh kalimat percakapan sehari-hari di SMA dengan harakat lengkap dan terjemahan Indonesia
3. Tips pelafalan makhraj huruf yang sering keliru bagi penutur Indonesia
Jawab dalam format JSON:
{
  "jamak": "...",
  "sentences": [
    {"arabic": "...", "indonesian": "..."},
    {"arabic": "...", "indonesian": "..."}
  ],
  "pronunciationTip": "..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const data = JSON.parse(response.text || '{}');
    res.json({ result: data });
  } catch (error: any) {
    console.error('Error in deepdive:', error);
    res.status(500).json({ error: 'Gagal mengambil detail kata' });
  }
});

// Export default app without app.listen as required
export default app;
