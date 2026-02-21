// src/app/hubungi-kami/page.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function HubungiKamiPage() {
  return (
    <div className="min-h-screen">
      <Header variant="solid" />
      <div className="max-w-6xl mx-auto p-8 pt-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Hubungi Kami</h1>
        <p className="text-lg text-gray-600 mb-10">
          Kami senang mendengar dari Anda. Silakan hubungi kami melalui formulir atau kontak di bawah ini.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="space-y-8 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-700">Informasi Kontak</h2>
            
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Email Layanan Pelanggan</p>
                <p className="text-gray-600">cs@joymart.id</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Telepon (Kantor Pusat)</p>
                <p className="text-gray-600">+6285102329874</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Alamat Kantor</p>
                <p className="text-gray-600">Jl. Pelita No.53, Sungai Pinang Dalam, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 shadow-xl rounded-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Kirim Pesan kepada Kami</h2>
            <form className="space-y-4">
                <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
                    required 
                />
                <textarea 
                    rows={4} 
                    placeholder="Pesan Anda..." 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
                    required
                ></textarea>
                <button 
                    type="submit" 
                    className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                    Kirim Pesan
                </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}