'use client'; 

import Image from 'next/image';
import { Product } from '@/types/product';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  if (!product) return null;

  const imagePath = product.imageUrl || '/product/default.jpg'; 
  const ASPECT_WIDTH = 275; 
  const ASPECT_HEIGHT = 400; 
  const paddingBottom = (ASPECT_HEIGHT / ASPECT_WIDTH) * 100; 

  return (
    <a 
    href={`/toko/${product.id}`}
    className="group relative z-[10] block pointer-events-auto cursor-pointer bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] border border-gray-100 dark:border-gray-800"
  >
      <div 
        className="relative w-full bg-gray-50 dark:bg-gray-800" 
        style={{ paddingBottom: `${paddingBottom}%`, height: '0' }} 
      >
        <Image
          src={imagePath}
          alt={product.name}
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, 25vw" 
          className="transition-opacity duration-500"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 truncate group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xl font-black text-red-600 dark:text-red-400">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
      </div>
    </a>
  );
}