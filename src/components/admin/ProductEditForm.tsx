// src/components/admin/ProductEditForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Cookies from 'js-cookie';

interface ProductEditFormProps {
    productId: string;
}

export default function ProductEditForm({ productId }: ProductEditFormProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const router = useRouter();
    useEffect(() => {
        async function fetchProduct() {
            const token = Cookies.get('authToken')
 try {
 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/products/${productId}`, {
 headers:{
 'Authorization': `Bearer ${token}` 
 }
 });   
                if (!response.ok) {
                    throw new Error('Gagal mengambil data produk');
                }
                const data = await response.json();
                setProduct(data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }   
        }
        fetchProduct();
    }, [productId]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (product) {
            const { name, value } = e.target;
            setProduct({ ...product, [name]: value });
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;
        const token = Cookies.get('authToken');
        try {
            const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 
                    'Content-Type': 'application/json', 
                    // KOREKSI: Gunakan backticks (`)
                    'Authorization': `Bearer ${token}` 
                },
 body: JSON.stringify(product),
 });
            if (!response.ok) {
                throw new Error('Gagal memperbarui produk');
            }
            router.push('/admin/toko/edit_mode');
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return <div>Memuat data produk...</div>;
    }
    if (!product) {
        return <div>Produk tidak ditemukan.</div>;
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>       
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                    id="description"
                    name="description"
                    value={product.description ?? ''}
                    onChange={handleInputChange}
                    required

                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>  
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stok</label>
                <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button
                type="submit"
                className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition duration-150"
            >
                Simpan Perubahan
            </button>
        </form>
    );
}

