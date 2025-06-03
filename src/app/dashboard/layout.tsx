'use client';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <Toaster />
      </div>
    </AuthProvider>
  );
}
