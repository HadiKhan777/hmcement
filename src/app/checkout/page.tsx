'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { uploadToCloudinary } from '@/lib/uploadToCloudinary'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart } = useCart()
  const [buyerEmail, setBuyerEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deliveryCharge = 500
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0)
  const grandTotal = cartTotal + deliveryCharge

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cart.length) return alert('❌ Your cart is empty.')
    if (!buyerEmail) return alert('📧 Please enter your email.')
    if (!screenshot && paymentMethod === 'bank') return alert('📎 Upload screenshot required.')

    try {
      setLoading(true)

      console.log('📤 Uploading screenshot...')
      const imageUrl = await uploadToCloudinary(screenshot!)
      console.log('✅ Screenshot uploaded:', imageUrl)

      console.log('📥 Saving order to Firestore...')
      const docRef = await addDoc(collection(db, 'orders'), {
        email: buyerEmail,
        items: cart,
        total: cartTotal,
        delivery: deliveryCharge,
        grandTotal,
        paymentMethod: 'bank',
        screenshot: imageUrl,
        status: 'pending',
        createdAt: Timestamp.now(),
      })
      const orderId = docRef.id
      await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: buyerEmail,
    name: 'Customer',
    orderDetails:
      cart.map((item) => `${item.name} × ${item.quantity} = ₨${item.price}`).join('\n') +
      `\n\nDelivery: ₨${deliveryCharge}\nTotal: ₨${grandTotal}`,
    orderId, // ✅ pass the ID to backend
  }),
})
      console.log('✅ Order saved to Firestore with ID:', orderId)

      const orderSummary = cart
        .map((item) => `${item.name} × ${item.quantity} = ₨${item.price}`)
        .join('\n') + `\n\nDelivery: ₨${deliveryCharge}\nTotal: ₨${grandTotal}`

      console.log('📧 Sending email...')
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: buyerEmail,
          name: 'Customer',
          orderId: orderId,
          orderDetails: orderSummary,
        }),
      })

      const emailData = await emailRes.json()
      console.log('✅ Email sent response:', emailData)

      alert('✅ Order submitted! Confirmation email sent.')
      router.push('/products')
    } catch (err: any) {
      if (err instanceof Error) {
        console.error('❌ Caught Error:', err.message)
      } else {
        console.error('❌ Unknown error object:', err)
      }
      alert('❌ Failed to submit your order.')
    } finally {
      console.log('🔄 Resetting form state')
      setLoading(false)
      setScreenshot(null)
    }
  }

  return (
    <main className="min-h-screen py-12 px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

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
            <label className="block font-medium mb-2">Your Email (for confirmation):</label>
            <input
              type="email"
              required
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              placeholder="you@example.com"
              className="border rounded px-3 py-2 w-full"
            />
          </div>

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
              <p className="text-sm text-gray-600">You’ll be redirected to a secure card gateway (to be added).</p>
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
              <p className="text-sm">Upload your bank transfer screenshot:</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    console.log('📂 File selected:', file.name)
                    setScreenshot(file)
                  }
                }}
                className="block w-full text-sm file:mr-4 file:py-2 file:px-4
                          file:rounded file:border-0 file:text-sm
                          file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />

              {screenshot && (
                <p className="text-sm text-green-600">
                  ✔️ File selected: {screenshot.name ?? 'screenshot.jpg'}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#1f1f1f] text-white px-6 py-2 rounded hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? 'Submitted✔️ ' : 'Submit Payment Proof'}
              </button>
            </div>
          )}
        </form>
      )}
    </main>
  )
}
