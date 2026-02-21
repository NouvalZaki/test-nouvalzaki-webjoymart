// File: src/components/admin/AdminDashboardContent.tsx
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { UsersIcon, Briefcase, ShoppingBag, Star, PenBoxIcon, ListChecksIcon, ShieldAlert, LayoutDashboard } from 'lucide-react'; 
import Link from 'next/link';
import HRDDashboardContent from './HRDDashboardContent';

export default function AdminDashboardContent() {
  const { data: session } = useSession();
  
  const userRole = (session?.user as any)?.role || 'karyawan';
  const userName = session?.user?.name || 'Administrator';

  const adminLinks = [
    {
      title: 'Tambah Promo Baru',
      description: 'Buat penawaran diskon atau promo spesial.',
      href: '/admin/promo/create',
      Icon: Star,
      color: 'text-orange-600',
      roles: ['karyawan', 'admin', 'super_admin']
    },
    {
      title: 'Tambah Produk Baru',
      description: 'Masukkan produk baru ke katalog toko.',
      href: '/admin/toko/create',
      Icon: ShoppingBag,
      color: 'text-blue-600',
      roles: ['karyawan', 'admin', 'super_admin']      
    },
    {
      title: 'Edit Promo',
      description: 'Update data promo yang sudah tayang.',
      href: '/admin/promo/edit_mode',
      Icon: ListChecksIcon,
      color: 'text-orange-500',
      roles: ['karyawan', 'admin', 'super_admin']
    },
    {
      title: 'Edit Produk',
      description: 'Update katalog produk yang tersimpan.',
      href: '/admin/toko/edit_mode',
      Icon: PenBoxIcon,
      color: 'text-blue-500',
      roles: ['karyawan', 'admin', 'super_admin']
    },
    {
      title: 'Manajemen User',
      description: 'Kelola akun akses web.',
      href: '/admin/users',
      Icon: ShieldAlert,
      color: 'text-red-600',
      roles: ['super_admin']
    },
    {
      title: 'Kelola Loker',
      description: 'Tambahkan atau edit informasi lowongan kerja.',
      href: '/admin/lowongan',
      Icon: Briefcase,
      color: 'text-purple-600',
      roles: ['admin', 'super_admin']
    },
    {
      title: 'Kelola Pelamar',
      description: 'Lihat dan proses aplikasi pelamar kerja.',
      href: '/admin/applicants',
      Icon: UsersIcon,
      color: 'text-green-600',
      roles: ['admin', 'super_admin']
    }
  ];

  const filteredLinks = adminLinks.filter(link => 
    link.roles.includes(userRole)
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      
      {(userRole === 'admin' || userRole === 'super_admin') ? (
        <section>
          <HRDDashboardContent />
        </section>
      ) : (
        <section className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-100 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Joymart <span className="text-orange-200">Portal</span></h2>
              <p className="mt-2 text-orange-50 font-medium opacity-90">Selamat datang, <span className="font-bold underline">{userName}</span>! Kelola promo dan produk hari ini.</p>
            </div>
            <LayoutDashboard size={120} className="absolute -right-5 -bottom-5 text-orange-400 opacity-20 rotate-12" />
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-600 rounded-full"></span>
                Menu Operasional
            </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 bg-white flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 group-hover:bg-orange-600 transition-colors shadow-inner">
                    <link.Icon className={`w-6 h-6 ${link.color} group-hover:text-white transition-colors`} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors tracking-tight">
                    {link.title}
                  </h2>
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}