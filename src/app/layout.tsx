import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SahayogSetu | Hyperlocal In-Kind & CSR Fulfillment Platform',
  description: 'Verified resource matching connecting Indian schools, civic donors, and corporate CSR.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}