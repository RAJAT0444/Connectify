'use client';
import { Toaster } from 'sonner';

import AuthProvider from '@/context/AuthProvider';

interface RootLayoutProps {
  children: React.ReactNode;
}

// if you need to import Navbaar into dashboard to add but security purpose dont import 


export default function DashboardLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {children}
        <Toaster />
      </div>
    </AuthProvider>
  );
}
