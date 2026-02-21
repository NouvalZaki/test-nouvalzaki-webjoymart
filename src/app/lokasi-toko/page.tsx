// src/app/lokasi-toko/page.tsx
import Header from '@/components/Header';
import { MapPin, ExternalLink } from 'lucide-react';
import MapWrapper from '@/components/MapWrapper';
import Footer from '@/components/Footer';

export default function LokasiPage() {
    
  const storeLocations = [
        { 
            name: 'Joymart Pelita (Pusat)', 
            address: 'Jl. Pelita No.53, Sungai Pinang Dalam, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur', 
            lat: -0.4832394521933812, 
            lng: 117.16362962533015,
            googleMapsUrl: 'https://maps.app.goo.gl/iViuJQDHZv1PygXM6'
        }, 
        { 
            name: 'Joymart Bung Tomo', 
            address: 'Jl. Bung Tomo Kel No.72, Sungai Keledang, Kec. Samarinda Seberang, Kota Samarinda, Kalimantan Timur', 
            lat: -0.5132432833631788, 
            lng: 117.13224661255265,
            googleMapsUrl: 'https://maps.app.goo.gl/SgwTjrZpZ4yd9qvb9' 
        }, 
    ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header variant="solid" />
      
      <div className="max-w-7xl mx-auto p-8 pt-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-orange-700 dark:text-orange-500 mb-4 text-center">
                Lokasi Toko Kami
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto text-center">
                Temukan gerai Joymart terdekat. Kami siap melayani kebutuhan harian Anda dengan kualitas terbaik.
            </p>
        </div>
        
        <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
            <MapWrapper locations={storeLocations} /> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {storeLocations.map((store, index) => (
                <div 
                    key={index} 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-red-50 dark:border-gray-800 flex items-start space-x-5 transition-all hover:shadow-lg hover:border-red-200 dark:hover:border-red-900/30"
                >
                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                        <MapPin className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                    </div>
                    
                    <div className="flex-grow">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {store.name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                            {store.address}
                        </p>
                        <a 
                            href={store.googleMapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Petunjuk Arah (Google Maps)
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>
      
      <Footer/>
    </div>
  );
}