// src/components/MapWrapper.tsx
'use client'; 
import dynamic from 'next/dynamic';
import React from 'react';

// Definisikan interface StoreLocation di sini (atau import dari types)
interface StoreLocation {
    name: string;
    address: string;
    lat: number;
    lng: number;
}

interface MapWrapperProps {
    locations: StoreLocation[];
}

const DynamicStoreMap = dynamic(() => import('./StoreMap')
 .then((mod) => mod.default), 
{
ssr: false,
loading: () => (
 <div className='w-full h-[500px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center relative z-10'> 
 Memuat Peta...
 </div>
 ),
});


export default function MapWrapper({ locations }: MapWrapperProps) {
 return (
        <div className="relative z-10"> 
            <DynamicStoreMap locations={locations} />
        </div>
    );
}