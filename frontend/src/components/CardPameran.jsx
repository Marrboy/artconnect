import React from 'react';
import { Calendar, MapPin, Wallet } from 'lucide-react';

const CardPameran = ({ image, title, date, price, location }) => {
  return (
    <div className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group cursor-pointer overflow-hidden">
      
      {/* Gambar Card */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Konten Card */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Judul: Ditambah 'truncate' agar tetap 1 baris */}
        <h3 className="font-bold text-gray-900 text-lg mb-3 leading-tight truncate" title={title}>
          {title}
        </h3>

        {/* Info Tanggal */}
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-2">
          <Calendar size={16} className="text-gray-500 shrink-0" />
          <span>{date}</span>
        </div>

        {/* Info Harga */}
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-2">
          <Wallet size={16} className="text-gray-500 shrink-0" />
          <span>{price}</span>
        </div>

        {/* Info Lokasi: Ditambah 'truncate' agar tetap 1 baris */}
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-5">
          <MapPin size={16} className="text-gray-500 shrink-0" />
          <span className="truncate" title={location}>{location}</span>
        </div>

        {/* Tombol Lihat Daftar */}
        <button className="mt-auto w-full bg-[#E3FB52] hover:bg-[#d9f046] text-black font-semibold py-3 rounded-lg transition-colors text-sm">
          Lihat Daftar
        </button>
      </div>
    </div>
  );
};

export default CardPameran;