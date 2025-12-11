import { Link } from 'react-router-dom';
import CardKarya from '../../components/CardKarya';
import CardPameran from '../../components/CardPameran';

// --- IMPORT ASSETS ---
// REVISI 1: Import seniImg untuk digunakan di kartu pameran
import seniImg from '../../assets/seni.png';
import tagBerandaImg from '../../assets/TagBeranda.png';

// Import Gambar Karya 1-4
import karya1 from '../../assets/karya1.png';
import karya2 from '../../assets/karya2.png';
import karya3 from '../../assets/karya3.png';
import karya4 from '../../assets/karya4.png';

const Beranda = () => {
  
  // --- DATA PAMERAN ---
  const pameranList = [
    { 
      id: 1, 
      title: 'Pameran Seni Nasional', 
      date: '12 mei 2025', 
      price: 'Rp 10.000', 
      location: 'Gedung Hawung Galuh International, Jakarta', 
      image: seniImg
    },
    { 
      id: 2, 
      title: 'Pameran Seni Nasional', 
      date: '12 mei 2025', 
      price: 'Rp 10.000', 
      location: 'Gedung Hawung Galuh International, Jakarta', 
      image: seniImg 
    },
    { 
      id: 3, 
      title: 'Pameran Seni Nasional', 
      date: '12 mei 2025', 
      price: 'Rp 10.000', 
      location: 'Gedung Hawung Galuh International, Jakarta', 
      image: seniImg
    },
    { 
      id: 4, 
      title: 'Pameran Seni Nasional', 
      date: '12 mei 2025', 
      price: 'Rp 10.000', 
      location: 'Gedung Hawung Galuh International, Jakarta', 
      image: seniImg
    },
  ];

  // --- DATA KARYA (REVISI: Tanpa Foto Profil Orang) ---
  const karyaList = [
    { 
      id: 1, 
      title: 'Starry Night', 
      artistName: 'Vincent van Gogh', 
      likes: '549', 
      views: '549', 
      image: karya1, 
      // artistImg dihapus agar tidak muncul foto orang
    },
    { 
      id: 2, 
      title: 'Starry Night', 
      artistName: 'Vincent van Gogh', 
      likes: '549', 
      views: '549',  
      image: karya2, 
    },
    { 
      id: 3, 
      title: 'Starry Night', 
      artistName: 'Vincent van Gogh', 
      likes: '549', 
      views: '549', 
      image: karya3, 
    },
    { 
      id: 4, 
      title: 'Starry Night', 
      artistName: 'Vincent van Gogh', 
      likes: '549', 
      views: '549', 
      image: karya4, 
    },
  ];

  return (
    <div className="bg-[#4F75FF] min-h-screen font-sans overflow-x-hidden flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="w-full px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full lg:w-1/2 z-10 flex flex-col justify-center text-left space-y-6">
              <h1 className="text-white text-4xl md:text-5xl lg:text-[50px] font-bold leading-tight tracking-tight max-w-3xl">
                Bagikan Karyamu. Temukan Pameran. Terhubung dengan Sesama Seniman
              </h1>
                 <p className="text-white/90 text-[30px] md:text-[28px] max-w-[600px] leading-relaxed font-medium !text-left">
                Dapatkan ruang untuk berkarya, membangun portofolio, dan menemukan peluang pameran terbaru.
              </p>
              <div className="flex flex-row gap-4 pt-6">
                <Link to="/upload" className="px-8 py-3 bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold text-lg rounded-lg transition-all">
                  Unggah Karya
                </Link>
              </div>
            </div>
            
            {/* ILLUSTRATION */}
            <div className="w-full lg:w-1/2 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 pointer-events-none mt-12 lg:mt-0 flex justify-end">
              <img
                src={tagBerandaImg}
                alt="Ilustrasi ArtConnect"
                className="w-full max-w-[700px] h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- PAMERAN SECTION --- */}
      <section className="py-20 bg-[#4F75FF]">
        <div className="container mx-auto px-6 lg:px-16 max-w-[1440px]">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight">
              Ayo Temukan & Ikuti Pameran Seni Pilihanmu!
            </h2>
            <p className="text-center text-white text-lg md:text-[22px] w-full max-w-[1000px] mx-auto leading-relaxed font-medium">
              Temukan berbagai pameran seni terbaru dan jadilah bagian dari perjalanan kreatif di komunitas <br className="hidden md:block" />
              ArtConnect.
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Link to="/acara" className="text-[#E3FB52] font-semibold hover:text-white transition text-lg inline-flex items-center gap-2">
              Lihat Selengkapnya
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pameranList.map((item) => (
              <CardPameran key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* --- KARYA SECTION --- */}
      <section className="w-full bg-[#4F75FF] py-20 flex justify-center">
        <div className="container mx-auto px-6 lg:px-16 max-w-[1440px] relative z-10">
          
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight">
              Jelajahi & Nikmati Karya Seni dari Para Kreator!
            </h2>
            <p className="text-center text-white text-lg md:text-[22px] w-full max-w-[1000px] mx-auto leading-relaxed font-medium">
              Temukan berbagai karya seni digital yang penuh kreativitas dan inspirasi, dan dukung <br className="hidden md:block" />
              perjalanan para seniman di komunitas ArtConnect.
            </p>
          </div>

          <div className="flex justify-end mb-6">
            <Link 
              to="/galeri" 
              className="text-[#E3FB52] font-semibold hover:text-white transition text-lg inline-flex items-center gap-2"
            >
              Lihat Selengkapnya 
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-20">
            {karyaList.map((item) => (
              <CardKarya key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* --- CARA MENGUNGGAH ACARA SECTION (REVISI SESUAI GAMBAR) --- */}
      <section className="w-full bg-[#4F75FF] pb-32 pt-10 flex flex-col items-center">
        <div className="w-full px-6 text-center text-white">
          
          <h2 className="text-3xl md:text-[40px] font-bold mb-4">
            Cara Mengunggah Acara ke ArtConnect
          </h2>
          <p className="text-xl md:text-[24px] font-medium mb-12">
            Tampilkan acara senimu di platform kami dengan mudah
          </p>

          {/* Kontainer Teks: Menggunakan w-fit agar blok teks berada di tengah, tapi teksnya rata kiri */}
          <div className="w-fit mx-auto text-left space-y-8">
            
            {/* Poin 1 */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-2">Siapkan Informasi Acara</h3>
              <ul className="list-disc pl-6 space-y-1 text-white/90 text-lg md:text-xl">
                <li>Nama</li>
                <li>Tanggal & Waktu</li>
                <li>Lokasi</li>
                <li>Deskripsi singkat</li>
                <li>Poster / gambar pendukung</li>
              </ul>
            </div>

            {/* Poin 2 */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-1">Kirim Lewat Email</h3>
              <p className="text-white/90 text-lg md:text-xl">
                artconnect@gmail.com, Lampirkan seluruh informasi dan file acara
              </p>
            </div>

            {/* Poin 3 */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium mb-1">Acara diproses dan Dipublikasikan</h3>
              <p className="text-white/90 text-lg md:text-xl">
                Tim kami akan meninjau acara dan menampilkan di ArtConnect dalam 1-2 hari kerja
              </p>
            </div>
          </div>

          <div className="mt-14">
            <a 
              href="mailto:artconnect@gmail.com"
              className="inline-block bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-4 px-12 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg"
            >
              Kirim Event Sekarang
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Beranda;