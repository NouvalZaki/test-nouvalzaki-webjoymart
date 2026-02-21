// src/app/karir/page.tsx
import Header from '@/components/Header';
import FormPelamar from '@/components/FormPelamar';
import Footer from '@/components/Footer';
import { UserPlus } from 'lucide-react';

export default function KarirPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header variant="solid" />
      
      <div className="max-w-4xl mx-auto p-8 pt-16 text-center">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full"></div>
          <UserPlus className="relative w-16 h-16 text-orange-500 mx-auto" />
        </div>

        <h1 className="text-5xl font-black text-foreground mb-4 italic uppercase tracking-tighter">
          Karir di <span className="text-orange-600">Joymart</span>
        </h1>
        
        <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.3em] mb-12">
           Samarinda Supermarket Recruitment
        </p>

        <div className="bg-foreground/5 border border-foreground/10 rounded-3xl p-6 mb-12 text-left">
           <p className="text-sm text-foreground/80 leading-relaxed italic">
             "Kami mencari talenta berbakat yang bersemangat. 
             Pastikan data yang Anda masukkan sudah benar dan file CV dalam format PDF."
           </p>
        </div>

        <FormPelamar />
      </div>

      <Footer />
    </div>
  );
}