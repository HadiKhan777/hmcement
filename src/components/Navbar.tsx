'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-[#1f1f1f]">
        H&M Cement
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/products" className="text-gray-700 hover:underline">
          Products
        </Link>
        <Link href="/track" className="text-gray-700 hover:underline">
          Track Order
        </Link>
        <Link href="/cart" className="relative">
  <span className="text-gray-700 hover:underline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}
