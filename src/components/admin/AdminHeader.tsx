'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Menu, X, Bell, User, LogOut, ChevronDown, Tag, Store, Users as UsersIcon, Briefcase, Clock, LayoutDashboard, Percent, Settings } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface AdminHeaderProps {
  variant?: 'solid' | 'transparent'; 
}

export default function AdminHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const userRole = (session?.user as any)?.role || 'karyawan';
  const userName = session?.user?.name || 'Admin';

  const fetchNotif = async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        const unread = data.filter((n: any) => n.is_read === 0 || n.is_read === false).length;
        setUnreadCount(unread);
      }
    } catch (error) { console.error("Gagal ambil notif:", error); }
  };

  useEffect(() => {
    fetchNotif();
    const interval = setInterval(fetchNotif, 30000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const handleMarkAsRead = async () => {
    if (unreadCount > 0) {
      try {
        await fetch('/api/notifications', { method: 'PATCH' });
        setUnreadCount(0);
      } catch (error) { console.error("Gagal update notif:", error); }
    }
  };

  const handleLogout = () => signOut({ callbackUrl: '/admin/login' });
  const hasRole = (roles?: string[]) => !roles || roles.includes(userRole);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0 flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2">
              <img src="/logojoynobg.webp" alt="Joymart Logo" className="h-10 w-auto" />
              <div className="hidden lg:block border-l pl-3 border-gray-100">
                <p className="text-[10px] font-black uppercase text-orange-600 italic leading-none">Joymart</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Management System</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/admin" className={`px-4 py-2 rounded-xl text-xs font-bold ${pathname === '/admin' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}>
              Dashboard
            </Link>

            {hasRole(['karyawan', 'admin', 'super_admin']) && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-all">
                  Promo <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 hidden group-hover:block animate-in fade-in zoom-in duration-200">
                  <Link href="/admin/promo/create" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <Tag size={14} /> Buat Promo
                  </Link>
                  <Link href="/admin/promo/edit_mode" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <Percent size={14} /> Kelola Promo
                  </Link>
                </div>
              </div>
            )}

            {hasRole(['karyawan', 'admin', 'super_admin']) && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-all">
                  Katalog <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 hidden group-hover:block animate-in fade-in zoom-in duration-200">
                  <Link href="/admin/toko/create" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <Store size={14} /> Tambah Produk
                  </Link>
                  <Link href="/admin/toko/edit_mode" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <Settings size={14} /> Edit Produk
                  </Link>
                </div>
              </div>
            )}

            {hasRole(['admin', 'super_admin']) && (
              <div className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-all">
                  SDM <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 hidden group-hover:block animate-in fade-in zoom-in duration-200">
                  <Link href="/admin/lowongan" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <Briefcase size={14} /> Buka Lowongan
                  </Link>
                  <Link href="/admin/applicants" className="flex items-center gap-2 px-4 py-3 text-[11px] font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition">
                    <UsersIcon size={14} /> Kelola Pelamar
                  </Link>
                </div>
              </div>
            )}

            {hasRole(['super_admin']) && (
              <Link href="/admin/users" className={`px-4 py-2 rounded-xl text-xs font-bold ${pathname === '/admin/users' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:text-gray-900'}`}>
                Akun
              </Link>
            )}
          </div>

<div className="flex items-center gap-2 md:gap-4">
  <div className="relative">
    <button 
      onClick={(e) => {
        e.stopPropagation();
        setOpenDropdown(openDropdown === 'notif' ? null : 'notif');
        handleMarkAsRead();
      }} 
      className={`p-2 transition-all relative rounded-xl ${openDropdown === 'notif' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:text-orange-600'}`}
    >
      <Bell size={18} />
      {unreadCount > 0 && (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[8px] flex items-center justify-center rounded-full border-2 border-white font-black animate-pulse">
          {unreadCount}
        </span>
      )}
    </button>

    {openDropdown === 'notif' && (
      <>
        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
        
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 py-5 z-[60] animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
          <div className="px-6 mb-3 flex justify-between items-center">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Notifikasi</p>
            {unreadCount > 0 && <span className="text-[9px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">Baru</span>}
          </div>
          
          <div className="max-h-72 overflow-y-auto px-2">
            {notifications.length === 0 ? (
              <p className="px-6 py-8 text-[10px] text-gray-400 font-bold italic text-center">Tidak ada aktivitas baru</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 mb-1 rounded-2xl border-l-4 transition-all ${n.is_read ? 'border-transparent opacity-50 hover:opacity-100' : 'border-orange-500 bg-orange-50/30'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[11px] font-bold text-gray-800 leading-tight">{n.title}</p>
                    <span className="text-[8px] text-gray-400 font-bold uppercase"><Clock size={8} className="inline mr-1" />{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-tight">{n.message}</p>
                </div>
              ))
            )}
          </div>
          <Link href="/admin/notifications" onClick={() => setOpenDropdown(null)} className="block text-center mt-3 pt-3 border-t border-gray-50 text-[10px] font-black text-orange-600 uppercase tracking-tighter hover:underline">
            Lihat Semua Log
          </Link>
        </div>
      </>
    )}
  </div>

  <div className="hidden md:flex items-center gap-3 border-l pl-4 border-gray-100">
     <div className="text-right">
        <p className="text-[10px] font-black text-gray-800 leading-none capitalize">{userName}</p>
        <p className="text-[9px] text-orange-500 font-bold uppercase italic">{userRole}</p>
     </div>
     <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
        <User size={16} />
     </div>
  </div>

            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2 rounded-xl bg-gray-50 text-gray-700 active:scale-90 transition-all">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 right-0 w-[85%] max-w-[320px] h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <img src="/logojoynobg.webp" alt="Joymart" className="h-8 w-auto" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400"><X size={24} /></button>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto">
              <Link href="/admin" className={`flex items-center gap-4 p-4 rounded-2xl text-xs font-black ${pathname === '/admin' ? 'bg-orange-50 text-orange-600' : 'text-gray-600'}`}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              
              <p className="px-4 pt-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">Katalog & Promo</p>
              <Link href="/admin/promo/create" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Buat Promo Baru</Link>
              <Link href="/admin/promo/edit_mode" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Kelola & Edit Promo</Link>
              <Link href="/admin/toko/create" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Tambah Produk</Link>
              <Link href="/admin/toko/edit_mode" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Edit Data Produk</Link>

              <p className="px-4 pt-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">SDM & Lowongan</p>
              <Link href="/admin/lowongan" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Buka Lowongan</Link>
              <Link href="/admin/applicants" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Data Pelamar</Link>

              {hasRole(['super_admin']) && (
                <>
                  <p className="px-4 pt-6 text-[9px] font-black text-gray-400 uppercase tracking-widest">Sistem</p>
                  <Link href="/admin/users" className="flex items-center gap-3 p-3 text-gray-600 font-bold text-xs hover:bg-gray-50 rounded-2xl italic">- Kelola Akun Admin</Link>
                </>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
               <button onClick={handleLogout} className="flex items-center justify-center gap-3 w-full p-4 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                <LogOut size={18} /> Keluar Sistem
               </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}