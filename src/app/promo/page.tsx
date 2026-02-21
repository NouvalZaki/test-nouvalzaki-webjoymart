// src/app/promo/page.tsx
import Header from '@/components/Header';
import PromoList from '@/components/PromoList'; 
import { Promo } from '@/types/promo';
import Footer from '@/components/Footer';

async function getPromos() {
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const targetUrl = `${baseUrl}/api/promo?page=1`;
  
  try {
    const res = await fetch(targetUrl, {
      cache: 'no-store', 
    });

    if (!res.ok) {
      console.error("Response API tidak OK");
      return { data: [], hasMore: false };
    }
    
    return res.json();
  } catch (error) {
    console.error("Fetch error di Server Side:", error);
    return { data: [], hasMore: false };
  }
}

export default async function PromoPage() {
  const promoData = await getPromos();

  return (
    <div className="min-h-screen bg-background">
      <Header variant="solid" /> 
      
      <div className="max-w-7xl mx-auto p-8 pt-16">
        <h1 className="text-5xl font-black text-orange-600 mb-12 uppercase tracking-tighter text-center">
          Promo & <span className="text-foreground">Diskon</span> 🎉
        </h1>
        
        <PromoList 
          initialData={promoData?.data || []} 
          initialHasMore={promoData?.hasMore || false} 
        />
      </div>
      <Footer />
    </div>
  );
}