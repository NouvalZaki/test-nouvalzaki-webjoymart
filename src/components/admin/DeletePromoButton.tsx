// src/components/admin/DeletePromoButton.tsx
'use client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DeletePromoButton({ promoId }: { promoId: number }) {    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm(`Anda yakin ingin menghapus Promo ID ${promoId}? Tindakan ini tidak dapat dibatalkan.`)) {
            return;
        }

        const token = Cookies.get('authToken');
        
        try {
            const response = await fetch(`/api/promo/${promoId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                alert('Gagal menghapus promo: ' + response.statusText);
                return;
            }

            alert('Berhasil Menghapus Promo')
            router.refresh(); 
        } catch (error) {
            console.error('Error menghapus promo:', error);
            alert('Terjadi kesalahan jaringan saat menghapus.');
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:text-red-900 ml-4">
            <Trash2 className="w-5 h-5 inline-block" /> Hapus
        </button>
    );
}