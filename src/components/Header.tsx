// src/components/Header.tsx
"use client";
import Link from 'next/link';
import React, {useState, useEffect} from 'react'; 
import { Menu, X} from 'lucide-react';

interface HeaderProps {
  variant: 'transparent' | 'solid'; 
}
export default function Header({ variant }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isSolid = variant === 'solid' || isScrolled;
  const headerClasses = isSolid
    ? 'sticky top-0 w-full bg-white shadow-md z-50 text-black transition-colors duration-600' 
     : 'absolute top-0 left-0 w-full bg-transparent z-50 text-white transition-colors duration-600'; 
 const linkClasses = isSolid
    ? 'text-gray-700 hover:bg-gray-100 hover:text-orange-600'
    : 'hover:text-orange-400';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tentang Kami', href: '/tentang-kami' },
    { name: 'Promo', href: '/promo' },
    // { name: 'Berita', href: '/berita' },
    // { name: 'Karir', href: '/karir' },
    { name: 'Lokasi', href: '/lokasi-toko' },
    { name: 'Toko', href: '/toko' },
    { name: 'Supplier', href: 'https://supplier.joymart.id/v2022411/Login/' },
    // { name: 'Hubungi Kami', href: '/hubungi-kami' },
  ];
  const signInLink = {name: 'SIGN IN', href: '/admin/login'};



  const mobileMenuClasses = variant === 'transparent'
    ? 'block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-400'
    : 'block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 hover:text-orange-400'; 
  return (
    <header className={headerClasses}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20"> 
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">              
              <img 
                src={variant === 'transparent' ? '/logojoynobg.webp' : '/logojoynobg.webp'} 
                alt="Logo Supermarket" 
                className="h-16 w-auto" 
              />
            </Link>
          </div>
          {/* Menu Desktop */}
          <div className="hidden md:block">
    <div className="ml-10 flex items-baseline space-x-4">
    {/* Navigation Links */}
    {navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${linkClasses}`}
      >
        {link.name}
      </Link>
    ))}
    </div>
      </div>
          <div className="md:hidden">
            <button onClick={()=> setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />  }
        </button>
        </div>
        </div>
      </nav>
      {isMenuOpen && (
      <div className={`md:hidden ${variant === 'transparent' ? 'bg-black/70' : 'bg-white shadow-lg'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={mobileMenuClasses}
            >
              {link.name}
            </Link>
          ))}
      </div>
      </div>
      )}
    </header>
  );
}