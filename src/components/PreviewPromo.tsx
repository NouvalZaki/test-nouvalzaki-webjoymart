// src/components/PromoPreviewSection.tsx
import { Promo } from '@/types/promo';
import PromoCard from './PromoCard'; // Pakai PromoCard saja, bukan PromoList
import Link from 'next/link'; 

export default function PreviewPromo({ promos }: { promos: Promo[] }) {
    if (!promos || promos.length === 0) {
        return null; 
    }
    
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-red-900 text-center mb-10">
                    🔥 Promo Unggulan Terbaru
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {promos.map((promo) => (
                        <PromoCard key={promo.id} promo={promo} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link 
                        href="/promo" 
                        className="text-lg font-semibold text-red-600 hover:text-red-700 transition duration-150"
                    >
                        Lihat Semua Promo →
                    </Link>
                </div>
            </div>
        </section>
    );
}