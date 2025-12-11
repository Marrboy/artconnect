import React from 'react';
import { ThumbsUp, Eye } from 'lucide-react'; 

const CardKarya = ({ image, title, artistName, likes, views }) => {
  return (
    <div className="group cursor-pointer">
      {/* 1. Container Gambar: Rounded 16px */}
      <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* 2. Konten Card: Background Putih DIHAPUS */}
      {/* "paddingnya 8 ajh" -> Kita gunakan mt-2 (margin-top: 8px) untuk jarak dari gambar */}
      <div className="mt-2">
        <div className="flex justify-between items-start">
          
          {/* Kiri: Judul & Nama */}
          <div className="flex flex-col pr-2">
            <h3 className="font-bold text-white text-lg leading-tight truncate">
              {title}
            </h3>
            <p className="text-white/80 text-sm mt-0.5 truncate">
              {artistName}
            </p>
          </div>

          {/* Kanan: Ikon (Disamping Nama/Judul) */}
          <div className="flex items-center gap-3 shrink-0 pt-1">
            <div className="flex items-center gap-1">
              {/* Ikon Jempol warna Lime (#E3FB52) */}
              <ThumbsUp size={16} className="text-[#E3FB52]" strokeWidth={2.5} /> 
              <span className="text-gray-200 text-xs font-medium">{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={16} className="text-gray-300" />
              <span className="text-gray-200 text-xs font-medium">{views}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardKarya;