import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoFooter from '../assets/logofooter.png';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-14 pb-12">
      <div className="w-full px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-10 lg:gap-x-4 items-start">
          <div className="lg:col-span-1">
            <Link to="/">
              <img 
                src={logoFooter} 
                alt="ArtConnect Logo" 
                className="h-8 w-auto object-contain" 
              />
            </Link>
          </div>

          <div className="lg:pl-0"> 
            <h4 className="font-bold text-gray-900 text-base mb-4 whitespace-nowrap">
              Temukan & Bagikan Karyamu
            </h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/galeri" className="hover:text-[#E3FB52] transition-colors">Jelajahi Karya Visual</Link></li>
              <li><Link to="/tiket" className="hover:text-[#E3FB52] transition-colors">Beli Tiket Acara</Link></li>
              <li><Link to="/komunitas" className="hover:text-[#E3FB52] transition-colors">Bergabung dengan Komunitas</Link></li>
            </ul>
          </div>

          <div className="lg:pl-8">
            <h4 className="font-bold text-gray-900 text-base mb-4">Jelajahi</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/kategori/ilustrasi" className="hover:text-blue-600 transition-colors">Ilustrasi</Link></li>
              <li><Link to="/kategori/fotografi" className="hover:text-blue-600 transition-colors">Fotografi</Link></li>
              <li><Link to="/kategori/karya-3d" className="hover:text-blue-600 transition-colors">Karya 3D</Link></li>
              <li><Link to="/kategori/ui-ux" className="hover:text-blue-600 transition-colors">UI/UX</Link></li>
              <li><Link to="/kategori/desain-produk" className="hover:text-blue-600 transition-colors">Desain Produk</Link></li>
              <li><Link to="/kategori/fantasi" className="hover:text-blue-600 transition-colors">Fantasi</Link></li>
              <li><Link to="/kategori/animasi" className="hover:text-blue-600 transition-colors">Animasi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-base mb-4 whitespace-nowrap">Tiket & Acara</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li><Link to="/tiket" className="hover:text-blue-600 transition-colors">Beli Tiket</Link></li>
              <li><Link to="/pameran" className="hover:text-blue-600 transition-colors">Pameran Seni</Link></li>
              <li><Link to="/workshop" className="hover:text-blue-600 transition-colors">Workshop Desain</Link></li>
              <li><Link to="/jadwal" className="hover:text-blue-600 transition-colors">Jadwal Acara</Link></li>
              <li><Link to="/promo" className="hover:text-blue-600 transition-colors">Promo & Paket Tiket</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-base mb-4">Media Sosial</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                  <Instagram size={18} /> Instagram
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-black transition-colors">
                  <Twitter size={18} /> X
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                  <Facebook size={18} /> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;