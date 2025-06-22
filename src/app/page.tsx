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
    name: 'Lucky Regular Cement (OPC)',
    image: '/luckyregular.png',
    basePrice: 1370,
  },
  {
    id: 2,
    name: 'Lucky Cement (SRC)',
    image: '/src.png',
    basePrice: 1400,
  },
  {
    id: 3,
    name: 'Lucky Supreme Cement (OPC)',
    image: '/supreme.png',
    basePrice: 1380,
  },
  {
    id: 4,
    name: 'Lucky Block Cement (OPC)',
    image: '/block.png',
    basePrice: 1380,
  },
  {
    id: 5,
    name: 'Bestway Cement (OPC)',
    image: '/xxx.png',
    basePrice: 1400,
  },
  {
    id: 6,
    name: 'Bestway Cement (SRC)',
    image: '/SRP.png',
    basePrice: 1420,
  },
  {
    id: 7,
    name: 'Pakcem Cement (OPC)',
    image: '/bestway-cement-pakcem.jpg',
    basePrice: 1400,
  },
  {
    id: 8,
    name: 'Dandot Cement (OPC)',
    image: '/Dandot-Mockup.jpg-768x768.png',
    basePrice: 1330,
  },
  {
    id: 9,
    name: 'Pioneer Cement (OPC)',
    image: '/PIONEER-W-600x600.png',
    basePrice: 1390,
  },
  {
    id: 10,
    name: 'Kohat Premium Cement (OPC)',
    image: '/kohat-premium.jpeg',
    basePrice: 1370,
  },
   {
    id: 11,
    name: 'Kohat Cement (OPC)',
    image: '/Kohat-cement.webp',
    basePrice: 1360,
  },
   {
    id: 12,
    name: 'Kohat White Cement',
    image: '/WHITE-KOHAT.webp',
    basePrice: 2200,
  },
   {
    id: 13,
    name: 'Flying Pakistan Cement (OPC)',
    image: '/Flying.webp',
    basePrice: 1320,
  },
   {
    id: 14,
    name: 'Maple Leaf White Cement',
    image: '/whitemaple.jpg',
    basePrice: 2200,
  },
   {
    id: 15,
    name: 'Maple Leaf Cement (OPC)',
    image: '/MAPLE-ORDINARY-W-600x600.png',
    basePrice: 1400,
  },
   {
    id: 16,
    name: 'Cherat Cement (OPC)',
    image: '/Cherat-cement-400x400.webp',
    basePrice: 1370,
  },
   {
    id: 17,
    name: 'DG Cement (OPC)',
    image: '/DG-ORDINARY-W.png',
    basePrice: 1400,
  },
  {
    id: 18,
    name: 'DG Cement (SRC)',
    image: '/DG-Cement-Src-Ace-Material.jpg',
    basePrice: 1420,
  },
  {
    id: 19,
    name: 'Paidar Cement (OPC)',
    image: '/PAidar-cement-400x400.webp',
    basePrice: 1365,
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4">H&M Company</h1>
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
