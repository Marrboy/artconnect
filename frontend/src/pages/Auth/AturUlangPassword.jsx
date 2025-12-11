import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoIs from '../../assets/logo.png';

const AturUlangPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ password: '', konfirmasi: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.konfirmasi) {
      alert("Password tidak sama!");
      return;
    }
    setIsSuccess(true);
  };

  // --- TAMPILAN JIKA BERHASIL (Sesuai Gambar "Berhasil Ubah Password") ---
  if (isSuccess) {
    return (
      // Background tetap biru
      <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-4">
        {/* Kartu Putih Kotak */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md text-center flex flex-col items-center animate-fade-in-up">
          {/* Icon Centang Biru */}
          <div className="w-20 h-20 bg-[#4F75FF] rounded-full flex items-center justify-center mb-6">
            <Check size={40} color="white" strokeWidth={3} />
          </div>
          
          <h2 className="text-[#4F75FF] font-bold text-2xl mb-2">YEAY, BERHASIL!</h2>
          <p className="text-gray-500 font-medium mb-8">Password berhasil diperbarui</p>
        </div>
      </div>
    );
  }

  // --- TAMPILAN UTAMA (Split Screen) ---
  return (
    <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-8">
      <div className="w-full max-w-6xl grid grid-cols-2 gap-20 items-center">
        <div className="text-center text-white">
          <div className="flex justify-center mb-10">
            <img 
              src="/src/assets/logo.png" 
              alt="ArtConnect Logo" 
              className="h-80 w-auto drop-shadow-2xl"
            />
          </div>
        </div>

        {/* --- BAGIAN KANAN: FORM (Transparan) --- */}
        <div className="flex justify-center lg:justify-start lg:pl-20 w-full">
          <div className="w-full max-w-md">
            {/* Judul Form */}
            <h2 className="text-4xl font-bold text-white text-center mb-10">Atur Ulang Password</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Password Baru */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  // Style input putih bersih tanpa border, rounded kotak sedikit (md/lg)
                  className="w-full px-5 py-4 rounded-lg bg-white border-none focus:ring-0 outline-none text-gray-800 placeholder-gray-500 [&::-ms-reveal]:hidden [&::-webkit-password-reveal-button]:hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Input Konfirmasi Password */}
              <div className="relative">
                <input
                  type={showKonfirmasi ? "text" : "password"}
                  name="konfirmasi"
                  placeholder="Konfirmasi Password"
                  value={formData.konfirmasi}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg bg-white border-none focus:ring-0 outline-none text-gray-800 placeholder-gray-500 [&::-ms-reveal]:hidden [&::-webkit-password-reveal-button]:hidden"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowKonfirmasi(!showKonfirmasi)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                >
                  {showKonfirmasi ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Tombol Submit (Warna Lime) */}
              <button
                type="submit"
                className="w-full bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-3 rounded-lg transition duration-200 mt-2"
              >
                Submit
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AturUlangPassword;