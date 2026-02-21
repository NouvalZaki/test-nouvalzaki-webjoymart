
'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { User, Bell } from 'lucide-react';

export default function AdminHeader({ variant = 'solid' }: { variant?: string }) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/admin') return 'Dashboard Ringkasan';
    if (pathname === '/admin/applicants') return 'Daftar Pelamar Masuk';
    if (pathname === '/admin/lowongan') return 'Manajemen Lowongan';
    return 'Panel Admin';
  };

  return (
    <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-600 italic">
          Joymart <span className="text-gray-300 mx-2">/</span> 
          <span className="text-gray-800 not-italic">{getTitle()}</span>
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-orange-600 transition relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">Zaki HRD</p>
            <p className="text-[9px] text-gray-400 font-bold uppercase">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 border border-orange-200">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}