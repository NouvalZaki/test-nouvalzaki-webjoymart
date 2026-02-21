// src/app/page.tsx
import React from 'react';
import Header from '../components/Header'; 
import AboutSection from '@/components/AboutSection';
import OurPlatformSection from '@/components/OurPlatformSection';
import {Promo} from '@/types/promo';
import PromoPreviewSection from '@/components/PreviewPromo'; 
import PreviewPromo from '@/components/PreviewPromo';
import Footer from '@/components/Footer';
import { Handshake } from 'lucide-react';

async function getFeaturedPromos(): Promise<{ data: Promo[]; total: number }> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    
  const res = await fetch(`${baseURL}/api/promo?limit=3&active=true`, { 
    next: { revalidate: 500 },
  });
  
  if (!res.ok) {
    console.error('Gagal mengambil data promo');
    return { data: [], total: 0 }; 
  }

  return res.json(); 
}

export default async function HomePage() {
  const response = await getFeaturedPromos();
  const rawPromos = response?.data || [];
  const featuredPromos = rawPromos.slice(0, 3);
  
  console.log("PROMO UNTUK HOME:", featuredPromos.length);
  return (
    <div className="relative min-h-screen">
      <Header
       variant="transparent"
       /> 
      <main className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div> 
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/joymart_pelita.webp')" }} 
        ></div>
        <div className="relative z-20 max-w-4xl text-center px-4">
        <h1 className="text-6xl md:text-5xl font-extrabold mb-4 leading-tight">
        Joymart: Your Shopping Partner <br className="hidden md:block" /> 
        </h1>
        <p className="text-xl mb-8 font-light max-w-2xl mx-auto">
        Joymart, perusahaan retail terpercaya, menjamin setiap produk memiliki kualitas terbaik. Belanja tanpa ragu, penuhi kebutuhan harian dengan jaminan mutu.
        </p>
        <a 
        href="/tentang-kami" 
        className="px-8 py-4 bg-orange-400 text-white font-bold text-lg rounded-lg shadow-xl hover:bg-orange-600 transition duration-300 transform hover:scale-105"
        >
        Tentang Kami
    </a>
</div>
      </main>
      <AboutSection/>
      <OurPlatformSection/>
      <div style={{ backgroundColor: '#ffffff' }}>  
  <div className="pt-16"> 
    <section className="py-16 bg-red-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-white/20 shadow-2xl">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-400 rounded-full mb-4">
              <Handshake className="text-white w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Punya Produk Berkualitas?</h2>
            <p className="text-lg text-red-100 max-w-xl">
              Jadilah mitra supplier Joymart! Kami terbuka untuk kolaborasi produk-produk unggulan untuk dipasarkan di seluruh gerai kami.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="https://wa.me/6282215161766?text=Halo%20Joymart%2C%20saya%20tertarik%20menawarkan%20produk%20(Menjadi%20Supplier)" 
              target="_blank"
              className="px-8 py-4 bg-white text-red-900 font-bold text-lg rounded-xl hover:bg-orange-400 hover:text-white transition duration-300 flex items-center gap-2"
            >
              Hubungi Buyer Kami
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
      
  <PreviewPromo promos={featuredPromos}/>
  <Footer/>      
    </div>
  );
}