"use client";

import { useState, useEffect, useRef } from 'react';
import PromoCard from '@/components/PromoCard'; 
import { Promo } from "@/types/promo"; 

interface PromoListProps {
  initialData?: Promo[];
  initialHasMore?: boolean;
}

export default function PromoList({ 
  initialData = [], 
  initialHasMore = false 
}: PromoListProps) { 
  
  const [promos, setPromos] = useState<Promo[]>(initialData ?? []);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/promo?page=${nextPage}`); 
      const json = await res.json();
      
      if (json.data && Array.isArray(json.data)) {
        setPromos((prev) => [...prev, ...json.data]);
        setHasMore(json.hasMore);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Gagal auto-load promo:", err);
    } finally {
      setLoading(true); 
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 } 
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  if (!promos || promos.length === 0) {
    return (
      <div className="text-center p-20 bg-foreground/5 rounded-[2.5rem] border border-dashed border-foreground/10">
        <p className="text-gray-500 italic font-medium">Belum ada promo aktif saat ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
        {promos.map((promo) => ( 
          <PromoCard key={promo.id} promo={promo} /> 
        ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-600 animate-pulse">
              Memuat Promo Lainnya...
            </p>
          </div>
        </div>
      )}

      {!hasMore && promos.length > 0 && (
        <p className="text-center text-gray-400 text-sm italic py-10">
          — Semua promo sudah ditampilkan —
        </p>
      )}
    </div>
  );
}