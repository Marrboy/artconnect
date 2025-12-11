import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Wallet, Grid, Image as ImageIcon, Edit, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const TambahAcara = () => {
  const navigate = useNavigate();
  const [bannerPreview, setBannerPreview] = useState(null);
  
  // State Tanggal
  const [dateValue, setDateValue] = useState('');     
  const [displayDate, setDisplayDate] = useState(''); 

  const [formData, setFormData] = useState({
    kategori: '',
    judulAcara: '',
    waktu: '',
    harga: '',
    lokasi: '',
    deskripsi: '',
    gambar: null // Nanti kita simpan URL-nya
  });

  // Helper: Format Tanggal
  const formatDateIndo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const handleDateChange = (e) => {
    const rawDate = e.target.value;
    setDateValue(rawDate);
    setDisplayDate(formatDateIndo(rawDate));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper: Convert Gambar ke Base64 (Supaya bisa disimpan di LocalStorage)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, gambar: reader.result }); // Simpan string base64
        setBannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LOGIKA PENYIMPANAN DATA ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Siapkan Objek Data Baru (Sesuaikan nama field dengan Tabel Admin)
    const newEvent = {
      id: Date.now(), // ID Unik
      kategori: formData.kategori || 'Pameran',
      judul: formData.judulAcara,
      tanggal: dateValue, // Format YYYY-MM-DD
      alamat: formData.lokasi,
      harga: formData.harga,
      waktu: formData.waktu,
      deskripsi: formData.deskripsi,
      gambar: formData.gambar
    };

    // 2. Ambil data lama dari LocalStorage
    const existingEvents = JSON.parse(localStorage.getItem('admin_events')) || [];

    // 3. Gabungkan data lama + data baru
    const updatedEvents = [newEvent, ...existingEvents];

    // 4. Simpan kembali ke LocalStorage
    localStorage.setItem('admin_events', JSON.stringify(updatedEvents));

    alert('Acara berhasil diunggah dan masuk ke Admin!');
    
    // Redirect ke Admin Acara untuk melihat hasil (atau ke beranda)
    navigate('/admin/acara'); 
  };

  const inputClass = "w-full h-14 px-4 pr-12 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] transition bg-white text-base";
  const iconClass = "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none";

  return (
    <div className="min-h-screen bg-white font-sans py-8 px-4 lg:px-8">

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Kategori */}
          <div className="relative">
            <select name="kategori" onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
              <option disabled selected>Kategori</option>
              <option>Pameran</option>
              <option>Workshop</option>
              <option>Seminar</option>
              <option>Pertunjukan</option>
            </select>
            <Grid size={20} className={iconClass} />
          </div>

          {/* Judul */}
          <input type="text" name="judulAcara" onChange={handleChange} placeholder="Judul Kegiatan..." className={inputClass} required />

          {/* Deskripsi */}
          <textarea name="deskripsi" onChange={handleChange} placeholder="Deskripsi Kegiatan..." rows={5} className="w-full p-4 rounded-xl border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F75FF] resize-none transition text-base"></textarea>

          {/* Grid Tanggal & Waktu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input type="text" placeholder="Hari/Tanggal" value={displayDate} 
                onFocus={(e) => { e.target.type = 'date'; e.target.value = dateValue; }}
                onBlur={(e) => { e.target.type = 'text'; e.target.value = displayDate; }}
                onChange={handleDateChange}
                className={`${inputClass} appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full`}
              />
              <Calendar size={20} className={iconClass} />
            </div>
            <div className="relative">
              <input type="text" name="waktu" onChange={handleChange} placeholder="Waktu" 
                onFocus={(e) => e.target.type = 'time'}
                onBlur={(e) => e.target.type = 'text'}
                className={`${inputClass} [&::-webkit-calendar-picker-indicator]:opacity-0`}
              />
              <Clock size={20} className={iconClass} />
            </div>
          </div>

          {/* Harga */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
            <input type="number" name="harga" onChange={handleChange} placeholder="Harga Tiket Masuk (HTM)" className={`${inputClass} pl-12`} />
            <Wallet size={20} className={iconClass} />
          </div>

          {/* Alamat */}
          <div className="relative">
            <input type="text" name="lokasi" onChange={handleChange} placeholder="Alamat" className={inputClass} required />
            <MapPin size={20} className={iconClass} />
          </div>

          {/* Upload Poster */}
          <div className="border border-gray-300 rounded-xl p-6 bg-white">
            <h3 className="text-center text-gray-700 font-medium mb-4">Unggah Poster Kegiatan</h3>
            <label className="flex flex-col items-center justify-center cursor-pointer group w-full min-h-[200px] border-2 border-dashed border-gray-200 rounded-xl hover:bg-gray-50 transition relative overflow-hidden">
              {bannerPreview ? (
                <>
                  <img src={bannerPreview} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <button type="button" className="bg-[#E3FB52] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Edit size={16} /> Ganti</button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-14 h-14 bg-[#4F75FF] rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md"><ImageIcon className="text-white" size={28} /></div>
                  <p className="text-gray-500 text-sm">Seret gambar atau <span className="text-[#4F75FF] font-bold">cari file</span></p>
                  <p className="text-gray-400 text-xs mt-1">Max 10 MB</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-4 pt-4 pb-10">
            <button type="button" onClick={() => navigate('/beranda')} className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition">Simpan ke draft</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-[#E3FB52] text-black font-bold hover:bg-[#d9f046] transition shadow-md">Unggah</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TambahAcara;