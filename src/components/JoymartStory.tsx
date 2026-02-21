// src/components/Joymart.tsx
import React from 'react';
import { ShoppingBag, Users, MapPin } from 'lucide-react'; 

const AboutSection = () => {
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
 <p className="text-sm font-semibold uppercase text-gray-500 mb-2">Our Foundation</p>
 <h2 className="text-5xl font-extrabold text-red-800 mb-6">
  Quality and Service Since 2015
 </h2>
 <p className="text-lg text-gray-600 mb-4">
  Joymart didirikan dengan visi untuk menjadi jaringan ritel terdepan. Kami berfokus pada pengalaman berbelanja yang menyenangkan dan penyediaan produk dengan kualitas terbaik.
  </p>
 <p className="text-sm text-gray-500 mb-8">
  Komitmen kami pada pelayanan cepat dan keandalan pasokan telah memposisikan kami sebagai pilihan utama masyarakat. Kami menjamin setiap produk dari kebutuhan harian hingga produk segar memenuhi standar mutu tertinggi.
 </p>
 <p className="font-serif text-3xl italic text-orange-700 mb-10">
  "Beyond just a supermarket, we are your shopping partner."
 </p>
 <div className="flex space-x-12">
  <div className="flex flex-col items-start">
  </div>
 </div>
 </div>
          <div className="lg:w-200 relative h-full w-full mb-10 lg:mb-0">
                  <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-0">        
                      <img 
                        src="/karyawan2.webp" 
                        alt="Supermarket Story - Desktop" 
                        className="object-cover w-full h-full hidden lg:block" 
                         />
                      <img 
                          src="/joykaryawan5.webp" 
                          alt="Supermarket Story - Mobile" 
                          className="object-cover w-full h-full block lg:hidden" 
                      />
                     </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;