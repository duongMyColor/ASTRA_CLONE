import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReactAdmin CMS',
  description: 'Create by Trung Pham Mycolor ',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome Icons */}

        <Script
          src="https://kit.fontawesome.com/5d75d7ad7f.js"
          crossOrigin="anonymous"
        ></Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
