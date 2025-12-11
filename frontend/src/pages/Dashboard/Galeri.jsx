import React, { useState } from 'react';
import { Search, ThumbsUp, Eye } from 'lucide-react';
// 1. IMPORT USE NAVIGATE
import { useNavigate } from 'react-router-dom'; 

import karya1 from '../../assets/karya1.png';
import karya2 from '../../assets/karya2.png';
import karya3 from '../../assets/karya3.png';
import karya4 from '../../assets/karya4.png';

const Galeri = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  // 2. INISIALISASI NAVIGATE
  const navigate = useNavigate(); 

  const categories = [
    'Semua', 'Ilustrasi', 'Fotografi', 'Karya 3D', 'UI/UX', 
    'Desain Produk', 'Fantasi', 'Animasi'
  ];

  const galleryItems = [
    { id: 1, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya1 },
    { id: 2, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya2 },
    { id: 3, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya3 },
    { id: 4, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya4 },
    { id: 5, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya1 },
    { id: 6, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya2 },
    { id: 7, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya3 },
    { id: 8, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya4 },
    { id: 9, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya1 },
    { id: 10, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya2 },
    { id: 11, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya3 },
    { id: 12, title: 'Starry Night', artist: 'Vincent van Gogh', likes: 549, views: 549, img: karya4 },
  ];

  // Fungsi saat kartu diklik
  const handleCardClick = () => {
    // Arahkan ke route yang sudah didaftarkan di App.js
    navigate('/detail-karya'); 
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans pb-20">
      
      {/* NAVBAR SUDAH DIHAPUS DARI SINI (Ada di App.js) */}

      <div className="container mx-auto px-6 lg:px-16 pt-10">
        
        {/* --- 1. SEARCH BAR --- */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-3xl">
            <input 
              type="text" 
              placeholder="Telusuri desain yang Anda suka?" 
              className="w-full py-4 pl-6 pr-12 rounded-lg text-gray-700 bg-white focus:outline-none shadow-md text-lg placeholder:text-gray-400"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={24} />
            </div>
          </div>
        </div>

        {/* --- 2. FILTER KATEGORI --- */}
        <div className="flex flex-nowrap justify-start lg:justify-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-lg font-bold text-base transition-all border-2 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#E3FB52] text-black border-[#E3FB52]' 
                  : 'bg-transparent text-[#E3FB52] border-[#E3FB52] hover:bg-[#E3FB52]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- 3. GRID GALERI --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer"
              onClick={handleCardClick} // 3. TAMBAHKAN ONCLICK DI SINI
            >
              
              {/* Gambar */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-gray-300">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              {/* Info Karya */}
              <div className="flex justify-between items-start">
                
                {/* Kiri: Judul & Artist */}
                <div>
                  <h3 className="text-white text-xl font-bold leading-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {item.artist}
                  </p>
                </div>

                {/* Kanan: Stats */}
                <div className="flex items-center gap-3 pt-1">
                  
                  {/* LIKE: Warna Lime (#E3FB52) */}
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={18} className="text-[#E3FB52]" />
                    <span className="text-gray-200 text-xs font-medium">{item.likes}</span>
                  </div>

                  {/* VIEW: Warna Abu (Gray) */}
                  <div className="flex items-center gap-1">
                    <Eye size={18} className="text-gray-400" /> 
                    <span className="text-gray-400 text-xs font-medium">{item.views}</span>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Galeri;