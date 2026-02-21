// src/app/admin/promo/edit_mode/[id]/page.tsx
import AdminHeader from '@/components/admin/AdminHeader';
import PromoEditForm from '@/components/admin/PromoEditForm';
import AdminProtected from '@/components/admin/AdminProtected';
import React from 'react';

export default function AdminPromoEditPage({ params }: { params: { id: string } }) {
    const promoId = params.id;

    if (!promoId) {
        return <div className="text-center p-10 text-red-500">ID Promo tidak ditemukan.</div>;
    }
        
    return (
        <AdminProtected>
            <AdminHeader  />
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Edit Promo
                </h1>
                <PromoEditForm promoId={promoId} />
            </div>
        </AdminProtected>
    );
}