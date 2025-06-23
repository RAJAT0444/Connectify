// import './globals.css';
// import { Geist, Geist_Mono } from 'next/font/google';
// import AuthProvider from '@/context/AuthProvider';
// import { Toaster } from 'sonner';
// import Navbar from '@/components/Navbar';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//       <body>
//         <AuthProvider>
//           <Navbar />
//           {children}
//           <Toaster />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }










'use client';

import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/context/AuthProvider';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Navbar only on profile pages like /u/[username]
  const hideNavbar = pathname?.startsWith('/u/');

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AuthProvider>
          {!hideNavbar && <Navbar />}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}