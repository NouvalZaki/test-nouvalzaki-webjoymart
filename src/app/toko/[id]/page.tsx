//src/app/toko/[id]/page.tsx

import Header from '@/components/Header';
import { Truck, Package, Tag, Phone, Store, ShoppingBag } from 'lucide-react';
import PromoList from '@/components/ProductList';
import Image from 'next/image';
import Footer from '@/components/Footer';

import PromoContentTemplate from '@/components/PromoContentTemplate';

interface PlatformCardProps {
    logoPath?: string;
    icon?:React.ReactNode;
    // icon: React.ReactNode;
    // imgLogo:string;
    linkUrl: string;
    bgColor: string;
    title:string;

}


interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    imageUrl: string | null;
    category: string;
}


async function getItemById(id: string): Promise<Product | null> {
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    try {
        const res = await fetch(`${baseUrl}/api/products/${id}`, {
            cache: 'no-store', 
        });

        if (!res.ok) {
            console.error(`Gagal mengambil produk ID ${id}. Status: ${res.status}`);
            return null;
        }
        const data: Product = await res.json();
        return data;
    } catch (error) {
        console.error('Error saat mengambil detail produk:', error);
        return null;
    }
}

interface DetailProductPageProps {
    params: Promise<{ id: string }>; 
}

const PlatformCard = ({ logoPath, icon, linkUrl, bgColor, title }: PlatformCardProps) => {
    return (
        <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            title={title}
            className={`flex items-center justify-center h-16 w-16 md:h-20 md:w-20 rounded-xl transition duration-300 transform hover:scale-105 ${bgColor} shadow-md hover:shadow-xl`}
        >
            {logoPath ? (
                <Image 
                    src={logoPath} 
                    alt={title} 
                    width={80} 
                    height={50} 
                    className="object-contain"
                />
            ) : (
                icon
            )}
        </a>
    );
};

export default async function DetailProductPage({ params }: DetailProductPageProps) {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const product = await getItemById(id);
        
    const imageUrl = product?.imageUrl || '/products/default.jpg';
    
    const priceFormatted = product ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(product.price) : 'N/A';

    if (!product) {
        return (
            <div className='min-h-screen flex flex-col'>
                <Header variant='solid' />
                <main className='flex-grow container mx-auto px-4 py-16 max-w-xl'>
                    <div className='text-center bg-gray-50 dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl'>
                        <h1 className='text-3xl font-black mb-4 uppercase tracking-tighter'>Produk Tidak Ditemukan</h1>
                        <p className='text-gray-400 font-medium'>Maaf, produk ID #{id} tidak tersedia. Silahkan cek katalog lainnya.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col bg-white dark:bg-[#0f0f0f]'>
            <Header variant="solid" />
            
            <main className='flex-grow max-w-7xl mx-auto px-8 py-12'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-gray-800">
                    
                    <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-inner">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className='object-cover'
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    <div className="space-y-8 py-4">
                        <div>
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-2 italic">
                                {product.category}
                            </p>
                            <h1 className='text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic leading-none'>
                                {product.name}
                            </h1>
                        </div>
                        
                        <div className="py-6 border-y border-gray-100 dark:border-gray-800">
                            <h2 className='text-6xl font-black text-orange-600 tracking-tighter italic'>{priceFormatted}</h2>
                        </div>
                        
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 text-gray-400">Deskripsi Produk</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{product.description || 'Tidak ada deskripsi tersedia.'}</p>
                        </div>

                        <div className='flex gap-8 text-[10px] font-black uppercase tracking-widest'>
                            <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                <Package className='w-4 h-4 inline mr-2' /> 
                                {product.stock > 0 ? `Ready Stok: ${product.stock}` : 'Habis'}
                            </p>
                            <p className='text-gray-400'>
                                <Tag className='w-4 h-4 inline mr-2' />
                                {product.category}
                            </p>
                        </div>

                        <div className='pt-8 space-y-6'>
                            <h3 className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-widest italic">Pesan Sekarang:</h3>
                            <div className="flex flex-wrap gap-4">
                                <PlatformCard
                                    title='WhatsApp Joymart'
                                    logoPath='/whatsapplogo3.png' 
                                    linkUrl={`https://wa.me/6285102329874?text=Halo%2C%20saya%20mau%20pesan%20${encodeURIComponent(product.name)}`} 
                                    bgColor="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"
                                />
                                <PlatformCard
                                    title='Tokopedia'
                                    logoPath='/logotokped.png' 
                                    linkUrl={`https://tokopedia.link/GvJ7IyjiZXb`} 
                                    bgColor="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700" 
                                />
                                <PlatformCard
                                    title='Shopee'
                                    logoPath='/logoshopee.png' 
                                    linkUrl={`https://shopee.co.id/joymart_id`} 
                                    bgColor="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}