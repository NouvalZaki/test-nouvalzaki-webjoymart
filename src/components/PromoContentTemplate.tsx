// src/components/PromoContentTemplate.tsx
import React from 'react';
import Link from 'next/link';
import { Truck } from 'lucide-react';

interface PromoTemplateProps {
    title: string;
    itemList: string;
}

export default function PromoContentTemplate({ title, itemList }: PromoTemplateProps) {
    const lines = itemList.split('\n').filter(line => line.trim() !== '');

    return (
        <div className="space-y-6 text-center">
            <p className="text-gray-700 font-medium">Halo Sahabat Joymart!</p>
            <p className="text-gray-700">
                Udah siap belanja hemat di Joymart Swalayan? Yuk intip promo turun harga dari <span className="font-bold">{title}</span> yang siap membantu memenuhi kebutuhan harian anda.
            </p>

            <div className="my-6 p-6 bg-red-50 border border-red-200 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-red-700 mb-3">Daftar Produk Promo:</h3>
                <ul className="list-disc list-inside text-left mx-auto max-w-sm space-y-1">
                    {lines.map((item, index) => (
                        <li key={index} className="text-gray-800 font-semibold">{item.trim()}</li>
                    ))}
                </ul>
            </div>
            
            <p className="text-gray-700">
                Cus ajak keluarga, teman dan doi buat belanja di Joymart Swalayan.
            </p>
            
            <div className="pt-4 border-t border-gray-200 mt-6">
                <p className="font-semibold mb-2">Kunjungi juga Joymart Swalayan di:</p>
                <p className="text-sm">
                    <strong className="text-green-600">WhatsApp:</strong> 0851-0232-9874 | 
                    <Link href="https://shopee.co.id/joymart_id" target="_blank" className="text-orange-500 hover:underline ml-2">Shopee</Link> | 
                    <Link href="https://tokopedia.link/R2G8FY9DyXb" target="_blank" className="text-green-500 hover:underline ml-2">Tokopedia</Link>
                </p>
                <p className="mt-4 text-sm text-gray-500 font-serif italic">
                    - Joymart, Your Shopping Partner -
                </p>
            </div>
        </div>
    );
}