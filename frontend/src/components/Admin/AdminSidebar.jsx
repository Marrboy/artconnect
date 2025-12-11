import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Hanya import ikon yang terpakai (Calendar dan LogOut)
import { Calendar, LogOut } from 'lucide-react';

// --- REVISI 2: Ganti import logo ke 'logoadmin.png' ---
// Pastikan file ini ADA di folder src/assets/
import logoAdmin from '../../assets/logoadmin.png';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fungsi untuk mengecek menu mana yang aktif
  // Menggunakan startsWith agar saat buka detail acara (/admin/acara/123), menu 'Acara' tetap aktif
  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    // Hapus sesi user (sesuaikan key localStorage Anda jika berbeda)
    localStorage.removeItem('artconnect_user');
    // Redirect ke halaman login
    navigate('/masuk');
  };

  // --- REVISI 1: Menu Kategori HANYA 'Acara' ---
  const menuItems = [
    // { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }, // DIHAPUS
    { path: '/admin/acara', icon: Calendar, label: 'Acara' },
    // { path: '/admin/pesanan', icon: ShoppingCart, label: 'Pesanan' }, // DIHAPUS
    // { path: '/admin/pengguna', icon: Users, label: 'Pengguna' },     // DIHAPUS
  ];

  return (
    <div className="w-64 bg-[#4F75FF] min-h-screen fixed left-0 top-0 text-white flex flex-col z-50 shadow-xl">
      
      {/* --- LOGO AREA --- */}
      <div className="h-32 flex flex-col items-center justify-center pt-8 pb-4">
         {/* Gunakan variabel logoAdmin yang baru */}
         <img 
           src={logoAdmin} 
           alt="ArtConnect Admin Logo" 
           // Sesuaikan ukuran w- dan h- jika perlu
           className="w-20 h-20 object-contain mb-2" 
         />
      </div>

      {/* --- MENU NAVIGASI --- */}
      <nav className="flex-1 px-4 space-y-4 mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 font-bold text-lg ${
              isActive(item.path)
                ? 'bg-[#E3FB52] text-black shadow-md' // Style Aktif (Kuning)
                : 'text-white hover:bg-white/10'      // Style Tidak Aktif
            }`}
          >
            <item.icon size={22} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* --- TOMBOL LOGOUT --- */}
      <div className="p-6 mt-auto mb-4">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF0000]/80 text-white rounded-xl font-bold hover:bg-[#FF0000] transition shadow-lg"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;