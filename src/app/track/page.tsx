'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  getDoc,
} from 'firebase/firestore'
import dayjs from 'dayjs'

type Order = {
  status: 'pending' | 'approved' | 'delivered'
  items: { name: string; quantity: number; price: number }[]
  grandTotal: number
  createdAt: { seconds: number }
}

export default function TrackOrderPage() {
  const [email, setEmail] = useState('')
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotFound(false)
    setOrder(null)

    try {
      if (orderId) {
        // Lookup by order ID
        const ref = doc(db, 'orders', orderId)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setOrder(snap.data() as Order)
          return
        }
      } else {
        // Lookup latest by email
        const q = query(
          collection(db, 'orders'),
          where('email', '==', email),
          orderBy('createdAt', 'desc'),
          limit(1)
        )
        const snap = await getDocs(q)
        if (!snap.empty) {
          setOrder(snap.docs[0].data() as Order)
          return
        }
      }
      setNotFound(true)
    } catch (err) {
      console.error(err)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-12 px-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Track Your Order</h1>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <label className="block font-medium">Enter your email or order ID:</label>
        <input
          type="text"
          placeholder="you@example.com or 5gTHDqw..."
          value={orderId || email}
          onChange={(e) => {
            const value = e.target.value
            if (value.includes('@')) {
              setEmail(value)
              setOrderId('')
            } else {
              setOrderId(value)
              setEmail('')
            }
          }}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-[#1f1f1f] text-white px-6 py-2 rounded hover:scale-105 transition w-full"
        >
          {loading ? 'Checking...' : 'Check Order Status'}
        </button>
      </form>

      {order && (
        <div className="bg-gray-100 p-6 rounded-xl space-y-4 shadow-sm">
          <div className="text-sm text-gray-600">
            Placed on: {dayjs.unix(order.createdAt.seconds).format('MMM D, YYYY h:mm A')}
          </div>

          <div className="space-y-1 text-sm">
            {order.items.map((item, i) => (
              <div key={i}>
                • {item.name} × {item.quantity} = ₨{item.price}
              </div>
            ))}
            <div className="mt-2 font-semibold">Total: ₨{order.grandTotal}</div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Order Status:</p>
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  order.status === 'pending'
                    ? 'w-1/3 bg-yellow-500'
                    : order.status === 'approved'
                    ? 'w-2/3 bg-green-500'
                    : 'w-full bg-blue-600'
                }`}
              ></div>
            </div>
            <p className="text-center font-semibold mt-2 capitalize">{order.status}</p>
          </div>
        </div>
      )}

      {notFound && (
        <p className="text-red-500 text-center mt-6">❌ No matching order found.</p>
      )}
    </main>
  )
}
