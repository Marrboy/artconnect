import React, { useState, useEffect } from 'react';
import { Edit, LogOut, MapPin, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // ✅ Import API Helper
import bannerImage from '../../assets/acara.png'; 

const Profile = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // State untuk menyimpan daftar karya user
  const [myArtworks, setMyArtworks] = useState([]);

  // ✅ AMBIL DATA DARI BACKEND
  useEffect(() => {
    const fetchMyArtworks = async () => {
      try {
        // 1. Ambil data user dulu untuk dapat ID-nya
        const userRes = await api.get('/api/users/me');
        const userId = userRes.data.id;

        // 2. Ambil daftar karya berdasarkan User ID
        // Endpoint: GET /api/users/:id/arts
        const artsRes = await api.get(`/api/users/${userId}/arts`);
        
        setMyArtworks(artsRes.data);
      } catch (error) {
        console.error("Gagal ambil karya:", error);
      }
    };

    fetchMyArtworks();
  }, []);

  // ✅ FUNGSI HAPUS KARYA (API)
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus karya ini?")) {
      try {
        // Endpoint: DELETE /api/arts/:id
        await api.delete(`/api/arts/${id}`);
        
        // Update state tampilan (hapus dari layar)
        setMyArtworks(myArtworks.filter(art => art.id !== id));
      } catch (error) {
        console.error("Gagal hapus karya:", error);
        alert("Gagal menghapus karya.");
      }
    }
  };

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancelLogout = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) onLogout();
  };

  return (
    <div className="min-h-screen bg-white font-sans relative">
      
      {/* --- BANNER --- */}
      <div className="relative h-64 bg-[#FF8C42] overflow-hidden">
        <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative mt-0 z-10">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT SIDEBAR (User Profile) */}
          <div className="w-full lg:w-80 bg-white min-h-screen px-0 border-r border-gray-100">
            <div className="w-full mt-12 lg:mt-20 bg-white text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
                  <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="User" className="w-full h-full object-cover" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name || 'Nama Pengguna'}</h2>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-6">
                <MapPin size={14} />
                {/* Menampilkan bio sebagai alamat jika backend menggunakan field bio */}
                <span className="text-xs font-medium">{user?.address || user?.bio || 'Surabaya, Indonesia'}</span>
              </div>
              <div className="space-y-3 px-6 pb-8">
                <Link to="/edit-profile" className="w-full bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-sm">
                  <Edit size={16} /> Edit Profile
                </Link>
                <button onClick={handleLogoutClick} className="w-full bg-[#FF0000] hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-sm">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT AREA (Grid Karya) */}
          <div className="flex-1 bg-[#4F75FF] pt-12 lg:pt-20 pb-20 px-6 lg:pl-12 lg:pr-12 min-h-screen">
            
            {/* Judul Karya */}
            <div className="mb-8 flex gap-6 text-white font-bold text-2xl border-b-2 border-white/20 pb-2 w-fit">
              <span>Karya</span>
            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* 1. MAPPING KARYA DARI API */}
              {myArtworks.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Gambar Karya */}
                  <div className="w-full aspect-video rounded-[15px] overflow-hidden bg-gray-200 mb-4">
                    {/* Backend biasanya kirim field 'imageUrl', frontend lama pakai 'image'. Kita handle keduanya */}
                    <img src={item.imageUrl || item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Tombol Edit & Hapus */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold py-2 rounded-lg text-sm transition">
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-[#FF0000] hover:bg-red-600 text-white font-bold py-2 rounded-lg text-sm transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}

              {/* 2. KARTU TAMBAH KARYA */}
              <div 
                onClick={() => navigate('/upload')}
                className="bg-white rounded-[20px] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center min-h-[200px]"
              >
                <div className="w-16 h-16 bg-[#4F75FF] rounded-full flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                  <Plus size={32} className="text-white" />
                </div>
                <span className="text-black font-bold text-lg">Tambah Karya</span>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Modal Logout (Tetap Sama) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[30px] p-8 w-full max-w-md text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-3xl font-bold text-black mb-3">Logout Sekarang?</h2>
            <p className="text-gray-600 text-base mb-8 font-medium">Apakah Anda yakin ingin keluar dari akun?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleCancelLogout} className="px-10 py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-bold hover:bg-gray-50 transition min-w-[120px]">Batal</button>
              <button onClick={handleConfirmLogout} className="px-10 py-3 rounded-xl bg-[#E3FB52] text-black font-bold hover:bg-[#d9f046] transition min-w-[120px]">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;