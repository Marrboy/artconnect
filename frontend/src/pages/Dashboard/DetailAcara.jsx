import { Calendar, Clock, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import mapImg from '../../assets/peta.png';
import seniImg from '../../assets/seni.png';

const DetailAcara = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans pb-16 text-white">
      
      {/* HEADER BANNER */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={seniImg} 
          className="w-full h-full object-cover" 
          style={{ imageRendering: 'high-quality' }}
          alt="Banner" 
        />
        <div className="absolute inset-0 z-20 flex justify-center items-center text-center px-4 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight max-w-5xl drop-shadow-xl">
            Pameran Seni Digital Nusantara 2025
          </h1>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="container mx-auto px-6 lg:px-16 mt-12 max-w-[1440px] flex flex-col gap-10">
        
        {/* === BARIS 1: DESKRIPSI & LOKASI === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold mb-4">Deskripsi Acara</h2>
            <div className="text-lg leading-relaxed space-y-4 text-white/90">
              <p>
                Pameran Seni Digital Nusantara 2025 mempertemukan para seniman digital dari berbagai daerah 
                untuk memamerkan karya terbaik mereka. Acara ini menjadi ruang inspiratif bagi pecinta 
                seni, seniman muda, dan kreator yang ingin memperluas jaringan serta mendapatkan pengalaman baru 
                dalam dunia seni digital.
                Di sini, kamu dapat menikmati beragam karya visual, berinteraksi dengan kreator, dan mengikuti 
                sesi diskusi ringan seputar tren seni digital saat ini.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold mb-4">Lokasi Acara</h2>
            <div className="rounded-2xl overflow-hidden mb-5 h-52 border-2 border-white/20 shadow-lg bg-gray-300">
              <img src={mapImg} className="w-full h-full object-cover" alt="Peta" />
            </div>
            <p className="text-lg font-medium pl-1">Galeri Kreativa, Surabaya</p>
          </div>
        </div>

        {/* === BARIS 2: SYARAT & INFORMASI (SEJAJAR) === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* KIRI: Syarat & Ketentuan */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold mb-4">Syarat dan Ketentuan</h2>
            <ul className="list-disc pl-6 text-lg leading-relaxed space-y-5 text-white/90">
              <li>Acara terbuka untuk umum (semua usia).</li>
              <li>Dilarang merusak, menyentuh, atau memindahkan karya seni tanpa izin.</li>
              <li>Pengambilan foto diperbolehkan selama tidak mengganggu pengunjung lain.</li>
              <li>Peserta wajib konfirmasi kehadiran melalui WhatsApp setelah mendaftar.</li>
            </ul>
          </div>

          {/* KANAN: Informasi Acara */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-bold mb-4">Informasi Acara</h2>
            
            <div className="space-y-3 pl-1">
              <div className="flex items-center gap-4">
                <Calendar size={28} className="text-[#E3FB52] shrink-0" />
                <span className="text-lg font-medium">8 Desember 2025</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Clock size={28} className="text-[#E3FB52] shrink-0" />
                <span className="text-lg font-medium">07.00 - 12.00 WIB</span>
              </div>

              <div className="flex items-center gap-4">
                <User size={28} className="text-[#E3FB52] shrink-0" />
                <span className="text-lg font-medium">Komunitas ArtConnect</span>
              </div>
            </div>

            <button
              onClick={() => navigate(`/bayar/${id}`)}
              className="w-full bg-[#E3FB52] hover:bg-[#d7f048] text-black font-bold text-lg py-3 rounded-xl mt-6 shadow-lg hover:scale-[1.01] transition"
            >
              Daftar Sekarang
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailAcara;