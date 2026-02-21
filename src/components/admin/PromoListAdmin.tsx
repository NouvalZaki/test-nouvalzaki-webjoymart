// src/components/admin/PromoListAdmin.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Search, X } from 'lucide-react';
import DeletePromoButton from '@/components/admin/DeletePromoButton';

export default function PromoListAdmin({ initialPromos }: { initialPromos: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter promo berdasarkan judul atau deskripsi secara lokal (cepat)
    const filteredPromos = initialPromos.filter(promo => 
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (promo.description && promo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            {/* SEARCH BAR */}
            <div className="relative max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-red-600 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Cari promo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 outline-none shadow-sm transition-all"
                />
                {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                )}
            </div>

            {/* TABEL */}
            <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Banner</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Judul</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Periode</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredPromos.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">Promo tidak ditemukan...</td>
                                </tr>
                            ) : (
                                filteredPromos.map((promo) => {
                                    const today = new Date();
                                    const promoEnd = new Date(promo.endDate);
                                    promoEnd.setHours(23, 59, 59, 999); // Set ke detik terakhir di hari tersebut
                                                                    
                                    const isExpired = today > promoEnd;
                                    const imageUrl = promo.imageUrl || "/product/default.jpg";
                                    return (
                                        <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="relative w-24 h-12 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                                    <Image src={imageUrl} alt={promo.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">{promo.title}</div>
                                                <div className="text-[9px] text-gray-400 line-clamp-1">{promo.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                                                {new Date(promo.endDate).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${
                                                    isExpired 
                                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                                                    : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                                }`}>
                                                    {isExpired ? 'Kedaluwarsa' : 'Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/admin/promo/edit_mode/${promo.id}`} className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                                                        <Edit size={18} />
                                                    </Link>
                                                    <DeletePromoButton promoId={promo.id}/>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}