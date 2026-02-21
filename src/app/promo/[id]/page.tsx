// src/app/promo/[id]/page.tsx
import Header from '@/components/Header';
import { Truck } from 'lucide-react';
import PromoList from '@/components/PromoList'; 
import Image from 'next/image';
import Footer from '@/components/Footer';
import PromoContentTemplate from '@/components/PromoContentTemplate';


interface Promo {
    id: number;
    title: string;
    description: string | null;
    startDate: string; 
    endDate: string; 
    imageUrl: string | null;
}


async function getPromoById(id: string): Promise<Promo | null> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/promo/${id}`, {
        cache: 'no-store', 
    });
    if (res.status === 404) {
        return null;
    }
    if (!res.ok) {
        console.error("API Fetch Error:", res.status);
        throw new Error('Gagal mengambil data promo.');
    }
    return res.json();
} 


interface DetailPromoPageProps {
    params: Promise<{ id: string }>;
}

export default async function DetailPromoPage({ params }: DetailPromoPageProps) {
    const resolvedParams = await params;
    const promo = await getPromoById(resolvedParams.id);
    const isExpired = promo ? new Date(promo.endDate) < new Date() : false;
    
    const imageUrl = promo?.imageUrl || '/potrait/default.jpg'; 

    if (!promo || !promo.description) { 
        return (
            <div className="min-h-screen flex flex-col"> 
                <Header variant="solid" /> 
                <main className="flex-grow container mx-auto px-4 py-16">
                    <div className="text-center bg-gray-50 p-10 rounded-lg">
                        <h1 className="text-3xl font-bold mb-4">Promo Tidak Ditemukan</h1>
                        <p>Maaf, promo yang Anda cari tidak tersedia atau datanya tidak lengkap.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    } 

    return (
        <div className="min-h-screen flex flex-col">
            <Header variant="solid" />
            
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl"> 
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 mx-auto"> 
                    
                    <div className="flex justify-center items-center p-4"> 
                        
                        <div className="relative w-95 h-120" style={{ maxWidth: '95%' }}> 
                            <Image
                                src={imageUrl} 
                                alt={promo.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {isExpired && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <span className="bg-red-600 text-white font-bold px-4 py-2 text-sm rounded-full transform rotate-[-20deg]">PROMO BERAKHIR</span>
        </div>
    )}
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <h1 className="text-3xl font-extrabold text-red-700 text-center mb-8 hidden">{promo.title}</h1> 
                        <PromoContentTemplate
                            title={promo.title}
                            itemList={promo.description} 
                        />
                        
                        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide">
                                Periode Promo: {new Date(promo.startDate).toLocaleDateString('id-ID')} - {new Date(promo.endDate).toLocaleDateString('id-ID')}
                            </p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}