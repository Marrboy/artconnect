import React, { useState } from 'react';
import { Image, X, Grid, Check } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const Unggah = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    deskripsi: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Helper: Ubah file gambar jadi text base64 agar bisa disimpan di LocalStorage
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Multiple Files Upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      const base64 = await fileToBase64(file);
      
      const newFile = {
        id: Date.now() + Math.random(), // ID unik
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
        url: URL.createObjectURL(file),
        base64: base64,
        status: 'completed'
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
    }
  };

  // Remove Single File
  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(f => f.id !== fileId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploadedFiles.length === 0) {
      alert('Silakan upload minimal 1 gambar!');
      return;
    }

    // 1. Buat Data Karya Baru
    const newArtwork = {
      id: Date.now(),
      title: formData.judul,
      category: formData.kategori,
      description: formData.deskripsi,
      // Simpan semua gambar yang diupload
      images: uploadedFiles.map(f => f.base64),
      mainImage: uploadedFiles[0].base64, // Gambar utama
    };

    // 2. Ambil data lama & Simpan data baru ke LocalStorage
    const existingData = JSON.parse(localStorage.getItem('user_artworks') || '[]');
    const updatedData = [newArtwork, ...existingData];
    localStorage.setItem('user_artworks', JSON.stringify(updatedData));

    // 3. Tampilkan Pop-up Sukses
    setShowSuccessModal(true);

    // 4. Redirect ke Profile setelah 2 detik
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#4F75FF] font-sans flex items-center justify-center py-20 px-4 relative">
      
      {/* Container Utama */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* CARD KIRI: AREA UPLOAD & GALLERY */}
        <div className="flex-1 bg-white rounded-3xl p-10 shadow-lg flex flex-col justify-center min-h-[550px]">
          
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Ingin bagikan karyamu?</h1>
            <p className="text-gray-500 text-base">Unggah desainmu dan tampilkan karya terbaikmu.</p>
          </div>

          {/* Upload Area */}
          <label className="border-2 border-dashed border-gray-300 rounded-2xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative group mb-6">
            <div className="w-14 h-14 bg-[#4F75FF] rounded-xl flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
              <Image className="text-white w-7 h-7" />
            </div>
            <p className="text-gray-600 text-sm text-center px-4 mb-2">
              Seret dan lepas gambar di sini atau <span className="text-[#4F75FF] font-semibold underline">cari file</span>
            </p>
            <div className="text-center text-xs text-gray-400 px-4">
              <p>Maksimal 10 MB per gambar. Bisa upload beberapa gambar sekaligus.</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              multiple
              onChange={handleFileChange} 
            />
          </label>

          {/* Gallery Gambar yang Sudah Diupload */}
          {uploadedFiles.length > 0 && (
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Gambar Terupload ({uploadedFiles.length})
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[280px] overflow-y-auto pr-2">
                {uploadedFiles.map((file) => (
                  <div 
                    key={file.id} 
                    className="relative group aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#4F75FF] transition"
                  >
                    <img 
                      src={file.url} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Info */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-3">
                      <div className="text-white text-xs opacity-0 group-hover:opacity-100 transition truncate">
                        <p className="font-semibold truncate">{file.name}</p>
                        <p className="text-white/80">{file.size}</p>
                      </div>
                    </div>

                    {/* Tombol Hapus */}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition"
                    >
                      <X size={16} />
                    </button>

                    {/* Badge "Main" untuk gambar pertama */}
                    {uploadedFiles[0].id === file.id && (
                      <div className="absolute top-2 left-2 bg-[#4F75FF] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        Utama
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CARD KANAN: FORM INPUT */}
        <div className="w-full lg:w-[388px] bg-white rounded-3xl p-10 shadow-lg flex flex-col gap-5 min-h-[550px]">
          
          {/* Kategori */}
          <div className="relative">
            <select 
              name="kategori" 
              value={formData.kategori} 
              onChange={handleChange} 
              className="w-full h-14 px-4 pr-12 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] appearance-none bg-white" 
              required
            >
              <option value="" disabled hidden>Kategori</option>
              <option value="Ilustrasi">Ilustrasi</option>
              <option value="Fotografi">Fotografi</option>
              <option value="Karya 3D">Karya 3D</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Desain Produk">Desain Produk</option>
              <option value="Fantasi">Fantasi</option>
              <option value="Animasi">Animasi</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
              <Grid size={20} />
            </div>
          </div>

          {/* Judul */}
          <input 
            type="text" 
            name="judul" 
            value={formData.judul} 
            onChange={handleChange} 
            placeholder="Judul karya..." 
            className="w-full h-14 px-4 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F75FF]" 
            required 
          />

          {/* Deskripsi */}
          <textarea 
            name="deskripsi" 
            value={formData.deskripsi} 
            onChange={handleChange} 
            placeholder="Deskripsi karya..." 
            className="w-full flex-1 p-4 rounded-xl border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] resize-none" 
            required 
          />

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => navigate('/beranda')} 
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Simpan ke draft
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-8 py-3 rounded-xl bg-[#E3FB52] text-black font-bold hover:bg-[#d4ec43] transition shadow-md"
            >
              Unggah
            </button>
          </div>
        </div>
      </div>

      {/* POP-UP MODAL BERHASIL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-24 h-24 bg-[#4F75FF] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="text-white w-12 h-12" strokeWidth={4} />
            </div>
            <h2 className="text-[#4F75FF] text-3xl font-bold mb-4 tracking-wide">YEAY, BERHASIL!</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium px-4">
              Kamu baru saja menambah {uploadedFiles.length} karya luar biasa ke dalam koleksimu.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Unggah;