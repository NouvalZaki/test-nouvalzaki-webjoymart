// src/app/admin/toko/create/page.tsx
import AdminHeader from '@/components/admin/AdminHeader';
import Header from '@/components/Header';
import ProductForm from '@/components/admin/ProductForm';
import AdminProtected from '@/components/admin/AdminProtected';

export default function AdminProductCreatePage() {
  return (
    <AdminProtected>
    <div>
      
      <AdminHeader />
      
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Tambah Produk Baru
        </h1>
        <ProductForm />
      </div>
    </div>
</AdminProtected>
  );
}