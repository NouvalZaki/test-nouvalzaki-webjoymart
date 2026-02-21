'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setLoading(false);
        setError('Username atau Password salah');
      } else {
        router.refresh(); 
        setTimeout(() => {
          router.push('/admin');
        }, 100);
      }
    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan sistem.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-[#292929] p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="mb-8 text-center">
         <h2 className="text-3xl font-black text-gray-800 dark:text-white tracking-tighter uppercase">
           Joymart <span className="text-orange-600">Admin</span>
         </h2>
         <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 italic">Panel Administrator</p>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl mb-6 text-xs font-bold border border-red-100 dark:border-red-900/30 animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-4 bg-gray-50 dark:bg-[#1a1a1a] border-2 border-gray-300 dark:border-gray-700 !text-gray-900 dark:!text-white rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 font-bold" 
            />
        </div>
          
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-gray-50 dark:bg-[#1a1a1a] border-2 border-gray-300 dark:border-gray-700 !text-gray-900 dark:!text-white rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all placeholder:text-gray-400 font-bold"
          />
        </div>
          
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-700 transition duration-150 disabled:bg-gray-400 shadow-lg shadow-orange-900/20 active:scale-95"
        >
          {loading ? 'MENGECEK AKSES...' : 'MASUK KE DASHBOARD'}
        </button>
      </form>
      
      <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        © 2025 Joymart Supermarket
      </p>
    </div>
  );
}