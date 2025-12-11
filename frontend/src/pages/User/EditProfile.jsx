import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // ✅ Import API Helper

const EditProfile = ({ user, onUpdateProfile }) => {
  const navigate = useNavigate();

  // State Data Profil
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  });

  // Ambil data terbaru dari backend saat halaman dimuat
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/users/me'); // Endpoint lihat profil sendiri
        const data = response.data;
        
        setFormData({
          name: data.name || '',
          email: data.email || '',
          address: data.bio || '', // Mapping 'bio' backend ke 'address' frontend (sesuai ketersediaan field)
          phone: data.phone || '', // Jika backend belum support phone, ini akan kosong
          avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        });
      } catch (error) {
        console.error("Gagal ambil data profil:", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ LOGIKA UPDATE KE BACKEND
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Kirim data ke API (PUT /api/users/me)
      const response = await api.put('/api/users/me', {
        name: formData.name,
        bio: formData.address, // Kita simpan alamat di field 'bio' backend
        avatar: formData.avatar
        // email & phone biasanya tidak bisa diubah sembarangan tanpa verifikasi ulang di backend
      });

      // 2. Update State Global di App.jsx
      if (onUpdateProfile) {
        onUpdateProfile(response.data); // Update dengan data balikan dari server
      }

      // 3. Beri notifikasi & Redirect
      alert('Profil berhasil diperbarui!');
      navigate('/profile');

    } catch (error) {
      console.error("Gagal update profil:", error);
      alert('Gagal memperbarui profil.');
    }
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
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20" placeholder="Masukkan nama lengkap" />
            </div>

            {/* Input: Alamat */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">Alamat</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20" placeholder="Masukkan alamat" />
            </div>

            {/* Input: Email */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">Email</label>
              <input type="text" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20" placeholder="Masukkan email" disabled />
            </div>

            {/* Input: No Telephone */}
            <div className="space-y-2">
              <label className="text-white font-medium text-lg ml-1">No Telephone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-4 rounded-lg bg-white text-gray-900 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-white/20" placeholder="+62 8xxxxx" />
            </div>

            {/* Tombol Simpan */}
            <button type="submit" className="w-full bg-[#E3FB52] text-black font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-[#d4ec43] transition transform hover:-translate-y-1 mt-8">
              Simpan Perubahan
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;