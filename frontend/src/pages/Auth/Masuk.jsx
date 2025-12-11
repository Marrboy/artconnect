import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'; // Tambah icon ShieldCheck

// --- BAGIAN INI HARUS DISESUAIKAN DI VS CODE ANDA ---
// 1. Hapus tanda komentar (//) pada baris import di bawah ini:
// import logoIs from '../../assets/logois.png'; 

// 2. Hapus baris const logoIs di bawah ini saat di VS Code:
const logoIs = "https://placehold.co/150x80/4F75FF/FFFFFF?text=ArtConnect"; 
// ----------------------------------------------------

const Masuk = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // LOGIKA LOGIN MANUAL
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);

    // Simulasi: Ambil nama dari bagian depan email (sebelum @)
    const dummyName = formData.email.split('@')[0]; 
    
    const userData = {
      name: dummyName.charAt(0).toUpperCase() + dummyName.slice(1), 
      email: formData.email,
      role: "user"
    };

    if (onLogin) {
      onLogin(userData);
    }

    navigate('/beranda');
  };

  // LOGIKA LOGIN GOOGLE
  const handleGoogleLogin = () => {
    const googleUser = {
      name: "Pengguna Google",
      email: "googleuser@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user"
    };

    if (onLogin) {
      onLogin(googleUser);
      navigate('/beranda');
    }
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        
        {/* BAGIAN KIRI (LOGO) */}
        <div className="text-center text-white order-last lg:order-first">
          <div className="flex justify-center mb-6 lg:mb-10">
            <img 
              src="/src/assets/logo.png" 
              alt="ArtConnect Logo" 
              className="h-40 lg:h-80 w-auto drop-shadow-2xl mx-auto"
              onError={(e) => {e.target.style.display='none'}} 
            />
          </div>
          <h1 className="text-4xl font-bold lg:hidden">ArtConnect</h1>
        </div>

        {/* BAGIAN KANAN (FORM LOGIN) */}
        <div>
          <h2 className="text-4xl font-bold text-white text-center mb-10">Masuk</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Email */}
            <div>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800 placeholder-gray-400" 
                required 
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800 placeholder-gray-400" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Lupa Password */}
            <div className="text-right">
              <Link to="/lupa-password" class="text-sm text-white hover:text-yellow-300 transition">
                Lupa password?
              </Link>
            </div>

            {/* Tombol Masuk */}
            <button 
              type="submit" 
              className="w-full bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-4 rounded-xl transition transform hover:scale-[1.02] cursor-pointer"
            >
              Masuk
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white text-sm">atau</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Tombol Google */}
            <button
              type="button"
              onClick={handleGoogleLogin} 
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-xl transition flex items-center justify-center gap-3 cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Masuk dengan Google
            </button>
          </form>
          
          <div className="text-center mt-6">
             <span className="text-white">Belum punya akun? </span>
             <Link to="/daftar" className="text-[#E3FB52] font-bold hover:underline">Daftar</Link>
          </div>

          {/* --- ✅ TAMBAHAN: LINK LOGIN ADMIN --- */}
          <div className="mt-10 pt-6 border-t border-white/20 text-center">
            <Link 
              to="/admin/masuk" 
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition hover:underline"
            >
              <ShieldCheck size={16} />
              Masuk sebagai Admin
            </Link>
          </div>
          {/* ------------------------------------- */}

        </div>
      </div>
    </div>
  );
};

export default Masuk;