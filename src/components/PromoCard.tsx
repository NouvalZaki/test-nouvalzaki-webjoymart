// src/components/PromoCard.tsx
'use client'; 

import Image from 'next/image';
import {Promo} from '@/types/promo';
import Link from 'next/link';

export default function PromoCard({ promo }: { promo: Promo }) {
 const formatDate = (dateString: string) => {
 return new Date(dateString).toLocaleDateString('id-ID', {
 day: 'numeric',
 month: 'long',
 year: 'numeric',
 });
 };
 
 const imagePath = promo.imageUrl || '/potrait/default.jpg'; 

 const ASPECT_WIDTH = 155; 
 const ASPECT_HEIGHT = 260; 
 const paddingBottom = (ASPECT_HEIGHT / ASPECT_WIDTH) * 75; 
 const today = new Date();
 today.setHours(0, 0, 0, 0);

 const endDate = new Date(promo.endDate);
 endDate.setHours(0, 0, 0, 0);
 
 const isExpired = endDate < today;

    const cardClasses = `block rounded-xl shadow-xl overflow-hidden transition duration-300 ${
        isExpired 
            ? 'opacity-70 border border-red-300 cursor-default' 
            : 'border-red-100 transform hover:scale-[1.02]' 
    }`;

 return (
    <Link
            href={`/promo/${promo.id}`} 
            passHref 
            className={cardClasses} 
        >
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 border border-red-100">

        <div 
            className="relative w-full" 
            style={{ paddingBottom: `${paddingBottom}%`, height: '0' }} 
            >
            <Image
             src={imagePath}
            alt={promo.title}
             fill
             style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
 className="transition-opacity duration-500"
 onError={(e) => {
 e.currentTarget.src = '/potrait/default.jpg'; 
 e.currentTarget.srcset = '/potrait/default.jpg';
 }}
 />
{isExpired && (
<div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
<span className="bg-red-600 text-white font-bold px-4 py-2 text-sm rounded-full transform rotate-[-20deg]">PROMO BERAKHIR</span>
</div>
)}
 </div>

 <div className="p-5">
 <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{promo.title}</h3>
 <div className="mt-4 border-t border-red-200 pt-3">
 <p className="text-xs font-semibold text-red-600">
 🗓️ Berlaku hingga: {formatDate(promo.endDate)}
</p>
 </div>
 </div>
 </div>
 </Link>
 );
}