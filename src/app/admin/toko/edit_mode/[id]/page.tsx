// src/app/admin/toko/edit_mode/[id]/page.tsx

import AdminHeader from '@/components/admin/AdminHeader';
import Header from '@/components/Header';
import ProductEditForm from '@/components/admin/ProductEditForm';
import AdminProtected from '@/components/admin/AdminProtected';

interface AdminProductEditPageProps {
    params: {
        id: string; 
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function AdminProductEditPage( {
params, 
 searchParams, 
}: AdminProductEditPageProps) {
 const productId = params.id; 
    
   
 return (
 <AdminProtected>
 <div>
 <AdminHeader/>
 <div className="max-w-4xl mx-auto p-8">
 <h1 className="text-3xl font-bold mb-6 text-gray-800">
 Edit Produk #{productId} 
</h1>
<ProductEditForm productId={productId}/> 
 </div>
 </div>
 </AdminProtected>
 );
}