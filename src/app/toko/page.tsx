// src/app/toko/page.tsx
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import { Product } from '@/types/product';
import Footer from '@/components/Footer';

async function getProducts(): Promise<{ data: Product[], hasMore: boolean }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?page=1`, {
    cache: 'no-store', 
  });

  if (!res.ok) throw new Error('Gagal mengambil data produk.');
  return res.json();
}

export default async function TokoPage() {
  let productData = { data: [] as Product[], hasMore: false };
  let error: string | null = null;

  try {
    productData = await getProducts();
  } catch (err) {
    console.error(err);
    error = 'Gagal memuat data produk.';
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white transition-colors duration-300">
      <Header variant="solid" /> 
      
      <div className="max-w-7xl mx-auto p-8 pt-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-orange-600 mb-2 uppercase tracking-tighter">
            Katalog <span className="text-gray-900 dark:text-white">Produk</span> 🛒
          </h1>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Kebutuhan harian Samarinda terlengkap
          </p>
        </div>

        {error ? (
          <div className="text-center p-20 bg-red-500/10 rounded-[2.5rem] text-red-500 border border-red-500/20 font-bold">
            {error}
          </div>
        ) : productData.data.length === 0 ? (
          <div className="text-center p-20 bg-gray-500/5 rounded-[2.5rem] border border-gray-500/10 border-dashed">
            <p className="text-xl text-gray-400 italic font-medium">Produk sedang dalam perjalanan!</p>
          </div>
        ) : (
          <ProductList 
            initialProducts={productData.data} 
            initialHasMore={productData.hasMore} 
          />
        )}
      </div>
      <Footer />
    </div>
  );
}