import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages Auth (User)
import Daftar from './pages/Auth/Daftar';
import Masuk from './pages/Auth/Masuk';
import LupaPassword from './pages/Auth/LupaPassword';
import AturUlangPassword from './pages/Auth/AturUlangPassword';

// Import Page Auth (Admin) - ✅ BARU
import MasukAdmin from './pages/Auth/MasukAdmin';

// Import Pages Dashboard/User
import Beranda from './pages/Dashboard/Beranda';
import Acara from './pages/Dashboard/Acara';
import DetailAcara from './pages/Dashboard/DetailAcara'; // Detail untuk User
import Bayar from './pages/Dashboard/Bayar';
import Galeri from './pages/Dashboard/Galeri'; 
import DetailKarya from './pages/Dashboard/DetailKarya'; 
import EditProfile from './pages/User/EditProfile';
import Profile from './pages/User/Profile';

// Import Pages Upload (User)
import TambahAcara from './pages/Upload/TambahAcara'; 
import Unggah from './pages/Upload/Unggah';

// Import Pages Admin
import ManajemenAcara from './pages/Admin/ManajemenAcara';
import DetailAcaraAdmin from './pages/Admin/DetailAcaraAdmin'; 

function App() {
  // --- STATE & LOGIC UNTUK USER (TIDAK DIUBAH) ---
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('artconnect_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    console.log("User Login:", userData);
    const userWithDetails = {
      ...userData,
      address: userData.address || 'Surabaya, Indonesia',
      accountNumber: userData.accountNumber || '0899',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    setUser(userWithDetails);
    localStorage.setItem('artconnect_user', JSON.stringify(userWithDetails));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('artconnect_user');
  };

  const handleUpdateProfile = (updatedData) => {
    const newUserState = { ...user, ...updatedData };
    setUser(newUserState);
    localStorage.setItem('artconnect_user', JSON.stringify(newUserState));
  };

  return (
    <Router>
      <Routes>
        
        {/* =======================================
            AREA ADMIN (Layout Khusus & Proteksi)
           ======================================= */}
        
        {/* 1. Halaman Login Admin (Bebas Akses) */}
        <Route path="/admin/masuk" element={<MasukAdmin />} />

        {/* 2. Redirect Default: Cek Login Admin */}
        <Route 
          path="/admin" 
          element={
            localStorage.getItem('artconnect_admin') 
              ? <Navigate to="/admin/acara" replace /> 
              : <Navigate to="/admin/masuk" replace />
          } 
        />
        
        {/* 3. Halaman Dashboard/Acara (PROTECTED) */}
        <Route 
          path="/admin/dashboard" 
          element={
            localStorage.getItem('artconnect_admin') ? <ManajemenAcara /> : <Navigate to="/admin/masuk" />
          } 
        />
        <Route 
          path="/admin/acara" 
          element={
            localStorage.getItem('artconnect_admin') ? <ManajemenAcara /> : <Navigate to="/admin/masuk" />
          } 
        />
        
        {/* 4. Form Tambah Acara Admin (PROTECTED - Pakai komponen User) */}
        <Route 
          path="/admin/tambah-acara" 
          element={
            localStorage.getItem('artconnect_admin') ? <TambahAcara /> : <Navigate to="/admin/masuk" />
          } 
        />
        
        {/* 5. Detail Acara Admin (PROTECTED) */}
        <Route 
          path="/admin/acara/:id" 
          element={
            localStorage.getItem('artconnect_admin') ? <DetailAcaraAdmin /> : <Navigate to="/admin/masuk" />
          } 
        />
        
        {/* 6. Fallback Admin */}
        <Route path="/admin/*" element={<Navigate to="/admin/acara" />} />


        {/* =======================================
            AREA USER (Layout Navbar & Footer)
           ======================================= */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar user={user} onLogout={handleLogout} />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Navigate to="/beranda" replace />} />

                  {/* Auth User */}
                  <Route path="/daftar" element={user ? <Navigate to="/beranda" /> : <Daftar onLogin={handleLogin} />} />
                  <Route path="/masuk" element={user ? <Navigate to="/beranda" /> : <Masuk onLogin={handleLogin} />} />
                  <Route path="/mulai-sekarang" element={user ? <Navigate to="/beranda" /> : <Daftar onLogin={handleLogin} />} />
                  <Route path="/lupa-password" element={<LupaPassword />} />
                  <Route path="/atur-ulang-password" element={<AturUlangPassword />} />

                  {/* Public Dashboard */}
                  <Route path="/beranda" element={<Beranda />} />
                  <Route path="/acara" element={<Acara />} />
                  <Route path="/acara/:id" element={<DetailAcara />} />
                  <Route path="/bayar/:id" element={<Bayar />} />
                  <Route path="/galeri" element={<Galeri />} />
                  <Route path="/detail-karya" element={<DetailKarya />} />

                  {/* Protected User Routes */}
                  <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/masuk" />} />
                  <Route path="/edit-profile" element={user ? <EditProfile user={user} onUpdateProfile={handleUpdateProfile} /> : <Navigate to="/masuk" />} />
                  
                  {/* Tambah Acara (Versi User) */}
                  <Route path="/tambah-acara" element={user ? <TambahAcara /> : <Navigate to="/masuk" />} />
                  <Route path="/upload" element={user ? <Unggah /> : <Navigate to="/masuk" />} />

                  {/* Fallback Umum */}
                  <Route path="*" element={<Navigate to="/beranda" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;