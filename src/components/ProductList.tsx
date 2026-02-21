// src/components/ProductList.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/types/product';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar'; 

interface ProductListProps {
  initialProducts: Product[];
  initialHasMore: boolean;
}

export default function ProductList({ initialProducts, initialHasMore }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (pageNum: number, search: string, isNewSearch: boolean) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?page=${pageNum}&q=${encodeURIComponent(search)}`);
      const json = await res.json();
      
      if (json.data) {
        setProducts((prev) => isNewSearch ? json.data : [...prev, ...json.data]);
        setHasMore(json.hasMore);
        setPage(pageNum);
      }
    } catch (err) {
      console.error("Gagal ambil produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== "") {
        fetchProducts(1, searchTerm, true);
      } else {
        setProducts(initialProducts);
        setHasMore(initialHasMore);
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts(page + 1, searchTerm, false);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page, searchTerm]);

  return (
    <div className="space-y-4">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {products.length === 0 && !loading ? (
        <div className="py-20 text-center">
          <p className="text-gray-400 italic">Produk "{searchTerm}" tidak ditemukan...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {(hasMore || loading) && (
        <div ref={loaderRef} className="flex flex-col items-center justify-center py-12 gap-2">
          <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
            {loading ? "Memuat..." : "Scroll untuk lihat lainnya"}
          </p>
        </div>
      )}
    </div>
  );
}