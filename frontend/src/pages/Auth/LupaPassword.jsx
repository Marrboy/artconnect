import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LupaPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // Langsung arahkan ke halaman atur ulang (simulasi)
    navigate('/atur-ulang-password');
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] flex items-center justify-center p-4">
      {/* Container Kartu Putih */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Lupa Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Style Input: Border tipis, rounded, text gray
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#E3FB52] focus:border-transparent outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#E3FB52] hover:bg-[#d4ec43] text-black font-bold py-3 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LupaPassword;