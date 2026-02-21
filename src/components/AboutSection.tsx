// src/components/AboutSection.tsx
import React from 'react';
import { ShoppingBag, Users } from 'lucide-react'; 

const AboutSection = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">        
        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
          <p className="text-sm font-semibold uppercase text-gray-500 mb-2">Sejak 2015</p>
          <h2 className="text-5xl font-extrabold text-red-800 mb-6">
            Joymart
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Sebuah gerai supermarket berdiri. Menjadi jaringan ritel terlengkap di Samarinda. Sejalan dengan Visi Joymart, Menjadi Perusahaan Ritel Terbaik dan Terpercaya.          
            </p>
          <p className="text-sm text-gray-500 mb-8">
            Keterjangkauan, pelayanan yang cepat dan andal, serta fakta bahwa Anda akan selalu dapat menemukan produk yang Anda cari, telah membuat kami menonjol di pasar. Kami tahu bahwa untuk melakukan semua ini, kami harus tetap berhubungan dekat dengan pelanggan kami dan mendengarkan saran serta kritik mereka.
          </p>
          <p className="font-serif text-3xl italic text-orange-700 mb-10">
            "Kepuasan pelanggan adalah prioritas utama kami."
          </p>
          <div className="flex space-x-12">
            <div className="flex flex-col items-center">
              <ShoppingBag className="h-8 w-8 text-orange-400 mb-2" />
              <p className="text-3xl font-bold text-gray-800">1000+</p>
              <p className="text-sm text-gray-500">Jenis Produk</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-orange-400 mb-2" />
              <p className="text-3xl font-bold text-gray-800">+600</p>
              <p className="text-sm text-gray-500">Pelanggan Setia</p>
            </div>
          </div>
        </div>
                 <div className="lg:w-1/2 relative h-96 w-full mb-10 lg:mb-0">
                  <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl">        
                      <img 
                        src="/left.webp" 
                        alt="Supermarket Story - Desktop" 
                        className="object-cover w-full h-full hidden lg:block" 
                         />
                      <img 
                          src="/man_pointing_up.png" 
                          alt="Supermarket Story - Mobile" 
                          className="object-cover w-full h-full block lg:hidden" 
                      />
                     </div>
          <div className="absolute top-[-70px] right-[-60px] h-54 w-54 bg-gray-300/50 rounded-full z-0 transform rotate-75"></div>
          <div className="absolute bottom-[-50px] left-[-50px] h-36 w-36 bg-orange-400/60 rounded-full z-0"></div>
          <div className="absolute top-[20%] right-[10%] h-20 w-20 bg-red-700/70 rounded-full z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;