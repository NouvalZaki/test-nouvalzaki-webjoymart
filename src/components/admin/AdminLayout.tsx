// src/components/admin/AdminLayout.tsx
'use client';

import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from '@/components/admin/Sidebar'; 

interface AdminLayoutProps {
  children: React.ReactNode; 
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar /> 

      <div className="flex-1 flex flex-col">
        <AdminHeader /> 
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}