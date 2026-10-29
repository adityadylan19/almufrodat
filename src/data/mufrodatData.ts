import { MufrodatCard } from '../types';

export const INITIAL_MUFRODAT_CARDS: MufrodatCard[] = [
  // --- KOSAKATA SEKOLAH (المَدْرَسَةُ) ---
  {
    id: 'sch-1',
    arabic: 'مَدْرَسَةٌ ثَانَوِيَّةٌ',
    transliteration: 'Madrasatun Tsanawiyyatun',
    meaning: 'Sekolah Menengah Atas (SMA)',
    category: 'sekolah',
    gender: 'muannats',
    plural: 'مَدَارِسُ (Madaaris)',
    exampleSentence: {
      arabic: 'أَنَا أَدْرُسُ فِي الْمَدْرَسَةِ الثَّانَوِيَّةِ الْإِسْلَامِيَّةِ',
      transliteration: 'Ana adrusu fil-madrasatits-tsanawiyyatil-islamiyyah',
      indonesian: 'Saya belajar di Sekolah Menengah Atas Islam.'
    },
    notes: 'Bentuk muannats karena berakhiran Ta Marbuthah (ة).',
    visualColor: 'emerald',
    iconName: 'GraduationCap'
  },
  {
    id: 'sch-2',
    arabic: 'فَصْلٌ دِرَاسِيٌّ',
    transliteration: 'Fashlun Diraasiyyun',
    meaning: 'Ruang Kelas',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'فُصُوْلٌ (Fushuul)',
    exampleSentence: {
      arabic: 'يَدْخُلُ الطُّلَّابُ الْفَصْلَ فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا',
      transliteration: 'Yadkhulut-tullaabul-fashla fis-saa\'atis-saabi\'ati shabaahan',
      indonesian: 'Para siswa masuk ke ruang kelas pada pukul tujuh pagi.'
    },
    notes: 'Kata benda maskulin (mudzakkar).',
    visualColor: 'emerald',
    iconName: 'DoorOpen'
  },
  {
    id: 'sch-3',
    arabic: 'سَبُّوْرَةٌ ذَكِيَّةٌ',
    transliteration: 'Sabbuuratun Dzakiyyah',
    meaning: 'Papan Tulis / Smartboard',
    category: 'sekolah',
    gender: 'muannats',
    plural: 'سَبُّوْرَاتٌ (Sabbuuraat)',
    exampleSentence: {
      arabic: 'يَكْتُبُ الْمُدَرِّسُ الدَّرْسَ عَلَى السَّبُّوْرَةِ',
      transliteration: 'Yaktubul-mudarrisud-darsa \'alas-sabbuurah',
      indonesian: 'Guru menulis materi pelajaran di atas papan tulis.'
    },
    notes: 'Sering digunakan di kelas modern SMA.',
    visualColor: 'emerald',
    iconName: 'Presentation'
  },
  {
    id: 'sch-4',
    arabic: 'كِتَابٌ مَدْرَسِيٌّ',
    transliteration: 'Kitaabun Madrasiyyun',
    meaning: 'Buku Pelajaran',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'كُتُبٌ (Kutub)',
    exampleSentence: {
      arabic: 'فَتَحَ التِّلْمِيْذُ كِتَابَ اللُّغَةِ الْعَرَبِيَّةِ',
      transliteration: 'Fatahat-tilmiidzu kitaabal-lughatil-\'arabiyyah',
      indonesian: 'Murid membuka buku pelajaran bahasa Arab.'
    },
    notes: 'Akar kata: ك - ت - ب (menulis).',
    visualColor: 'emerald',
    iconName: 'BookOpen'
  },
  {
    id: 'sch-5',
    arabic: 'قَلَمُ حِبْرٍ',
    transliteration: 'Qalamu Hibrin',
    meaning: 'Pulpen / Pena',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'أَقْلَامٌ (Aqlaam)',
    exampleSentence: {
      arabic: 'أَكْتُبُ الْوَاجِبَ الْمَنْزِلِيَّ بِالْقَلَمِ',
      transliteration: 'Aktubul-waajibal-manziliyya bil-qalam',
      indonesian: 'Saya menulis tugas pekerjaan rumah dengan pulpen.'
    },
    notes: 'Mufrodat dasar yang sering keluar di ujian.',
    visualColor: 'emerald',
    iconName: 'PenTool'
  },
  {
    id: 'sch-6',
    arabic: 'مَكْتَبَةٌ شَامِلَةٌ',
    transliteration: 'Maktabatun Syaamilah',
    meaning: 'Perpustakaan Sekolah',
    category: 'sekolah',
    gender: 'muannats',
    plural: 'مَكْتَبَاتٌ (Maktabaat)',
    exampleSentence: {
      arabic: 'تَقْرَأُ فَاطِمَةُ الْكُتُبَ الْمُفِيْدَةَ فِي الْمَكْتَبَةِ',
      transliteration: 'Taqra-u Faathimatul-kutubal-mufiidata fil-maktabah',
      indonesian: 'Fathimah membaca buku-buku bermanfaat di perpustakaan.'
    },
    notes: 'Tempat referensi belajar siswa SMA.',
    visualColor: 'emerald',
    iconName: 'Library'
  },
  {
    id: 'sch-7',
    arabic: 'مَعْمَلُ اللُّغَاتِ',
    transliteration: 'Ma\'malul-Lughaat',
    meaning: 'Laboratorium Bahasa',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'مَعَامِلُ (Ma\'aamil)',
    exampleSentence: {
      arabic: 'نَسْتَمِعُ إِلَى الْمُحَادَثَةِ الْعَرَبِيَّةِ فِي مَعْمَلِ اللُّغَاتِ',
      transliteration: 'Nastami\'u ilal-muhaadatsatil-\'arabiyyati fii ma\'malil-lughaat',
      indonesian: 'Kami mendengarkan percakapan bahasa Arab di laboratorium bahasa.'
    },
    notes: 'Fasilitas penunjang istima\' (mendengar) di SMA.',
    visualColor: 'emerald',
    iconName: 'Headphones'
  },
  {
    id: 'sch-8',
    arabic: 'حَقِيْبَةٌ مَدْرَسِيَّةٌ',
    transliteration: 'Haqiybatun Madrasiyyah',
    meaning: 'Tas Sekolah',
    category: 'sekolah',
    gender: 'muannats',
    plural: 'حَقَائِبُ (Haqaa-ib)',
    exampleSentence: {
      arabic: 'وَضَعْتُ الدَّفْتَرَ وَالْأَقْلَامَ فِي الْحَقِيْبَةِ',
      transliteration: 'Wadha\'tud-daftara wal-aqlaama fil-haqiybah',
      indonesian: 'Saya meletakkan buku catatan dan pena ke dalam tas.'
    },
    notes: 'Benda perlengkapan harian siswa.',
    visualColor: 'emerald',
    iconName: 'Briefcase'
  },
  {
    id: 'sch-9',
    arabic: 'زِيٌّ مَدْرَسِيٌّ',
    transliteration: 'Ziyyun Madrasiyyun',
    meaning: 'Seragam Sekolah',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'أَزْيَاءٌ (Azyaa\')',
    exampleSentence: {
      arabic: 'يَرْتَدِي الطَّالِبُ الزِّيَّ الْمَدْرَسِيَّ الْمُرَتَّبَ',
      transliteration: 'Yartadit-thaalibuz-ziyyal-madrasiyyal-murattab',
      indonesian: 'Siswa memakai seragam sekolah yang rapi.'
    },
    notes: 'Simbol kedisiplinan dan identitas pelajar SMA.',
    visualColor: 'emerald',
    iconName: 'Shirt'
  },
  {
    id: 'sch-10',
    arabic: 'جَدْوَلُ الْحِصَصِ',
    transliteration: 'Jadwalul-Hishash',
    meaning: 'Jadwal Pelajaran',
    category: 'sekolah',
    gender: 'mudzakkar',
    plural: 'جَدَاوِلُ (Jadaawil)',
    exampleSentence: {
      arabic: 'أُنْظُرْ إِلَى جَدْوَلِ الْحِصَصِ لِمَعْرِفَةِ مَوْعِدِ الْاِمْتِحَانِ',
      transliteration: 'Undzur ilaa jadwalil-hishashi lima\'rifati maw\'idil-imtihaan',
      indonesian: 'Lihatlah ke jadwal pelajaran untuk mengetahui waktu ujian.'
    },
    notes: 'Susunan waktu kegiatan belajar mengajar.',
    visualColor: 'emerald',
    iconName: 'Calendar'
  },

  // --- KOSAKATA HEWAN (الحَيَوَانَاتُ) ---
  {
    id: 'anm-1',
    arabic: 'جَمَلٌ صَحْرَاوِيٌّ',
    transliteration: 'Jamalun Shahraawiyyun',
    meaning: 'Unta',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'جِمَالٌ (Jimaal)',
    exampleSentence: {
      arabic: 'الْجَمَلُ صَبُوْرٌ وَيُسَمَّى سَفِيْنَةَ الصَّحْرَاءِ',
      transliteration: 'Al-jamalu shabuurun wa yusammaa safiinatas-shahraa\'',
      indonesian: 'Unta adalah hewan penyabar dan dijuluki kapal padang pasir.'
    },
    notes: 'Hewan khas jazirah Arab yang sering disebut dalam teks sastra.',
    visualColor: 'amber',
    iconName: 'Footprints'
  },
  {
    id: 'anm-2',
    arabic: 'حِصَانٌ أَصِيْلٌ',
    transliteration: 'Hishaanun Ashiylun',
    meaning: 'Kuda',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'خُيُوْلٌ (Khuyuul)',
    exampleSentence: {
      arabic: 'يَرْكَبُ الْفَارِسُ الْحِصَانَ السَّرِيْعَ فِي السِّبَاقِ',
      transliteration: 'Yarkabul-faarisul-hishaanas-sarii\'a fis-sibaaq',
      indonesian: 'Penunggang mengendarai kuda yang cepat dalam perlombaan.'
    },
    notes: 'Kuda Arab (al-khail al-\'arabi) terkenal tangkas dan indah.',
    visualColor: 'amber',
    iconName: 'Zap'
  },
  {
    id: 'anm-3',
    arabic: 'أَسَدٌ شُجَاعٌ',
    transliteration: 'Asadun Syujaa\'un',
    meaning: 'Singa',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'أُسُوْدٌ (Usuud)',
    exampleSentence: {
      arabic: 'الْأَسَدُ مَلِكُ الْغَابَةِ لِقُوَّتِهِ وَشَجَاعَتِهِ',
      transliteration: 'Al-asadu malikul-ghaabati liquwwatihi wa syajaa\'atih',
      indonesian: 'Singa adalah raja rimba karena kekuatan dan keberaniannya.'
    },
    notes: 'Simbol keberanian dan kegagahan.',
    visualColor: 'amber',
    iconName: 'Flame'
  },
  {
    id: 'anm-4',
    arabic: 'فِيْلٌ ضَخْمٌ',
    transliteration: 'Fiylun Dakh-mun',
    meaning: 'Gajah',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'أَفْيَالٌ (Afyaal)',
    exampleSentence: {
      arabic: 'الْفِيْلُ حَيَوَانٌ ثَدْيِيٌّ لَهُ خُرْطُوْمٌ طَوِيْلٌ',
      transliteration: 'Al-fiylu hayawaanun tsadyiyyun lahu khurthuumun thawiil',
      indonesian: 'Gajah adalah mamalia yang memiliki belalai panjang.'
    },
    notes: 'Terdapat Surah Al-Fil dalam Al-Qur\'an.',
    visualColor: 'amber',
    iconName: 'Shield'
  },
  {
    id: 'anm-5',
    arabic: 'قِطٌّ أَلِيْفٌ',
    transliteration: 'Qitthun Aliyfun',
    meaning: 'Kucing',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'قِطَطٌ (Qithath)',
    exampleSentence: {
      arabic: 'يَلْعَبُ الْقِطُّ الصَّغِيْرُ فِي حَدِيْقَةِ الْمَنْزِلِ',
      transliteration: 'Yal\'abul-qitthush-shaghiiru fii hadiiqatil-manzil',
      indonesian: 'Kucing kecil bermain di taman rumah.'
    },
    notes: 'Bentuk feminin: قِطَّةٌ (qith-thah).',
    visualColor: 'amber',
    iconName: 'Heart'
  },
  {
    id: 'anm-6',
    arabic: 'طَائِرٌ مُغَرِّدٌ',
    transliteration: 'Thaa-irun Mugharridun',
    meaning: 'Burung',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'طُيُوْرٌ (Thuyuur)',
    exampleSentence: {
      arabic: 'يَطِيْرُ الطَّائِرُ فَوْقَ الْأَشْجَارِ فِي الصَّبَاحِ',
      transliteration: 'Yathiirut-thaa-iru fawqal-asyjaari fish-shabaah',
      indonesian: 'Burung terbang di atas pepohonan di pagi hari.'
    },
    notes: 'Akar kata: ط - ي - ر (terbang).',
    visualColor: 'amber',
    iconName: 'Feather'
  },
  {
    id: 'anm-7',
    arabic: 'سَمَكَةٌ بَحْرِيَّةٌ',
    transliteration: 'Samakatun Bahriyyah',
    meaning: 'Ikan',
    category: 'hewan',
    gender: 'muannats',
    plural: 'أَسْمَاكٌ (Asmaak)',
    exampleSentence: {
      arabic: 'تَسْبَحُ الْأَسْمَاكُ الْمُلَوَّنَةُ فِي مِيَاهِ الْبَحْرِ',
      transliteration: 'Tasbahul-asmaakul-mulawwanatu fii miyaahil-bahr',
      indonesian: 'Ikan-ikan berwarna-warni berenang di dalam air laut.'
    },
    notes: 'Kata jamak jenisnya: أَسْمَاكٌ atau سَمَكٌ.',
    visualColor: 'amber',
    iconName: 'Waves'
  },
  {
    id: 'anm-8',
    arabic: 'أَرْنَبٌ سَرِيْعٌ',
    transliteration: 'Arnabun Sarii\'un',
    meaning: 'Kelinci',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'أَرَانِبُ (Araanib)',
    exampleSentence: {
      arabic: 'يَأْكُلُ الْأَرْنَبُ الْجَزَرَ الْطَّازَجَ بِشَهِيَّةٍ',
      transliteration: 'Ya\'kulul-arnabul-jazarath-thaazaja bisyahiyyah',
      indonesian: 'Kelinci memakan wortel segar dengan lahap.'
    },
    notes: 'Hewan pengerat bertelinga panjang yang lincah.',
    visualColor: 'amber',
    iconName: 'Sparkles'
  },
  {
    id: 'anm-9',
    arabic: 'بَقَرَةٌ حَلُوْبٌ',
    transliteration: 'Baqaratun Haluubun',
    meaning: 'Sapi Perah',
    category: 'hewan',
    gender: 'muannats',
    plural: 'أَبْقَارٌ (Abqaar)',
    exampleSentence: {
      arabic: 'نَحْصُلُ عَلَى اللَّبَنِ الصِّحِّيِّ مِنَ الْبَقَرَةِ',
      transliteration: 'Nahshulu \'alal-labanish-shihhiyyi minal-baqarah',
      indonesian: 'Kita memperoleh susu sehat dari sapi.'
    },
    notes: 'Nama surah terpanjang dalam Al-Qur\'an (Al-Baqarah).',
    visualColor: 'amber',
    iconName: 'Coffee'
  },
  {
    id: 'anm-10',
    arabic: 'نَمِرٌ مُفْتَرِسٌ',
    transliteration: 'Namirun Muftarisun',
    meaning: 'Harimau / Macan',
    category: 'hewan',
    gender: 'mudzakkar',
    plural: 'نُمُوْرٌ (Numuur)',
    exampleSentence: {
      arabic: 'النَّمِرُ حَيَوَانٌ سَرِيْعٌ جِدًّا فِي الْجَرْيِ',
      transliteration: 'An-namiru hayawaanun sarii\'un jiddan fil-jaryi',
      indonesian: 'Harimau adalah hewan yang sangat cepat saat berlari.'
    },
    notes: 'Termasuk hewan pemangsa karnivora (hayawan muftaris).',
    visualColor: 'amber',
    iconName: 'Target'
  },

  // --- KOSAKATA PROFESI (المِهَنُ) ---
  {
    id: 'prf-1',
    arabic: 'أُسْتَاذٌ / مُدَرِّسٌ',
    transliteration: 'Ustaadzun / Mudarrisun',
    meaning: 'Guru / Pendidik',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'أَسَاتِذَةٌ / مُدَرِّسُوْنَ',
    exampleSentence: {
      arabic: 'يَشْرَحُ الْأُسْتَاذُ قَوَاعِدَ اللُّغَةِ بِطَرِيْقَةٍ مُمْتِعَةٍ',
      transliteration: 'Yasyrahul-ustaadzu qawaa\'idal-lughati bithariiqatin mumti\'ah',
      indonesian: 'Guru menjelaskan kaidah bahasa dengan cara yang menyenangkan.'
    },
    notes: 'Bentuk wanita: أُسْتَاذَةٌ / مُدَرِّسَةٌ.',
    visualColor: 'sky',
    iconName: 'Award'
  },
  {
    id: 'prf-2',
    arabic: 'طَبِيْبٌ مَاهِرٌ',
    transliteration: 'Thabiibun Maahirun',
    meaning: 'Dokter',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'أَطِبَّاءُ (Athibbaa\')',
    exampleSentence: {
      arabic: 'يَفْحَصُ الطَّبِيْبُ الْمَرِيْضَ فِي الْمُسْتَشْفَى',
      transliteration: 'Yafhashuth-thabiibul-mariidha fil-mustasyfaa',
      indonesian: 'Dokter memeriksa orang yang sakit di rumah sakit.'
    },
    notes: 'Bentuk dokter wanita: طَبِيْبَةٌ (Thabiibah).',
    visualColor: 'sky',
    iconName: 'Stethoscope'
  },
  {
    id: 'prf-3',
    arabic: 'مُهَنْدِسٌ مِعْمَارِيٌّ',
    transliteration: 'Muhandisun Mi\'maariyyun',
    meaning: 'Insinyur / Arsitek',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'مُهَنْدِسُوْنَ (Muhandisuun)',
    exampleSentence: {
      arabic: 'يُصَمِّمُ الْمُهَنْدِسُ الْمَبَانِيَ الْحَدِيْثَةَ وَالْجُسُوْرَ',
      transliteration: 'Yushammimul-muhandisul-mabaaniyal-hadiitsata wal-jusuur',
      indonesian: 'Insinyur merancang gedung-gedung modern dan jembatan.'
    },
    notes: 'Cita-cita favorit siswa jurusan IPA di SMA.',
    visualColor: 'sky',
    iconName: 'Compass'
  },
  {
    id: 'prf-4',
    arabic: 'شُرْطِيُّ الْمُرُوْرِ',
    transliteration: 'Syurthiyyul-Muruur',
    meaning: 'Polisi Lalu Lintas',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'شُرْطَةٌ (Syurthah)',
    exampleSentence: {
      arabic: 'يُنَظِّمُ الشُّرْطِيُّ حَرَكَةَ السَّيَّارَاتِ فِي الشَّارِعِ',
      transliteration: 'Yunadz-dzimush-syurthiyyu harakatas-sayyaaraati fisy-syaari\'',
      indonesian: 'Polisi menertibkan lalu lintas mobil di jalan raya.'
    },
    notes: 'Menjaga keamanan dan ketertiban umum.',
    visualColor: 'sky',
    iconName: 'ShieldAlert'
  },
  {
    id: 'prf-5',
    arabic: 'طَيَّارٌ شُجَاعٌ',
    transliteration: 'Thayyaaron Syujaa\'un',
    meaning: 'Pilot Penerbang',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'طَيَّارُوْنَ (Thayyaaruun)',
    exampleSentence: {
      arabic: 'يَقُوْدُ الطَّيَّارُ الطَّائِرَةَ عَبْرَ الْقَارَّاتِ',
      transliteration: 'Yaquuduth-thayyaauth-thaa-irata \'abral-qaarraat',
      indonesian: 'Pilot mengemudikan pesawat melintasi benua.'
    },
    notes: 'Bentuk wanita: طَيَّارَةٌ (Thayyaarah).',
    visualColor: 'sky',
    iconName: 'Plane'
  },
  {
    id: 'prf-6',
    arabic: 'جُنْدِيٌّ بَاسِلٌ',
    transliteration: 'Jundiyyun Baasilun',
    meaning: 'Tentara / Prajurit',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'جُنُوْدٌ (Junuud)',
    exampleSentence: {
      arabic: 'يُدَافِعُ الْجُنْدِيُّ عَنْ وَطَنِهِ بِكُلِّ إِخْلَاصٍ',
      transliteration: 'Yudaafi\'ul-jundiyyu \'an wathanihi bikulli ikhlaash',
      indonesian: 'Prajurit membela tanah airnya dengan penuh keikhlasan.'
    },
    notes: 'Pelindung kedaulatan bangsa.',
    visualColor: 'sky',
    iconName: 'ShieldCheck'
  },
  {
    id: 'prf-7',
    arabic: 'فَلَّاحٌ نَشِيْطٌ',
    transliteration: 'Fallaahun Nasyiithun',
    meaning: 'Petani',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'فَلَّاحُوْنَ (Fallaahuun)',
    exampleSentence: {
      arabic: 'يَزْرَعُ الْفَلَّاحُ الْأَرُزَّ وَالْخَضْرَاوَاتِ فِي الْمَزْرَعَةِ',
      transliteration: 'Yazra\'ul-fallaahul-aruzza wal-khadhraawaati fil-mazra\'ah',
      indonesian: 'Petani menanam padi dan sayur-sayuran di ladang.'
    },
    notes: 'Pahlawan ketahanan pangan.',
    visualColor: 'sky',
    iconName: 'Sprout'
  },
  {
    id: 'prf-8',
    arabic: 'تَاجِرٌ أَمِيْنٌ',
    transliteration: 'Taajirun Amiinun',
    meaning: 'Pedagang / Wirausahawan',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'تُجَّارٌ (Tujjaar)',
    exampleSentence: {
      arabic: 'يَبِيْعُ التَّاجِرُ الْبَضَائِعَ بِأَمَانَةٍ وَصِدْقٍ',
      transliteration: 'Yabii\'ut-taajirul-badhaa-i\'a bi-amaanatin wa shidq',
      indonesian: 'Pedagang menjual barang dagangan dengan amanah dan jujur.'
    },
    notes: 'Profesi mulia yang ditekuni Nabi Muhammad SAW saat muda.',
    visualColor: 'sky',
    iconName: 'ShoppingBag'
  },
  {
    id: 'prf-9',
    arabic: 'صَيْدَلِيٌّ مُتَخَصِّصٌ',
    transliteration: 'Shaidaliyyun Mutakhasshisun',
    meaning: 'Apoteker',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'صَيَادِلَةٌ (Shayaadilah)',
    exampleSentence: {
      arabic: 'يُعِدُّ الصَّيْدَلِيُّ الدَّوَاءَ وَفْقَ وَصْفَةِ الطَّبِيْبِ',
      transliteration: 'Yu\'iddush-shaidaliyyud-dawaa-a wafqa washfatith-thabiib',
      indonesian: 'Apoteker meracik obat sesuai resep dokter.'
    },
    notes: 'Bekerja di apotek (صَيْدَلِيَّةٌ - Shaidaliyyah).',
    visualColor: 'sky',
    iconName: 'Pill'
  },
  {
    id: 'prf-10',
    arabic: 'صَحَفِيٌّ مَيْدَانِيٌّ',
    transliteration: 'Shahafiyyun Maydaaniyyun',
    meaning: 'Wartawan / Jurnalis',
    category: 'profesi',
    gender: 'mudzakkar',
    plural: 'صَحَفِيُّوْنَ (Shahafiyyuun)',
    exampleSentence: {
      arabic: 'يَنْقُلُ الصَّحَفِيُّ الْأَخْبَارَ الصَّادِقَةَ لِلنَّاسِ',
      transliteration: 'Yanqulys-shahafiyyul-akhbaaras-saadiqata lin-naas',
      indonesian: 'Wartawan menyampaikan berita-berita terpercaya kepada masyarakat.'
    },
    notes: 'Bekerja di bidang media dan surat kabar (صَحِيْفَةٌ).',
    visualColor: 'sky',
    iconName: 'Newspaper'
  }
];
