import { QuizQuestion } from '../types';

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- KATEGORI SEKOLAH ---
  {
    id: 'q-sch-1',
    category: 'sekolah',
    type: 'pilihan_ganda',
    question: 'Apa arti dari kosakata bahasa Arab di bawah ini?',
    arabicPrompt: 'مَكْتَبَةٌ شَامِلَةٌ',
    options: ['Laboratorium Bahasa', 'Perpustakaan Sekolah', 'Ruang Kepala Sekolah', 'Kantin Sekolah'],
    correctAnswer: 1,
    explanation: 'مَكْتَبَةٌ (Maktabah) artinya adalah Perpustakaan, sedangkan مَكْتَبٌ (Maktab) artinya Meja belajar/kantor.'
  },
  {
    id: 'q-sch-2',
    category: 'sekolah',
    type: 'pilihan_ganda',
    question: 'Manakah bahasa Arab yang tepat untuk ungkapan "Tas Sekolah"?',
    options: ['سَبُّوْرَةٌ مَدْرَسِيَّةٌ', 'كِتَابٌ مَدْرَسِيٌّ', 'حَقِيْبَةٌ مَدْرَسِيَّةٌ', 'مِقْلَمَةٌ جَدِيْدَةٌ'],
    correctAnswer: 2,
    explanation: 'حَقِيْبَةٌ (Haqiybah) berarti tas. Sedangkan سَبُّوْرَةٌ adalah papan tulis dan كِتَابٌ adalah buku.'
  },
  {
    id: 'q-sch-3',
    category: 'sekolah',
    type: 'pilihan_ganda',
    question: 'Lengkapi kalimat berikut: "يَكْتُبُ الْمُدَرِّسُ الدَّرْسَ عَلَى ..."',
    arabicPrompt: 'يَكْتُبُ الْمُدَرِّسُ الدَّرْسَ عَلَى ...',
    options: ['السَّبُّوْرَةِ', 'الْبَابِ', 'السَّقْفِ', 'الشَّارِعِ'],
    correctAnswer: 0,
    explanation: 'Arti kalimat: "Guru menulis pelajaran di atas papan tulis (السَّبُّوْرَةِ)".'
  },
  {
    id: 'q-sch-4',
    category: 'sekolah',
    type: 'audio_lafadz',
    question: 'Dengarkan atau perhatikan lafadz berikut: "مَعْمَلُ اللُّغَاتِ". Fasilitas apakah ini?',
    arabicPrompt: 'مَعْمَلُ اللُّغَاتِ',
    audioPromptText: 'مَعْمَلُ اللُّغَاتِ',
    options: ['Lapangan Olahraga', 'Laboratorium Bahasa', 'Ruang UKS', 'Asrama Siswa'],
    correctAnswer: 1,
    explanation: 'مَعْمَلُ اللُّغَاتِ (Ma\'malul-Lughaat) adalah Laboratorium Bahasa untuk melatih keterampilan istima\' dan kalam.'
  },
  {
    id: 'q-sch-5',
    category: 'sekolah',
    type: 'pilihan_ganda',
    question: 'Bentuk jamak (plural) dari kata كِتَابٌ (Buku) adalah...',
    options: ['كُتُبٌ', 'كِتَابَاتٌ', 'كَاتِبُوْنَ', 'مَكَاتِبُ'],
    correctAnswer: 0,
    explanation: 'Kata كِتَابٌ memiliki jamak taksir كُتُبٌ (Kutub).'
  },

  // --- KATEGORI HEWAN ---
  {
    id: 'q-anm-1',
    category: 'hewan',
    type: 'pilihan_ganda',
    question: 'Hewan yang dijuluki "سَفِيْنَةُ الصَّحْرَاءِ" (Kapal Padang Pasir) adalah...',
    options: ['الْحِصَانُ (Kuda)', 'الْجَمَلُ (Unta)', 'الْفِيْلُ (Gajah)', 'الْأَسَدُ (Singa)'],
    correctAnswer: 1,
    explanation: 'الْجَمَلُ (Unta) dijuluki safinatus-shahra\' karena daya tahan fisiknya di padang pasir yang tandus.'
  },
  {
    id: 'q-anm-2',
    category: 'hewan',
    type: 'pilihan_ganda',
    question: 'Apakah terjemahan bahasa Arab dari kata "Kelinci"?',
    options: ['نَمِرٌ', 'أَرْنَبٌ', 'قِطٌّ', 'طَائِرٌ'],
    correctAnswer: 1,
    explanation: 'أَرْنَبٌ (Arnabun) adalah kelinci. Sedangkan نَمِرٌ adalah harimau dan قِطٌّ adalah kucing.'
  },
  {
    id: 'q-anm-3',
    category: 'hewan',
    type: 'pilihan_ganda',
    question: 'Lengkapi kalimat: "تَسْبَحُ ... فِي مِيَاهِ الْبَحْرِ" (Berenang di air laut)',
    arabicPrompt: 'تَسْبَحُ ... فِي مِيَاهِ الْبَحْرِ',
    options: ['الْأَسْمَاكُ', 'الطُّيُوْرُ', 'الْخُيُوْلُ', 'الْأَبْقَارُ'],
    correctAnswer: 0,
    explanation: 'الْأَسْمَاكُ (ikan-ikan) adalah makhluk air yang berenang (tasbahu).'
  },
  {
    id: 'q-anm-4',
    category: 'hewan',
    type: 'audio_lafadz',
    question: 'Dengarkan lafadz "أَسَدٌ شُجَاعٌ". Manakah sifat yang digambarkan?',
    arabicPrompt: 'أَسَدٌ شُجَاعٌ',
    audioPromptText: 'أَسَدٌ شُجَاعٌ',
    options: ['Singa yang penakut', 'Singa yang berani', 'Kucing yang manja', 'Gajah yang besar'],
    correctAnswer: 1,
    explanation: 'أَسَدٌ شُجَاعٌ artinya "Singa yang pemberani".'
  },
  {
    id: 'q-anm-5',
    category: 'hewan',
    type: 'pilihan_ganda',
    question: 'Kata bahasa Arab untuk "Sapi Betina / Sapi Perah" yang juga menjadi nama Surah ke-2 dalam Al-Qur\'an adalah...',
    options: ['النَّحْلُ', 'الْفِيْلُ', 'الْبَقَرَةُ', 'الْعَنْكَبُوْتُ'],
    correctAnswer: 2,
    explanation: 'الْبَقَرَةُ (Al-Baqarah) artinya Sapi Betina.'
  },

  // --- KATEGORI PROFESI ---
  {
    id: 'q-prf-1',
    category: 'profesi',
    type: 'pilihan_ganda',
    question: 'Siapakah profesi yang bekerja memeriksa pasien di rumah sakit?',
    options: ['الْمُهَنْدِسُ', 'الشُّرْطِيُّ', 'الطَّبِيْبُ', 'الْفَلَّاحُ'],
    correctAnswer: 2,
    explanation: 'الطَّبِيْبُ (Dokter) bertugas memeriksa dan merawat orang sakit di rumah sakit (al-mustasyfa).'
  },
  {
    id: 'q-prf-2',
    category: 'profesi',
    type: 'pilihan_ganda',
    question: 'Apakah arti dari profesi "مُهَنْدِسٌ مِعْمَارِيٌّ"?',
    options: ['Insinyur / Arsitek', 'Wartawan Berita', 'Pilot Tempur', 'Guru Sejarah'],
    correctAnswer: 0,
    explanation: 'مُهَنْدِسٌ مِعْمَارِيٌّ (Muhandisun Mi\'maariyyun) adalah arsitek atau perancang bangunan.'
  },
  {
    id: 'q-prf-3',
    category: 'profesi',
    type: 'pilihan_ganda',
    question: 'Lafadz bahasa Arab untuk "Pilot Pesawat" adalah...',
    options: ['طَيَّارٌ', 'جُنْدِيٌّ', 'تَاجِرٌ', 'صَحَفِيٌّ'],
    correctAnswer: 0,
    explanation: 'طَيَّارٌ (Thayyaar) berasal dari akar kata thaara-yathiiru (terbang), yang berarti penerbang/pilot.'
  },
  {
    id: 'q-prf-4',
    category: 'profesi',
    type: 'pilihan_ganda',
    question: 'Profesi yang menyiapkan dan meracik obat di apotek disebut...',
    options: ['الصَّيْدَلِيُّ', 'الْمُحَامِي', 'الْقَاضِي', 'السَّائِقُ'],
    correctAnswer: 0,
    explanation: 'الصَّيْدَلِيُّ (Apoteker/Farmasis) bekerja di صَيْدَلِيَّةٌ (Apotek).'
  },
  {
    id: 'q-prf-5',
    category: 'profesi',
    type: 'pilihan_ganda',
    question: 'Apa arti kalimat: "يَزْرَعُ الْفَلَّاحُ الْأَرُزَّ فِي الْمَزْرَعَةِ"?',
    options: [
      'Petani menanam padi di sawah/ladang',
      'Pedagang menjual beras di pasar',
      'Nelayan menangkap ikan di laut',
      'Polisi mengatur arus kendaraan di jalan'
    ],
    correctAnswer: 0,
    explanation: 'فَلَّاحٌ = Petani, يَزْرَعُ = Menanam, أَرُزٌّ = Padi/Beras, مَزْرَعَةٌ = Sawah/Ladang.'
  }
];
