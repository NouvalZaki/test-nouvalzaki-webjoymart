// src/components/Footer.tsx
import Link from "next/link";
import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react'; 

export default function Footer() {
 return (
     <footer className="bg-gray-800 text-gray-200 py-8">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row justify-between items-center pb-6">
                 <img src="/joymerahlogo.webp" alt="Joymart Logo" className="h-8 mb-4 md:mb-0" />
                 <div className="flex space-x-6 mt-4 md:mt-0">
                 <p className="text-sm"> Joymart: Your Shopping Partner</p>
                 </div>
             </div>
     <div className="border-t border-gray-600 mt-2 pt-4"></div>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-10 gap-x-8 py-10">
             <div>
                <h3 className="font-bold text-white-900 mb-4 text-sm">Perusahaan</h3>
                <ul className="space-y-2 text-sm">
                <li><Link href="/tentang-kami" className="hover:text-red-500">Tentang Kami</Link></li>
                <li><Link href="/karir" className="hover:text-red-500">Karir</Link></li>
             </ul>
            </div>
            <div>
            <h3 className="font-bold text-white-900 mb-4 text-sm">Navigasi Utama</h3>
            <ul className="space-y-2 text-sm">
            <li><Link href="/toko" className="hover:text-red-500">Katalog Toko</Link></li>
            <li><Link href="/lokasi" className="hover:text-red-500">Lokasi Kami</Link></li>
            <li><Link href="/promo" className="hover:text-red-500">Promo & Penawaran</Link></li>
             <li><Link href="https://supplier.joymart.id" className="hover:text-red-600">Supplier</Link></li>
          </ul>
             </div>

             <div>
            <h3 className="font-bold text-white-900 mb-4 text-sm">Kontak</h3>
             <ul className="space-y-3 text-sm">
             <li className="flex items-center">
             <Mail className="w-4 h-4 mr-2 text-red-700"/>
             <a href="mailto:info@joymart.id" className="hover:text-red-600">customer.service@joymart.id</a>
             </li>
             <li className="flex items-center">
             <Phone className="w-4 h-4 mr-2 text-red-700"/>
             <span>0851 02232 9874</span>
             </li>
             <li className="flex items-start">
             <MapPin className="w-4 h-4 mr-2 mt-0.5 text-red-700 flex-shrink-0"/>
             <span>Samarinda, Kalimantan Timur</span>
             </li>
             </ul>
             </div>
             <div>
             <h3 className="font-bold text-gray-200 mb-4 text-sm">Ikuti Kami</h3>
            <div className="flex space-x-3">
             <a href="https://www.facebook.com/joymart.122193/" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-red-600 transition">
            <img src="/facebookIcon.png" alt="Facebook" className="w-6 h-6"/>
             </a>
             <a href="https://www.instagram.com/joymart_id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:text-red-600 transition">
                <img src="/instagramIcon.png" alt="Instagram" className="w-6 h-6"/>
             </a>
            <a href="https://www.youtube.com/channel/UCwUjUL97u_lv99sxW7vVdKw" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-500 hover:text-red-600 transition">
                <img src="/icons8-youtube.svg" alt="Twitter" className="w-8 h-8"/>
             </a>
             </div>
             </div>
             </div>
            <div className="border-t border-gray-600 mt-6 pt-6">   
                </div>
            <div className="pb-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; 2025 Joymart. All rights reserved. </p>
                
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy-policy" className="hover:text-white text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className="hover:text-white text-sm">
                        Terms of Service
                    </Link>
                    <Link href="/contact" className="hover:text-white text-sm">
                        Contact Us
                    </Link>              
                </div>
            </div>
        </div>
        </div>
    </footer>
  );
}

