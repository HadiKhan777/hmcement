'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card')
  const [screenshot, setScreenshot] = useState<File | null>(null)

  const deliveryCharge = 500
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
  const grandTotal = cartTotal + deliveryCharge

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(
      paymentMethod === 'card'
        ? 'Redirecting to credit card payment...'
        : 'Bank transfer screenshot submitted. Pending approval.'
    )
  }

  return (
    <main className="min-h-screen py-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      {/* Cart Summary */}
      <section className="mb-8 border p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="text-sm mb-2">
              {cart.map((item) => (
                <li key={item.id}>
                  • {item.name} × {item.quantity} = ₨{item.price}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600">Delivery Charges: ₨{deliveryCharge}</p>
            <p className="font-semibold mt-2">Total: ₨{grandTotal}</p>
          </>
        )}
      </section>

      {cart.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Choose Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'bank')}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="card">Credit Card</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === 'card' && (
            <div className="border p-4 rounded-lg bg-gray-50">
              <p className="text-sm text-gray-600">You’ll be redirected to a secure Stripe checkout.</p>
              <button
                type="submit"
                className="mt-4 bg-[#1f1f1f] text-white px-6 py-2 rounded hover:scale-105 transition"
              >
                Pay with Credit Card
              </button>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
              <p className="text-sm">Upload your bank transfer screenshot below:</p>
              <input type="file" accept="image/*" onChange={handleUpload} />
              {screenshot && <p className="text-sm text-green-600">✔️ File selected: {screenshot.name}</p>}
              <button
                type="submit"
                className="bg-[#1f1f1f] text-white px-6 py-2 rounded hover:scale-105 transition"
              >
                Submit Payment Proof
              </button>
            </div>
          )}
        </form>
      )}
    </main>
  )
}
