// components/admin/AdminProtected.tsx
'use client';

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, memo } from 'react';

interface AdminProtectedProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function AdminProtected({ 
  children, 
  allowedRoles = ['karyawan', 'admin', 'super_admin'] 
}: AdminProtectedProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.replace('/admin/login');
    }

    if (status === "authenticated" && session?.user) {
      const userRole = (session.user as any).role;

      if (!allowedRoles.includes(userRole)) {
        alert("Akses Ditolak: Role Anda tidak diizinkan.");
        router.replace('/admin');
      }

      if (pathname === '/admin/login') {
        router.replace('/admin');
      }
    }
  }, [session, status, router, pathname, allowedRoles]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
           <p className="text-sm font-black uppercase tracking-widest text-gray-400">Memverifikasi Otoritas Joymart...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
}

export default memo(AdminProtected);