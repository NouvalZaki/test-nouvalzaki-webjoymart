'use client';
import React from 'react';
import AdminProtected from '@/components/admin/AdminProtected';
import AdminLayout from '@/components/admin/AdminLayout'; 
import AdminDashboardContent from '@/components/admin/AdminDashboardContent'; 

export default function AdminDashboardPage() {
 return (
  <AdminProtected allowedRoles={['admin', 'super_admin', 'karyawan']}>
    <AdminLayout>
      <AdminDashboardContent />
    </AdminLayout>
  </AdminProtected>
 );
}