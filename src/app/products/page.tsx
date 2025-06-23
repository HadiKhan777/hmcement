'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

export type Product = {
  id: number
  name: string
  image: string
  basePrice: number
  brand: string
  type: 'OPC' | 'SRC' | 'White' | 'Other'
}

const products: Product[] = [
  { id: 1, name: 'Lucky Regular Cement (OPC)', image: '/luckyregular.png', basePrice: 1370, brand: 'Lucky Cement', type: 'OPC' },
  { id: 2, name: 'Lucky Cement (SRC)', image: '/src.png', basePrice: 1400, brand: 'Lucky Cement', type: 'SRC' },
  { id: 3, name: 'Lucky Supreme Cement (OPC)', image: '/supreme.png', basePrice: 1380, brand: 'Lucky Cement', type: 'OPC' },
  { id: 4, name: 'Lucky Block Cement (OPC)', image: '/block.png', basePrice: 1380, brand: 'Lucky Cement', type: 'OPC' },

  { id: 5, name: 'Bestway Cement (OPC)', image: '/xxx.png', basePrice: 1400, brand: 'Bestway Cement', type: 'OPC' },
  { id: 6, name: 'Bestway Cement (SRC)', image: '/SRP.png', basePrice: 1420, brand: 'Bestway Cement', type: 'SRC' },
  { id: 7, name: 'Pakcem Cement (OPC)', image: '/bestway-cement-pakcem.jpg', basePrice: 1400, brand: 'Bestway Cement', type: 'OPC' },
  { id: 8, name: 'Dandot Cement (OPC)', image: '/Dandot-Mockup.jpg-768x768.png', basePrice: 1330, brand: 'Dandot Cement', type: 'OPC' },
  { id: 9, name: 'Pioneer Cement (OPC)', image: '/PIONEER-W-600x600.png', basePrice: 1390, brand: 'Pioneer Cement', type: 'OPC' },
  { id: 10, name: 'Kohat Premium Cement (OPC)', image: '/kohat-premium.jpeg', basePrice: 1370, brand: 'Kohat Cement', type: 'OPC' },
  { id: 11, name: 'Kohat Cement (OPC)', image: '/Kohat-cement.webp', basePrice: 1360, brand: 'Kohat Cement', type: 'OPC' },
  { id: 12, name: 'Kohat White Cement', image: '/WHITE-KOHAT.webp', basePrice: 2200, brand: 'Kohat Cement', type: 'White' },

  { id: 13, name: 'Flying Pakistan Cement (OPC)', image: '/Flying.webp', basePrice: 1320, brand: 'Flying Cement', type: 'OPC' },
  { id: 14, name: 'Maple Leaf White Cement', image: '/whitemaple.jpg', basePrice: 2200, brand: 'Maple Leaf Cement', type: 'White' },
  { id: 15, name: 'Maple Leaf Cement (OPC)', image: '/MAPLE-ORDINARY-W-600x600.png', basePrice: 1400, brand: 'Maple Leaf Cement', type: 'OPC' },

  { id: 16, name: 'Cherat Cement (OPC)', image: '/Cherat-cement-400x400.webp', basePrice: 1370, brand: 'Cherat Cement', type: 'OPC' },
  { id: 17, name: 'DG Cement (OPC)', image: '/DG-ORDINARY-W.png', basePrice: 1400, brand: 'DG Cement', type: 'OPC' },
  { id: 18, name: 'DG Cement (SRC)', image: '/DG-Cement-Src-Ace-Material.jpg', basePrice: 1420, brand: 'DG Cement', type: 'SRC' },
  { id: 19, name: 'Paidar Cement (OPC)', image: '/PAidar-cement-400x400.webp', basePrice: 1365, brand: 'Paidar Cement', type: 'OPC' },
]

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }))
  }

  // Group products by brand > type
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.brand]) acc[product.brand] = {}
    if (!acc[product.brand][product.type]) acc[product.brand][product.type] = []
    acc[product.brand][product.type].push(product)
    return acc
  }, {} as Record<string, Record<string, Product[]>>)

  return (
    <main className="min-h-screen py-12 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Cement Products</h1>
      {Object.entries(grouped).map(([brand, types]) => (
        <section key={brand} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{brand}</h2>
          {Object.entries(types).map(([type, items]) => (
            <div key={type} className="mb-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{type} Cement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((product) => {
                  const quantity = quantities[product.id] || 1
                  const totalPrice = quantity * product.basePrice

                  return (
                    <div
                      key={product.id}
                      className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={128}
                        height={80}
                        className="mx-auto mb-3 object-contain"
                      />
                      <h4 className="text-lg font-medium text-center">{product.name}</h4>
                      <p className="text-sm text-gray-500 text-center">₨{product.basePrice}</p>
                      <div className="mt-2 flex justify-center items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(product.id, parseInt(e.target.value))
                          }
                          className="border rounded px-2 py-1 text-center w-16"
                        />
                        <span className="text-sm">units</span>
                      </div>
                      <p className="text-center text-sm mt-2 text-gray-600">
                        Total: ₨{totalPrice}
                      </p>
                      {quantity >= 100 && (
                        <p className="text-green-600 text-center text-sm font-semibold">
                          🚚 Free Delivery Eligible
                        </p>
                      )}
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            quantity,
                            price: totalPrice,
                          })
                        }
                        className="mt-3 w-full bg-[#1f1f1f] text-white py-2 rounded hover:scale-105 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}
