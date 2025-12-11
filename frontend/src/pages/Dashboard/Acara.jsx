import React from 'react';
import { Search, Calendar, MapPin, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// --- IMPORT GAMBAR ---
import seniImg from '../../assets/seni.png'; 

const Acara = () => {
  const navigate = useNavigate();

  // --- DATA DUMMY ACARA ---
  const eventsList = Array(12).fill(null).map((_, index) => ({
    id: index + 1,
    title: 'Pameran Seni Nasional',
    date: '12 mei 2025',
    price: 'Rp 10.000',
    location: 'Gedung Hawung Galuh International, Jakarta',
    image: seniImg, 
  }));

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans pb-20">
      
      {/* Container Utama */}
      <div className="container mx-auto px-6 lg:px-16 pt-10">

        {/* --- 1. SEARCH BAR --- */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-4xl">
            <input 
              type="text" 
              placeholder="Telusuri acara yang kamu inginkan?" 
              className="w-full py-4 pl-6 pr-12 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-md text-base placeholder:text-gray-400"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={24} />
            </div>
          </div>
        </div>

        {/* --- 2. GRID ACARA --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventsList.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/acara/${item.id}`)}
              // REVISI: Padding dikurangi jadi p-3 agar area teks lebih luas
              className="bg-white p-3 rounded-[16px] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden"
            >
              {/* Gambar Card */}
              <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden mb-3 bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              {/* Konten Card */}
              <div className="flex flex-col flex-1 px-1">
                
                {/* Judul */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight truncate">
                  {item.title}
                </h3>

                {/* Info Tanggal */}
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1.5">
                  <Calendar size={14} className="text-gray-500 shrink-0" />
                  <span>{item.date}</span>
                </div>

                {/* Info Harga */}
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1.5">
                    <Wallet size={14} className="text-gray-500 shrink-0" />
                    <span>{item.price}</span>
                </div>

                {/* REVISI LOKASI: 
                    1. text-[10px] -> Ukuran font diperkecil agar muat 1 baris
                    2. tracking-tight -> Merapatkan huruf agar muat lebih banyak
                    3. truncate -> Tetap dipakai untuk jaga-jaga kalau layar HP sangat kecil
                */}
                <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-medium mb-4 w-full">
                  <MapPin size={14} className="text-gray-500 shrink-0" />
                  <span className="truncate tracking-tight w-full" title={item.location}>
                    {item.location}
                  </span>
                </div>

                {/* Tombol Lihat Daftar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/acara/${item.id}`);
                  }}
                  className="mt-auto w-full bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold py-3 rounded-lg transition-colors text-sm shadow-sm"
                >
                  Lihat Daftar
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Acara;