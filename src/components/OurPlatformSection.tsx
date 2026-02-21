// src/components/OurPlatformSection.tsx
import React from 'react';

import { Phone, Package, Truck, ShoppingBag, Users, Store } from 'lucide-react'; 

interface PlatformCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    linkUrl: string;
    bgColor: string;
}

const PlatformCard = ({ icon, title, description, linkUrl, bgColor }: PlatformCardProps) => {
    return (
        <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`block p-5 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl ${bgColor}`}
        >
            <div className="flex items-center mb-3">
                <div className="p-3 rounded-full bg-white shadow-md mr-3">
                    {icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800">{title}</h4>
            </div>
            <p className="text-gray-600 text-sm">{description}</p>
        </a>
    );
};

const OurPlatformSection = () => {
    return (
        <section className="py-4 bg-white overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
              
                 <div className="lg:w-1/2 relative h-96 w-full mb-10 lg:mb-0">
                  <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl">
                      
                      <img 
                        src="/right.webp" 
                        alt="Supermarket Story - Desktop" 
                        className="object-cover w-full h-full hidden lg:block" 
                         />

                      <img 
                          src="/man_platform_backup.png" 
                          alt="Supermarket Story - Mobile" 
                          className="object-cover w-full h-full block lg:hidden" 
                      />
                     </div>
                    <div className="absolute top-[-100px] left-[-100px] h-64 w-64 bg-gray-300/50 rounded-full z-0 transform rotate-45"></div>
                    <div className="absolute bottom-[-50px] right-[-50px] h-32 w-32 bg-orange-400/60 rounded-full z-0"></div>
                    <div className="absolute bottom-[20%] left-[10%] h-16 w-16 bg-red-700/70 rounded-full z-0"></div>
                </div>

                <div className="lg:w-1/2 lg:pl-16 ">
                    <h2 className="text-5xl font-extrabold text-red-800 mb-4">
                        Toko Kami Ada di Mana Saja!
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Kami menjangkau Anda melalui berbagai saluran online dan marketplace. Pilih platform favorit Anda untuk berbelanja:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <PlatformCard 
                            icon={<Package className="h-6 w-6 text-green-500" />}
                            title="Tokopedia"
                            description="Temukan produk kami di marketplace hijau. Nikmati promo eksklusif."
                            linkUrl="https://tokopedia.link/R2G8FY9DyXb"
                            bgColor="bg-green-50"
                        />
                                                
                        <PlatformCard 
                            icon={<Truck className="h-6 w-6 text-orange-500" />}
                            title="Shopee"
                            description="Belanja kebutuhan rumah dengan voucher dan koin Shopee."
                            linkUrl="https://shopee.co.id/joymart_id"
                            bgColor="bg-orange-50"
                        />

                        <PlatformCard 
                            icon={<Phone className="h-6 w-6 text-teal-500" />}
                            title="Pesan via WhatsApp"
                            description="Pesan langsung ke tim kami untuk layanan cepat dan pengiriman khusus."
                            linkUrl="https://wa.me/+6285102329874"
                            bgColor="bg-teal-50"
                        />

                        <PlatformCard 
                            icon={<Store className="h-6 w-6 text-blue-500" />}
                            title="Toko Fisik (Offline)"
                            description="Kunjungi langsung gerai terdekat kami untuk pengalaman berbelanja penuh."
                            linkUrl="/lokasi"
                            bgColor="bg-blue-50"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurPlatformSection;