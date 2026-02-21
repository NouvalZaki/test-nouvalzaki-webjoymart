// src/app/admin/login/page.tsx
import AdminHeader from '@/components/admin/AdminHeader';
import Header from '@/components/Header';
import LoginForm from '@/components/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="solid" />
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
        <LoginForm />
      </div>
    </div>
  );
}