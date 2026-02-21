// src/app/admin/promo/edit_mode/page.tsx
import AdminHeader from '@/components/admin/AdminHeader';
import AdminProtected from '@/components/admin/AdminProtected';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import PromoListAdmin from '@/components/admin/PromoListAdmin'; 
import { Promo } from '@/types/promo'; 

async function getAllPromos() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/promo?filter=all`, { 
        cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || (Array.isArray(json) ? json : []);
} 

export default async function AdminPromoListPage() {
    const initialPromos = await getAllPromos();

    return (
        <AdminProtected>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300">
                <AdminHeader  />
                
                <div className="max-w-7xl mx-auto p-8 pt-12">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-4xl font-black text-red-600 uppercase tracking-tighter italic">
                                Kelola <span className="text-gray-900 dark:text-white">Promo</span>
                            </h1>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mt-1">Joymart Manajemen Promo</p>
                        </div>
                        <Link href="/admin/promo/create" className="px-6 py-3 bg-green-600 text-white rounded-2xl font-black flex items-center hover:bg-green-700 transition shadow-lg shadow-green-600/20 uppercase text-xs tracking-widest">
                            <PlusCircle className="w-5 h-5 mr-2" /> Tambah Baru
                        </Link>
                    </div>

                    <PromoListAdmin initialPromos={initialPromos} />
                </div>
            </div>
        </AdminProtected>
    );
}