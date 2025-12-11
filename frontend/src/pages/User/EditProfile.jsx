import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Tambahkan prop 'user' agar bisa membaca data saat ini
const EditProfile = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();

  // State Data Profil
  // Inisialisasi dengan data dari props 'user' jika ada, atau string kosong
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: user?.address || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  });

  // Effect ini memastikan jika data user dari database/API baru masuk, form akan terupdate
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        address: user.address || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Kirim data baru ke fungsi update di App.js
    if (onUpdateProfile) {
      onUpdateProfile(formData);
    }

    // 2. Beri notifikasi
    alert('Profil berhasil diperbarui!');

    // 3. PENTING: Kembali ke halaman Profile untuk melihat hasil perubahan
    navigate('/profile'); 
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans">
      
      <div className="flex justify-center pb-20 pt-10 px-4">
        <div className="w-full max-w-3xl">

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Avatar Besar */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  {/* Tampilkan preview avatar dari state formData */}
                  <img src={formData.avatar} alt="Profile Avatar" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  className="absolute bottom-4 right-4 bg-[#E3FB52] p-3 rounded-full shadow-lg hover:bg-[#d4ec43] transition text-black border-4 border-[#4F75FF]"
                  title="Ganti Foto"
                >
                  <Pencil size={24} fill="black" />
                </button>
              </div>
            </div>

            {/* Input: Nama Lengkap */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            {/* Input: Alamat */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">Alamat</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                placeholder="Masukkan alamat"
              />
            </div>

            {/* Input: Email */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                placeholder="Masukkan email"
              />
            </div>

            {/* Input: No Telephone */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">No Telephone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
                placeholder="+62 8xxxxx"
              />
            </div>

            {/* Tombol Simpan */}
            <button
              type="submit"
              className="w-full bg-[#E3FB52] text-black font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-[#d4ec43] transition transform hover:-translate-y-1 mt-8"
            >
              Simpan Perubahan
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;