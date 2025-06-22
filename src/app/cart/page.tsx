'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'


export default function CartPage() {
  const { cart, removeFromCart,updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const delivery = totalQuantity > 100 ? 0 : 1600

  const grandTotal = total + delivery

  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                 <div className="flex items-center gap-2">
                <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
                -
                </button>
                <span>{item.quantity}</span>
                <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded">
                +
                </button>
                </div>

                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold">₨{item.price}</p>
                  <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline mt-1">
    Remove
  </button>
</div>

              </li>
            ))}
          </ul>

          <div className="border-t pt-4 text-sm text-gray-700">
            <p className="flex justify-between mb-2">
              <span>Subtotal:</span> <span>₨{total}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Delivery:</span> <span>₨{delivery}</span>
            </p>
            <p className="flex justify-between font-bold text-black text-base">
              <span>Total:</span> <span>₨{grandTotal}</span>
            </p>
          </div>

          <Link href="/checkout">
            <button className="mt-6 w-full bg-[#1f1f1f] text-white py-3 rounded hover:scale-105 transition">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </main>
  )
}
