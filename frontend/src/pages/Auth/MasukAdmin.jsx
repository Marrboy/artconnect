import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logoImage from '../../assets/logoadmin.png'; // Pastikan path logo benar

const MasukAdmin = () => {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Hapus error saat mengetik
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // --- LOGIKA LOGIN DUMMY ---
    // Username: admin@artconnect.com
    // Password: admin123
    if (formData.email === 'admin@artconnect.com' && formData.password === 'admin123') {
      
      // Simpan sesi admin di localStorage
      const adminData = {
        name: 'Super Admin',
        email: formData.email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      };
      localStorage.setItem('artconnect_admin', JSON.stringify(adminData));
      
      // Redirect ke Dashboard Admin
      navigate('/admin/dashboard');
    } else {
      setError('Email atau password salah!');
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      
      {/* === BAGIAN KIRI (BRANDING BIRU) === */}
      <div className="hidden lg:flex w-1/2 bg-[#4F75FF] flex-col justify-center items-center text-white p-12 relative overflow-hidden">
        {/* Dekorasi Background Circle */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 text-center">
          <img 
            src={logoImage} 
            alt="ArtConnect Logo" 
            className="w-32 h-32 object-contain mx-auto mb-6 drop-shadow-lg"
          />
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Kelola acara, pantau pengguna, dan atur konten ArtConnect di satu tempat.
          </p>
        </div>
      </div>

      {/* === BAGIAN KANAN (FORMULIR PUTIH) === */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center p-8 lg:p-24">
        
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang Kembali!</h2>
            <p className="text-gray-500">Silakan masuk untuk mengakses dashboard admin.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Admin</label>
              <div className="relative">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@artconnect.com"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] focus:border-transparent transition"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] focus:border-transparent transition"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg border border-red-100 font-medium">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full h-14 bg-[#E3FB52] hover:bg-[#d9f046] text-black font-bold rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              Masuk Dashboard <ArrowRight size={20} />
            </button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Lupa password? Hubungi Tim IT ArtConnect.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MasukAdmin;