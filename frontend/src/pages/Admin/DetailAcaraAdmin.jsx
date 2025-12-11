import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { ArrowLeft, Trash2 } from 'lucide-react';

const DetailAcaraAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  // === 1. AMBIL DATA DARI LOCALSTORAGE ===
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('admin_events')) || [];
    const foundEvent = savedEvents.find(e => e.id == id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Data Dummy jika tidak ketemu (Bisa dihapus nanti)
      setEvent({
        judul: 'Pameran Abstract',
        kategori: 'Pameran',
        tanggal: 'Senin, 12 Mei 2025',
        waktu: '09.00 - 12.00 WIB',
        harga: '25.000',
        alamat: 'Gedung Hawung Galuh International, Jakarta',
        deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        gambar: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=1000&q=80'
      });
    }
  }, [id]);

  // === 2. FUNGSI HAPUS ===
  const handleDelete = () => {
    if (window.confirm('Yakin ingin menghapus acara ini?')) {
      const savedEvents = JSON.parse(localStorage.getItem('admin_events')) || [];
      const updatedEvents = savedEvents.filter(e => e.id != id);
      localStorage.setItem('admin_events', JSON.stringify(updatedEvents));
      navigate('/admin/acara');
    }
  };

  // Helper Format Rupiah
  const formatRupiah = (angka) => {
    if(!angka) return 'Rp 0';
    return `Rp ${angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  if (!event) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans flex">
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Area Konten Utama */}
      <div className="flex-1 ml-64 flex flex-col h-screen">
        
        {/* Header Biru */}
        <div className="h-24 px-10 flex items-center gap-4 bg-[#4F75FF] shrink-0">
          <button 
            onClick={() => navigate('/admin/acara')} 
            className="text-white hover:bg-white/20 p-2 rounded-full transition"
          >
             <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-white tracking-wide">Detail Acara</h1>
        </div>

        {/* Konten Putih */}
        <main className="flex-1 bg-white p-10 overflow-y-auto">
          
          <div className="max-w-6xl mx-auto">
            
            {/* Judul Besar */}
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-extrabold text-gray-900">
                {event.judul}
              </h1>
              {/* Tombol Hapus (Opsional, letakkan disini agar rapi) */}
              <button 
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition text-sm"
              >
                <Trash2 size={16} /> Hapus
              </button>
            </div>

            {/* Gambar Utama */}
            <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden mb-10 shadow-sm">
              <img 
                src={event.gambar} 
                alt={event.judul} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* GRID LAYOUT: Deskripsi (Kiri) & Detail Teks (Kanan) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              {/* === KOLOM KIRI: DESKRIPSI === */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Deskripsi</h3>
                <p className="text-gray-700 text-base leading-relaxed text-justify whitespace-pre-line">
                  {event.deskripsi}
                </p>
              </div>

              {/* === KOLOM KANAN: RINCIAN TEKS (Sesuai Gambar Figma) === */}
              <div className="flex flex-col h-full justify-between">
                
                {/* List Informasi (Tanpa Ikon) */}
                <div className="space-y-5 text-lg">
                  
                  {/* Kategori */}
                  <div className="grid grid-cols-[150px_auto]">
                    <span className="font-bold text-gray-800">Kategori</span>
                    <span className="text-gray-800 font-medium">: {event.kategori}</span>
                  </div>

                  {/* Hari, Tanggal */}
                  <div className="grid grid-cols-[150px_auto]">
                    <span className="font-bold text-gray-800">Hari, Tanggal</span>
                    <span className="text-gray-800 font-medium">: {event.tanggal}</span>
                  </div>

                  {/* Waktu */}
                  <div className="grid grid-cols-[150px_auto]">
                    <span className="font-bold text-gray-800">Waktu</span>
                    <span className="text-gray-800 font-medium">: {event.waktu || '-'}</span>
                  </div>

                  {/* Harga Tiket */}
                  <div className="grid grid-cols-[150px_auto]">
                    <span className="font-bold text-gray-800">Harga Tiket</span>
                    <span className="text-gray-800 font-medium">
                      : {event.harga && event.harga !== '0' ? formatRupiah(event.harga) : 'Gratis'}
                    </span>
                  </div>

                  {/* Alamat */}
                  <div className="grid grid-cols-[150px_auto]">
                    <span className="font-bold text-gray-800">Alamat</span>
                    <span className="text-gray-800 font-medium leading-snug">
                      : {event.alamat}
                    </span>
                  </div>

                </div>

                {/* Tombol Kembali (Kuning) di Kanan Bawah */}
                <div className="flex justify-end mt-12">
                  <button 
                    onClick={() => navigate('/admin/acara')}
                    className="bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold py-3 px-10 rounded-xl transition shadow-sm"
                  >
                    Kembali
                  </button>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailAcaraAdmin;