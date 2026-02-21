// src/components/admin/ProductListAdmin.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Edit, Package, Search, X, Loader2 } from 'lucide-react';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import { Product } from '@/types/product';

export default function ProductListAdmin({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Fungsi fetch berdasarkan pencarian
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products?page=1&limit=100&q=${encodeURIComponent(searchTerm)}`);
                const json = await res.json();
                setProducts(json.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, initialProducts]);

    return (
        <div className="space-y-6">
            {/* SEARCH BAR ADMIN */}
            <div className="relative max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {loading ? (
                        <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
                    ) : (
                        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    )}
                </div>
                <input
                    type="text"
                    placeholder="Cari nama produk atau kategori..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none shadow-sm transition-all"
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
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Info Produk</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Kategori</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Harga</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Stok</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">
                                        {loading ? "Mencari produk..." : `Produk "${searchTerm}" tidak ditemukan.`}
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
                                                    <Image
                                                        src={product.imageUrl || "/product/default.jpg"}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                        sizes="50px"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">{product.name}</div>
                                                    <div className="text-[9px] text-gray-400 font-bold uppercase italic">ID: #{product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-orange-600">
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-tighter ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                <Package size={14} />
                                                {product.stock}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={`/admin/toko/edit_mode/${product.id}`} className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <DeleteProductButton productId={product.id}/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}