import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar'; // Import Sidebar yg baru dibuat
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const ManajemenAcara = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]); 

  // ✅ AMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/events');
        setEvents(response.data); // Simpan data dari database
      } catch (error) {
        console.error("Gagal ambil data:", error);
        // Jika token expired (401), tendang ke login
        if (error.response && error.response.status === 401) {
            navigate('/admin/masuk');
        }
      }
    };
    fetchEvents();
  }, [navigate]);

  // ✅ HAPUS DATA DI BACKEND
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus acara ini?")) {
        try {
            await api.delete(`/api/events/${id}`);
            // Update tampilan setelah berhasil hapus
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error("Gagal hapus:", error);
            alert("Gagal menghapus acara.");
        }
    }
  };

  return (
    // Container Utama: Flexrow
    <div className="min-h-screen bg-[#F3F4F6] font-sans flex">
      
      {/* 1. PASANG SIDEBAR DISINI */}
      <AdminSidebar />

      {/* 2. AREA KONTEN KANAN */}
      {/* ml-64: Memberi jarak kiri selebar sidebar (agar tidak tertumpuk) */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* --- HEADER BIRU --- */}
        <div className="h-24 px-10 flex justify-between items-center bg-[#4F75FF] shadow-md">
          <h1 className="text-3xl font-bold text-white tracking-wide">Acara</h1>
          
          {/* Profil Admin */}
          <div className="flex items-center gap-3">
             <span className="text-white font-medium hidden md:block">Halo, Admin</span>
             <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-md bg-gray-300">
               <img 
                 src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" 
                 alt="Admin" 
                 className="w-full h-full object-cover" 
               />
             </div>
          </div>
        </div>

        {/* --- KONTEN PUTIH DI BAWAH HEADER --- */}
        <main className="flex-1 p-10 overflow-y-auto">
          
          {/* Tombol Tambah */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/admin/tambah-acara')} 
              className="flex items-center gap-2 px-8 py-3 bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold rounded-xl shadow-md transition transform hover:-translate-y-1 text-sm"
            >
              <Plus size={20} /> Tambah
            </button>
          </div>

          {/* Tabel Data / Empty State */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] p-6">
            {events.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#4F75FF] text-white text-sm uppercase tracking-wider">
                      <th className="p-4 font-bold text-center border-r border-white/20">Kategori</th>
                      <th className="p-4 font-bold text-center border-r border-white/20">Judul</th>
                      <th className="p-4 font-bold text-center border-r border-white/20">Tanggal</th>
                      <th className="p-4 font-bold text-center border-r border-white/20">Alamat</th>
                      <th className="p-4 font-bold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-sm text-gray-700">
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 text-center font-semibold border-r border-gray-100">{event.kategori}</td>
                        <td className="p-4 text-center font-semibold border-r border-gray-100">{event.judul}</td>
                        <td className="p-4 text-center border-r border-gray-100">{event.tanggal}</td>
                        <td className="p-4 text-center border-r border-gray-100 truncate max-w-[200px]">{event.alamat}</td>
                        <td className="p-4 flex justify-center gap-2">
                          <button 
                            onClick={() => navigate(`/admin/acara/${event.id}`)}
                            className="px-3 py-1.5 bg-[#E3FB52] text-black font-bold rounded hover:bg-[#d9f046] transition shadow-sm text-xs"
                          >
                            Detail
                          </button>
                          <button 
                            onClick={() => handleDelete(event.id)}
                            className="px-3 py-1.5 bg-[#FF0000] text-white font-bold rounded hover:bg-red-600 transition shadow-sm text-xs"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <p className="text-gray-500 font-medium mb-1">Belum ada acara yang ditambahkan.</p>
                <p className="text-gray-400 text-sm">Silakan klik tombol "Tambah" di atas.</p>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default ManajemenAcara;