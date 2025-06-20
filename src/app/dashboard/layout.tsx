'use client';
import { Toaster } from 'sonner';
// import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}




export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
 //       <Navbar />
        {children}
        <Toaster />
      </div>
    </AuthProvider>
  );
}
