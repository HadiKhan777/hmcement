import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // ✅ import the CartProvider
import Navbar from '@/components/Navbar'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H&M Cement Company",
  description: "Buy high-quality cement with delivery and payment options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Wrap the whole app with CartProvider */}
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <a
  href="https://wa.me/923004013971"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition z-50 flex items-center gap-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 32 32"
    className="w-5 h-5"
  >
    <path d="M16 .396C7.16.396.007 7.548.007 16.393c0 2.891.75 5.716 2.18 8.213L.093 32l7.564-2.071a15.928 15.928 0 008.343 2.323h.007c8.844 0 16-7.152 16-15.999C31.999 7.548 24.843.396 16 .396zm0 29.19a13.01 13.01 0 01-6.627-1.83l-.475-.285-4.497 1.231 1.2-4.383-.292-.45a13.007 13.007 0 01-1.997-6.855c0-7.18 5.84-13.02 13.021-13.02 3.48 0 6.75 1.356 9.186 3.82a12.91 12.91 0 013.826 9.181c-.001 7.18-5.841 13.021-13.021 13.021zm7.262-9.787c-.396-.198-2.338-1.157-2.7-1.287-.362-.132-.625-.198-.887.198-.264.396-1.017 1.287-1.248 1.55-.23.264-.462.297-.857.099-.396-.198-1.674-.618-3.188-1.974-1.18-1.05-1.975-2.344-2.207-2.741-.231-.396-.025-.61.173-.807.177-.175.396-.457.595-.686.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.887-2.138-1.213-2.928-.32-.768-.645-.663-.887-.675l-.756-.013c-.264 0-.693.099-1.056.495s-1.39 1.358-1.39 3.3 1.424 3.826 1.622 4.094c.198.264 2.804 4.284 6.8 6.007.95.409 1.693.654 2.27.837.954.303 1.823.26 2.51.158.765-.114 2.338-.955 2.67-1.876.33-.924.33-1.716.231-1.876-.099-.165-.363-.264-.759-.462z" />
  </svg>
  <span className="text-sm font-medium">Chat on WhatsApp</span>
</a>

      </body>
    </html>
  );
}
