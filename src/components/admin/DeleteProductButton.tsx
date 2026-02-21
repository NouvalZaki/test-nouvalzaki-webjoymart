// src/components/admin/DeleteProductButton.tsx
'use client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import React from 'react';

export default function DeleteProductButton({ productId }: { productId: number }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm(`Anda yakin ingin menghapus Produk ID ${productId}? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        const token = Cookies.get('authToken');
        
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                alert('Gagal menghapus produk: ' + response.statusText);
                return;
            }

            router.refresh(); 
        } catch (error) {
            console.error('Error menghapus produk:', error);
            alert('Terjadi kesalahan jaringan saat menghapus.');
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900 ml-4">
            <Trash2 className="w-5 h-5 inline-block" /> Hapus
        </button>
    );
}