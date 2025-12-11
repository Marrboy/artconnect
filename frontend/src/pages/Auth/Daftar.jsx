import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

// PENTING: Tambahkan 'onLogin' di sini untuk fitur Google
const Daftar = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // LOGIKA DAFTAR MANUAL (Tetap redirect ke Masuk)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.konfirmasiPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      return;
    }

    console.log('Data Pendaftaran:', formData);
    alert("Pendaftaran Berhasil! Silakan masuk dengan akun Anda.");
    
    // Redirect ke halaman masuk (Bukan login langsung)
    navigate('/masuk');
  };

  // LOGIKA LOGIN GOOGLE (Langsung Masuk ke Beranda)
  const handleGoogleLogin = () => {
    // 1. Buat data pura-pura dari Google
    const googleUser = {
      name: "Pengguna Google",
      email: "googleuser@gmail.com",
      avatar: "https://lh3.googleusercontent.com/a/default-user" // Contoh link avatar
    };

    // 2. Panggil fungsi login dari App.jsx
    if (onLogin) {
      onLogin(googleUser);
      // 3. Langsung masuk ke aplikasi
      navigate('/beranda');
    }
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        
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

        <div>
          <h2 className="text-4xl font-bold text-white text-center mb-10">Daftar</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ... INPUT FORM SAMA SEPERTI SEBELUMNYA ... */}
            <div>
              <input type="text" name="namaLengkap" placeholder="Nama Lengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800" required />
            </div>
            <div>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800" required />
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600">{showPassword ? <EyeOff size={22} /> : <Eye size={22} />}</button>
            </div>
            <div className="relative">
              <input type={showKonfirmasi ? "text" : "password"} name="konfirmasiPassword" placeholder="Konfirmasi Password" value={formData.konfirmasiPassword} onChange={handleChange} className="w-full px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-yellow-400 outline-none text-gray-800" required />
              <button type="button" onClick={() => setShowKonfirmasi(!showKonfirmasi)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600">{showKonfirmasi ? <EyeOff size={22} /> : <Eye size={22} />}</button>
            </div>

            <button type="submit" className="w-full bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-4 rounded-xl transition transform hover:scale-[1.02]">Daftar</button>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/30"></div><span className="text-white text-sm">atau</span><div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* TOMBOL GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin} // Panggil fungsi di sini
              className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 rounded-xl transition flex items-center justify-center gap-3"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Masuk dengan Google
            </button>
          </form>
          
          <div className="text-center mt-6">
             <span className="text-white">Sudah punya akun? </span>
             <Link to="/masuk" className="text-[#E3FB52] font-bold hover:underline">Masuk disini</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daftar;