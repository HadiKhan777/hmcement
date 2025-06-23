// src/app/layout.tsx

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar' // ✅ Make sure this path is correct
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'H&M Company',
  description: 'Affordable quality cement in Pakistan',
   icons: {
    icon: 'favicon.png', 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <Navbar /> {/* ✅ Now your header with links will always show */}
          {children}
          <Footer />
          {/* ✅ Floating WhatsApp Button */}
          <Link
            href="https://wa.me/923004013971"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
          >
            <FaWhatsapp size={28} />
          </Link>
        </CartProvider>
      </body>
    </html>
  )
}
