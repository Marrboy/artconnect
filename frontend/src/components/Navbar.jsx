import { LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Pastikan path import gambar ini sesuai dengan struktur folder Anda
import logoIs from '../assets/logois.png';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sembunyikan Navbar di halaman Auth agar full screen bersih
  if (['/login', '/masuk', '/register', '/daftar', '/mulai-sekarang', '/lupa-password'].includes(location.pathname)) {
    return null;
  }

  // --- HELPER UNTUK STYLING LINK DESKTOP ---
  const navLinkClass = (path) => {
  const isActive = 
    location.pathname === path ||
    location.pathname.startsWith(`${path}/`);

  return isActive 
    ? "text-[#E3FB52] font-bold border-b-2 border-[#E3FB52] pb-1 transition-all duration-300"
    : "text-white/90 hover:text-[#E3FB52] font-medium transition-colors duration-300";
};

  // --- HELPER UNTUK STYLING LINK MOBILE ---
  const mobileNavLinkClass = (path) => {
  const isActive =
    location.pathname === path ||
    location.pathname.startsWith(`${path}/`);

  return isActive
    ? "block text-[#E3FB52] font-bold pl-4 border-l-4 border-[#E3FB52] bg-white/5 py-2 rounded-r-lg"
    : "block text-white font-medium hover:text-[#E3FB52] hover:bg-white/5 py-2 px-4 rounded-lg transition-all";
};


  return (
    <nav className="bg-[#4F75FF] py-4 px-6 lg:px-16 sticky top-0 z-50 shadow-sm font-sans">
      <div className="grid grid-cols-3 items-center gap-6 relative">

        {/* --- LOGO (Left Side) --- */}
        <div className="col-span-1 flex items-center">
          <Link to="/" className="flex items-center gap-3 group hover:opacity-90 transition">
            <img 
              src={logoIs} 
              alt="ArtConnect Logo" 
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          </Link>
        </div>

        {/* --- MENU TENGAH (Desktop) --- */}
        <div className="col-span-1 hidden md:flex items-center justify-center gap-12 lg:gap-16">
          <Link to="/beranda" className={navLinkClass('/beranda')}>Beranda</Link>
          <Link to="/acara" className={navLinkClass('/acara')}>Acara</Link>
          <Link to="/galeri" className={navLinkClass('/galeri')}>Galeri</Link>
        </div>

        {/* --- MENU KANAN (Right Side) --- */}
        <div className="col-span-1 items-center justify-end gap-4 hidden md:flex">
          {user ? (
            // TAMPILAN JIKA SUDAH LOGIN
            <>
              <Link to="/upload" className="px-4 py-2 rounded-xl border border-[#E3FB52] text-[#E3FB52] text-sm font-semibold hover:bg-[#E3FB52] hover:text-[#4F75FF] transition">
                Unggah Karya
              </Link>
              
              {/* Profil Dropdown */}
              <div 
                className="relative ml-2 h-full flex items-center" 
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                  {/* Avatar User */}
                  <div className="py-2 cursor-pointer"> 
                    <img 
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                      alt="Profile" 
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-white object-cover hover:border-[#E3FB52] transition" 
                    />
                  </div>
                  
                  {/* Dropdown Content */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full pt-2 w-56 z-50">
                      <div className="bg-white rounded-xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 border border-gray-100">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                          <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        
                        <Link to="/profile" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#4F75FF] flex items-center gap-2 transition-colors">
                          <User size={16} /> Profil Saya
                        </Link>
                        
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        <button 
                          onClick={onLogout} 
                          className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium flex items-center gap-2 transition-colors"
                        >
                          <LogOut size={16} /> Keluar
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </>
          ) : (
            // TAMPILAN JIKA BELUM LOGIN
            <>
              <Link to="/mulai-sekarang" className="px-5 py-2.5 rounded-xl border border-[#E3FB52] text-[#E3FB52] font-semibold hover:bg-[#E3FB52] hover:text-[#4F75FF] transition text-sm">
                Mulai Sekarang
              </Link>
              <Link to="/masuk" className="px-5 py-2.5 rounded-xl bg-[#E3FB52] text-[#4F75FF] font-bold hover:bg-[#d4ec43] transition shadow-lg text-sm">
                Masuk
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-white ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU CONTENT --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-white/20 pt-4 animate-in slide-in-from-top-5">
          {/* Menu Mobile juga menggunakan logic Active */}
          <Link to="/beranda" className={mobileNavLinkClass('/beranda')} onClick={() => setIsMobileMenuOpen(false)}>Beranda</Link>
          <Link to="/acara" className={mobileNavLinkClass('/acara')} onClick={() => setIsMobileMenuOpen(false)}>Acara</Link>
          <Link to="/galeri" className={mobileNavLinkClass('/galeri')} onClick={() => setIsMobileMenuOpen(false)}>Galeri</Link>
          
          <div className="pt-4 border-t border-white/20 space-y-3 px-2">
             {user ? (
               <>
                 <div className="flex items-center gap-3 mb-4 px-2 bg-white/10 p-3 rounded-xl">
                    <img 
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                      className="w-10 h-10 rounded-full border border-white" 
                      alt="Profile" 
                    />
                    <div className="overflow-hidden">
                        <p className="text-white font-bold text-sm truncate">{user.name}</p>
                        <p className="text-white/60 text-xs truncate">{user.email}</p>
                    </div>
                 </div>
                 <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-xl border border-white/40 text-white hover:bg-white/10">Edit Profil</Link>
                 <Link to="/tambah-acara" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-xl border border-white/40 text-white hover:bg-white/10">Tambah Acara</Link>
                 <Link to="/upload" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-xl bg-[#E3FB52] text-[#4F75FF] font-bold">Unggah Karya</Link>
                 <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-center py-2 rounded-xl bg-red-500/20 text-red-200 mt-2 hover:bg-red-500/30">Keluar</button>
               </>
             ) : (
               <>
                 <Link to="/masuk" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-xl bg-[#E3FB52] text-[#4F75FF] font-bold">Masuk</Link>
                 <Link to="/mulai-sekarang" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-xl border border-white text-white font-semibold">Mulai Sekarang</Link>
               </>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;