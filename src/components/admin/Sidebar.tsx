'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { LayoutDashboard, Users, Briefcase, LogOut, Percent, Store, ChevronDown, UserCircle } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || 'karyawan';
  const userName = session?.user?.name || 'Admin';

  // State untuk dropdown sub-menu
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    promo: pathname.includes('/admin/promo'),
    toko: pathname.includes('/admin/toko'),
  });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['karyawan', 'admin', 'super_admin'] },
    { label: 'Data Pelamar', href: '/admin/applicants', icon: Users, roles: ['admin', 'super_admin'] },
    { label: 'Loker Joymart', href: '/admin/lowongan', icon: Briefcase, roles: ['admin', 'super_admin'] },
    
    { 
      label: 'Promo Toko', 
      id: 'promo',
      icon: Percent, 
      roles: ['karyawan', 'admin', 'super_admin'],
      subItems: [
        { label: 'Tambah Promo', href: '/admin/promo/create' },
        { label: 'Kelola Promo', href: '/admin/promo/edit_mode' },
      ]
    },

    { 
      label: 'Katalog Produk', 
      id: 'toko',
      icon: Store, 
      roles: ['karyawan', 'admin', 'super_admin'],
      subItems: [
        { label: 'Tambah Produk', href: '/admin/toko/create' },
        { label: 'Kelola Produk', href: '/admin/toko/edit_mode' },
      ]
    },
    {
      label: 'Kelola Akun',
      href: '/admin/users',
      icon: UserCircle,
      roles: ['super_admin']
    }
  ];

  const filteredMenu = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    // 'hidden md:flex' artinya: Hilang di HP, Muncul di Desktop (layar medium ke atas)
    <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col h-screen sticky top-0 overflow-y-auto shadow-sm transition-all duration-300">
      
      {/* BRANDING AREA */}
      <div className="p-8">
        <Link href="/admin">
          <div className="flex items-center gap-3">
            <img src="/logojoynobg.webp" alt="Joymart" className="h-10 w-auto" />
            <div>
              <h1 className="text-sm font-black text-orange-600 italic tracking-tighter uppercase leading-none">
                JOYMART
              </h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Management</p>
            </div>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-6 space-y-1">
        {filteredMenu.map((item) => {
          const hasSubItems = !!item.subItems;
          const isOpen = openMenus[item.id || ''];
          const isActive = pathname === item.href || (hasSubItems && pathname.includes(item.id || ''));

          return (
            <div key={item.label} className="py-0.5">
              {hasSubItems ? (
                <button
                  onClick={() => toggleMenu(item.id!)}
                  className={`flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                    isActive ? 'text-orange-600 bg-orange-50/50' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? 'text-orange-600' : 'text-gray-400'} />
                    {item.label}
                  </div>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={item.href!}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all ${
                    pathname === item.href ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              )}

              {/* Animasi Sub-menu */}
              {hasSubItems && isOpen && (
                <div className="mt-1 ml-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {item.subItems!.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className={`block px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all ${
                        pathname === sub.href ? 'text-orange-600 bg-orange-50 border-r-4 border-orange-600 rounded-r-none' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* USER & LOGOUT SECTION */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3 mb-6 px-2">
           <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-orange-600 shadow-sm">
              <UserCircle size={24} />
           </div>
           <div className="overflow-hidden">
              <p className="text-[11px] font-black text-gray-800 leading-none truncate capitalize">{userName}</p>
              <p className="text-[9px] text-orange-500 font-bold uppercase italic mt-1">{userRole}</p>
           </div>
        </div>
        
        <button 
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center justify-center gap-3 px-4 py-3 w-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all rounded-2xl shadow-sm active:scale-95"
        >
          <LogOut size={16} />
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
}