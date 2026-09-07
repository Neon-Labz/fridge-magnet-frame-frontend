import type { Metadata } from 'next';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import Toast from '@/components/Toast';
import './globals.css';
import CartProvider from '@/context/CartContext';
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Magnify',
  description: 'Frames',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <SpeedInsights/>
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <Toast />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}