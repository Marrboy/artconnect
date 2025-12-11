import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Minus, Plus, ArrowLeft } from 'lucide-react';
import seniImg from '../../assets/seni.png';

const Bayar = () => {
  const navigate = useNavigate();
  const [ticketCount, setTicketCount] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const pricePerTicket = 10000;

  const handleIncrement = () => setTicketCount(prev => prev + 1);
  const handleDecrement = () => setTicketCount(prev => (prev > 1 ? prev - 1 : 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  // --- TAMPILAN SUKSES (Revisi: Kotak Biasa & Tanpa Padding Berlebih) ---
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-4 font-sans">
        
        {/* REVISI: 
          - rounded-lg: Membuat sudut kotak lebih tajam (biasa).
          - p-4: Padding diminimalkan.
          - max-w-sm: Ukuran kotak diperkecil.
        */}
        <div className="bg-white rounded-lg p-5 max-w-sm w-full text-center shadow-xl animate-in zoom-in-95 duration-300">
          
          {/* Header Teks & Emoji */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex justify-center items-center gap-2 mt-2">
            Terima kasih! <span className="text-3xl">🎉</span>
          </h2>
          
          <p className="text-gray-900 font-medium text-base mb-6">
            Data kamu sudah terkirim
          </p>

          <button 
            onClick={() => window.open('https://wa.me/', '_blank')}
            className="bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold py-3 px-4 rounded-md transition shadow-sm w-full text-base"
          >
            Konfirmasi via WhatsApp
          </button>
        </div>
      </div>
    );
  }

  // --- TAMPILAN FORM (Tetap) ---
  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans py-10 px-4 flex justify-center items-center">
      
      <div className="bg-white rounded-[30px] p-8 w-full max-w-3xl shadow-2xl relative">
        {/* Header Event */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 mt-12 md:mt-0">
          <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0">
            <img src={seniImg} alt="Event" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              Pameran Seni Digital Nusantara 2025
            </h1>
            <div className="space-y-1 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#4F75FF]" />
                <span>Gedung Hawung Galuh International, Jakarta</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#4F75FF]" />
                <span>12 mei 2025</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Jumlah Tiket */}
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-gray-900 font-bold mb-1">Jumlah Tiket</label>
              <p className="text-gray-500 text-sm">Rp {pricePerTicket.toLocaleString('id-ID')} /Tiket</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={handleDecrement}
                className="w-8 h-8 rounded-full bg-[#E3FB52] text-black flex items-center justify-center font-bold hover:bg-[#d9f046] transition disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold text-gray-900 w-4 text-center">{ticketCount}</span>
              <button 
                type="button" 
                onClick={handleIncrement}
                className="w-8 h-8 rounded-full bg-[#E3FB52] text-black flex items-center justify-center font-bold hover:bg-[#d9f046] transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Nama Peserta */}
          <div className="space-y-2">
            <label className="block text-gray-900 font-bold">Nama Peserta</label>
            <p className="text-xs text-gray-400">Peserta 1</p>
            <input 
              type="text" 
              placeholder="Masukkan nama lengkap" 
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] transition"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div className="space-y-2">
            <label className="block text-gray-900 font-bold">Nomor WhatsApp</label>
            <p className="text-xs text-gray-400">+62 8xxxxxxxxxx</p>
            <input 
              type="tel" 
              placeholder="Masukkan Nomor WhatsApp" 
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] transition"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold py-3 px-10 rounded-xl transition shadow-lg transform hover:-translate-y-0.5"
            >
              Kirim
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Bayar;