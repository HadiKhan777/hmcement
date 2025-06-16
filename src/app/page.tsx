'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  image: string
  basePrice: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Lucky Regular Cement',
    image: '/luckyregular.png',
    basePrice: 1100,
  },
  {
    id: 2,
    name: 'SRC Cement',
    image: '/src.png',
    basePrice: 1150,
  },
  {
    id: 3,
    name: 'Supreme Cement',
    image: '/supreme.png',
    basePrice: 1120,
  },
  {
    id: 4,
    name: 'Block Cement',
    image: '/block.png',
    basePrice: 1090,
  },
]

export default function HomePage() {
  const { cart, addToCart, removeFromCart } = useCart()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }))
  }

  const isInCart = (id: number) => cart.some((item) => item.id === id)

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#1f1f1f] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">H&M Cement Company</h1>
        <p className="text-lg md:text-xl mb-6">Strong Foundations Start Here</p>
        <Link href="/products">
          <button className="bg-white text-[#1f1f1f] px-6 py-3 font-semibold rounded-2xl shadow-md hover:scale-105 transition">
            Browse All Products
          </button>
        </Link>
      </section>

      {/* Product Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Cement Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => {
            const quantity = quantities[product.id] || 1
            const totalPrice = quantity * product.basePrice
            const inCart = isInCart(product.id)

            return (
              <div
                key={product.id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 text-center">{product.name}</h3>

                <div className="mb-2 text-center">
                  <label className="block text-sm">Quantity (50kg units):</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, parseInt(e.target.value))
                    }
                    className="mt-1 border rounded px-2 py-1 text-center w-20"
                  />
                </div>

                <p className="text-center text-gray-600 mb-3">Total: ₨{totalPrice}</p>

                {inCart ? (
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="bg-red-500 text-white w-full py-2 rounded hover:scale-105 transition"
                  >
                    Remove from Cart
                  </button>
                ) : (
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
                )}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
