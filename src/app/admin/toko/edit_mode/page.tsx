import AdminHeader from '@/components/admin/AdminHeader';
import AdminProtected from '@/components/admin/AdminProtected';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import ProductListAdmin from '@/components/admin/ProductListAdmin'; // Panggil komponen baru kita
import { Product } from '@/types/product';

async function getAllProducts(): Promise<Product[]> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?page=1&limit=100`, { 
        cache: 'no-store',
    });
    
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
} 

export default async function AdminProductListPage() {
    const initialProducts = await getAllProducts();

    return (
        <AdminProtected>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300">
                <AdminHeader />
                
                <div className="max-w-7xl mx-auto p-8 pt-12">
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                                Kelola <span className="text-orange-600">Produk</span>
                            </h1>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                                Mode Edit & Manajemen Stok Joymart
                            </p>
                        </div>
                        
                        <Link href="/admin/toko/create" className="px-6 py-3 bg-green-600 text-white rounded-2xl font-black flex items-center hover:bg-green-700 transition shadow-lg shadow-green-600/20 uppercase text-xs tracking-widest">
                            <PlusCircle className="w-5 h-5 mr-2" /> Tambah Baru
                        </Link>
                    </div>

                    <ProductListAdmin initialProducts={initialProducts} />

                </div>
            </div>
        </AdminProtected>
    );
}