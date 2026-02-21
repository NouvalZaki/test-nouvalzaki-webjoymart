// src/app/admin/promo/create/page.tsx
import AdminHeader from '@/components/admin/AdminHeader';
import PromoForm from '@/components/admin/PromoForm';
import AdminProtected from '@/components/admin/AdminProtected';

export default function AdminPromoCreatePage() {
  return (
      <AdminProtected>
        
    <div>
      <AdminHeader />
      
      <div className="max-w-4xl mx-auto p-8 pb-20">
        <h1 className="text-4xl font-black text-red-600 uppercase tracking-tighter italic">
          Tambah <span className="text-gray-900 dark:text-white">Promo</span>
        </h1>
        <PromoForm />
      </div>
    </div>
    </AdminProtected>
  );
}