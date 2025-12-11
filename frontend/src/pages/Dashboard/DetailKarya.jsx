import React from 'react';
import { ThumbsUp, Upload, Eye } from 'lucide-react'; 

// --- IMPORT GAMBAR ---
import mainImage from '../../assets/karya3.png'; // Gambar Utama (Starry Night)
import karyaLain from '../../assets/karya.png';  // ✅ REVISI: Gambar bawah pakai karya.png

// Dummy Profile Avatar
const avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";

const DetailKarya = () => {
  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans pb-32 text-white">
      
      {/* NAVBAR SUDAH ADA DI APP.JS */}

      {/* Container Utama: Layout 1 Kolom Terpusat */}
      <div className="container mx-auto px-6 lg:px-24 pt-32 max-w-6xl">
        
        {/* --- 1. HEADER INFO (SENIMAN & ACTION) --- */}
        <div className="flex justify-between items-center mb-6">
          
          {/* Kiri: Profil Seniman */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <img src={avatarUrl} alt="Vincent van Gogh" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-semibold text-lg">Vincent van Gogh</span>
              <button className="text-white/80 text-sm font-medium hover:text-white transition">
                Ikuti +
              </button>
            </div>
          </div>

          {/* Kanan: Tombol Like & Share (Outline Bulat) */}
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition">
              <ThumbsUp size={18} className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition">
              <Upload size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* --- 2. GAMBAR UTAMA BESAR --- */}
        <div className="w-full aspect-[16/9] rounded-[20px] overflow-hidden mb-10 shadow-2xl bg-gray-800">
          <img 
            src={mainImage} 
            alt="Starry Night" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* --- 3. JUDUL & DESKRIPSI --- */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold mb-6">Starry Night</h1>
          <div className="space-y-4 text-white/90 text-lg leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non tortor id sem congue rhoncus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non tortor id sem congue rhoncus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tellus massa, pellentesque aliquet faucibus a, euismod eget neque. Pellentesque non lorem augue. Aliquam dapibus nulla rhoncus, lacinia mauris nec, feugiat justo. Donec consequat commodo blandit. Nullam sit amet ex est. Integer vitae lacus sem. Phasellus varius laoreet dolor. Integer id fringilla ipsum, quis sodales nunc.
            </p>
          </div>
        </div>

        {/* --- 4. KARYA LAINNYA (MENGGUNAKAN karya.png) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="rounded-[20px] overflow-hidden aspect-[4/3] bg-gray-700 shadow-lg">
            <img src={karyaLain} alt="Karya Lain 1" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </div>
          <div className="rounded-[20px] overflow-hidden aspect-[4/3] bg-gray-700 shadow-lg">
            <img src={karyaLain} alt="Karya Lain 2" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
          </div>
        </div>

        {/* --- 5. FOOTER ARTIST (IKON SOLID) --- */}
        <div className="relative flex items-center justify-center mt-12">
          {/* Garis Horizontal */}
          <div className="absolute w-full h-[1px] bg-white/30 top-1/2 -translate-y-1/2 z-0"></div>
          
          {/* Profil Tengah */}
          <div className="relative z-10 bg-[#4F75FF] px-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 mb-3">
              <img src={avatarUrl} alt="Vincent van Gogh" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold mb-2">Vincent van Gogh</h3>
            
            <div className="flex items-center gap-6 text-sm text-white">
              
              {/* LIKE: Solid Putih (fill-white) */}
              <div className="flex items-center gap-1.5">
                <ThumbsUp size={18} className="fill-white text-white" /> 
                <span className="font-medium">1.1rb</span>
              </div>

              {/* VIEW: Outline Putih */}
              <div className="flex items-center gap-1.5">
                <Eye size={18} className="text-white" /> 
                <span className="font-medium">3.2rb</span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailKarya;