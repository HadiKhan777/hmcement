'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

type Product = {
  id: number
  name: string
  image: string
  basePrice: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'UltraTech Cement',
    image: '/ultratech.png',
    basePrice: 1200,
  },
  {
    id: 2,
    name: 'Ambuja Cement',
    image: '/ambuja.png',
    basePrice: 1150,
  },
  {
    id: 3,
    name: 'ACC Cement',
    image: '/acc.png',
    basePrice: 1100,
  },
]

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <main className="min-h-screen py-12 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">All Cement Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const quantity = quantities[product.id] || 1
          const totalPrice = quantity * product.basePrice

          return (
            <div
              key={product.id}
              className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-20 object-contain mx-auto mb-4"
              />
              <h2 className="text-lg font-semibold text-center mb-2">{product.name}</h2>
              <div className="mb-2 text-center">
                <label htmlFor={`qty-${product.id}`} className="block text-sm">
                  Quantity (in 50kg units):
                </label>
                <input
                  id={`qty-${product.id}`}
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  className="mt-1 border rounded px-2 py-1 text-center w-20"
                />
              </div>
              <p className="text-center text-gray-600 mb-3">Total: ₨{totalPrice}</p>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    quantity,
                    price: totalPrice,
                  })
                }
                className="bg-[#1f1f1f] text-white w-full py-2 rounded hover:scale-105 transition"
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
