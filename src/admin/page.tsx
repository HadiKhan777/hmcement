'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'

type Order = {
  id: string
  items: any[]
  total: number
  delivery: number
  grandTotal: number
  screenshot?: string
  paymentMethod: string
  status: string
  createdAt: any
}

const ADMIN_PASSWORD = 'hmcement123' // ✅ change this to something only you know

export default function AdminPage() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as Order[]
    setOrders(data)
    setLoading(false)
  }

  const markApproved = async (id: string) => {
    await updateDoc(doc(db, 'orders', id), { status: 'approved' })
    fetchOrders()
  }

  useEffect(() => {
    if (accessGranted) fetchOrders()
  }, [accessGranted])

  if (!accessGranted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="border rounded px-4 py-2 mb-4 w-64 text-center"
        />
        <button
          onClick={() => {
            if (passwordInput === ADMIN_PASSWORD) {
              setAccessGranted(true)
            } else {
              alert('Incorrect password.')
            }
          }}
          className="bg-[#1f1f1f] text-white px-6 py-2 rounded"
        >
          Enter
        </button>
      </main>
    )
  }

  if (loading) return <p className="p-6">Loading orders...</p>

  return (
    <main className="min-h-screen py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500 mb-2">
                Order placed: {order.createdAt?.toDate().toLocaleString()}
              </p>
              <p className="font-semibold mb-1">
                Payment: {order.paymentMethod.toUpperCase()} | Status:{' '}
                <span
                  className={
                    order.status === 'approved'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }
                >
                  {order.status}
                </span>
              </p>
              <ul className="text-sm list-disc ml-4">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity} — ₨{item.price}
                  </li>
                ))}
              </ul>
              <p className="mt-2">Delivery: ₨{order.delivery}</p>
              <p className="font-semibold">Total: ₨{order.grandTotal}</p>

              {order.paymentMethod === 'bank' && order.screenshot && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Payment Proof:</p>
                  <img
                    src={order.screenshot}
                    alt="screenshot"
                    className="w-full max-w-xs rounded border"
                  />
                </div>
              )}

              {order.status !== 'approved' && (
                <button
                  onClick={() => markApproved(order.id)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:scale-105 transition"
                >
                  Mark as Approved
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
