// src/app/tentang-kami/page.tsx
import Header from '@/components/Header';
import JoymartStorySection from '@/components/JoymartStory';
import { ShoppingBag, TargetIcon, Users } from 'lucide-react'; 
import Footer from '@/components/Footer';

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen">
 <Header variant="solid" /> 
 <section 
 className="relative py-20 bg-cover bg-center" 
 style={{ backgroundImage: "url('joy3.webp')" }} 
 >
        <div className="absolute inset-0 bg-orange-900/60 z-0"></div> 
        
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Tambahkan z-10 agar konten di atas overlay */}
 <p className="text-sm font-semibold uppercase text-white mb-2 font-extrabold">Perjalanan Kami</p>
 <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4"> 
    Mengenal Joymart Lebih Dekat
 </h1>
 <p className="text-xl text-white max-w-3xl"> 
 Sejak 2015, kami berkomitmen menjadi jaringan ritel terlengkap yang menyediakan produk lokal maupun import berkualitas terbaik dengan pelayanan yang cepat dan andal.
 </p>
 </div>
 </section>
     <JoymartStorySection />
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="p-6 border-l-6 border-orange-500 shadow-md rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                        <ShoppingBag className="w-6 h-6 mr-2 text-orange-500" /> Visi Kami
                    </h3>
                    <p className="text-gray-600">
                        Menjadi Perusahaan Ritel Terbaik, Terpercaya dan Bermanfaat
                    </p>
                </div>
                <div className="p-6 border-l-6 border-red-500 shadow-md rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-red-500" /> Misi Kami
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Memberikan pengalaman berbelanja yang menyenangkan.</li>
                        <li>Menjual produk dengan kualitas dan harga terbaik.</li>
                        <li>Mengembangkan sumber daya manusia yang profesional dan berintegritas.</li>
                    </ul>
                </div>
                <div className="p-6 border-l-6 border-red-800 shadow-md rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <TargetIcon className="w-6 h-6 mr-2 text-red-500" /> Nilai Utama
                    </h3>
                    <p className="text-gray-600">
                        Integritas, Pelayanan Prima, Kualitas, dan Inovasi yang berkelanjutan.
                    </p>
                </div>

            </div>
        </div>
      </section>
      <Footer />
     </div>
  );
}