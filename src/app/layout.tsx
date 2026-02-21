// src/app/layout.tsx
import './globals.css'; 
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers'; // <-- 1. Import Providernya

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Joymart',
  description: 'Joymart - Your Shopping Partner',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Providers>
          <div> 
             {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}