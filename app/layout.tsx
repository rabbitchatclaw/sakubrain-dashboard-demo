import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';
import { ModalProvider } from '@/components/ui/Modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SakuBrain Dashboard',
  description: 'Your personal knowledge management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`}>
        <ToastProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
