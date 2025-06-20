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
  { id: 1, name: 'Lucky Regular Cement (OPC)', image: '/luckyregular.png', basePrice: 1100, brand: 'Lucky Cement', type: 'OPC' },
  { id: 2, name: 'Lucky Cement (SRC)', image: '/src.png', basePrice: 1150, brand: 'Lucky Cement', type: 'SRC' },
  { id: 3, name: 'Lucky Supreme Cement (OPC)', image: '/supreme.png', basePrice: 1120, brand: 'Lucky Cement', type: 'OPC' },
  { id: 4, name: 'Lucky Block Cement (OPC)', image: '/block.png', basePrice: 1090, brand: 'Lucky Cement', type: 'OPC' },
  { id: 5, name: 'Bestway Cement (OPC)', image: '/xxx.png', basePrice: 1090, brand: 'Bestway Cement', type: 'OPC' },
  { id: 6, name: 'Bestway Cement (SRC)', image: '/SRP.png', basePrice: 1090, brand: 'Bestway Cement', type: 'SRC' },
  { id: 7, name: 'Bestway Pakcem Cement (OPC)', image: '/bestway-cement-pakcem.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'OPC' },
  { id: 8, name: 'Bestway Ecocem Cement', image: '/bestway-cement-ecocem.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 9, name: 'Bestway Stallion Cement', image: '/bestway-cement-stallion.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 10, name: 'Bestway Cement (SRC)', image: '/bestway-cement-src.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'SRC' },
  { id: 11, name: 'Bestway Xtreme Bond Cement', image: '/bestway-cement-xtreme-bond.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 12, name: 'Bestway Low-Alkali Cement', image: '/bestway-cement-low-alkali.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 13, name: 'Bestway Duracem Cement', image: '/bestway-cement-duracem.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 14, name: 'Bestway Low-Heat Cement', image: '/bestway-cement-low-heat.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 15, name: 'Bestway Xtreme Tile Grout Cement', image: '/bestway-cement-xtreme-tile-grout.jpg', basePrice: 1090, brand: 'Bestway Cement', type: 'Other' },
  { id: 16, name: 'Dandot Cement (OPC)', image: '/Dandot-Mockup.jpg-768x768.png', basePrice: 1090, brand: 'Dandot Cement', type: 'OPC' },
  { id: 17, name: 'Pioneer Cement (OPC)', image: '/PIONEER-W-600x600.png', basePrice: 1090, brand: 'Pioneer Cement', type: 'OPC' },
  { id: 18, name: 'Kohat Premium Cement (OPC)', image: '/kohat-premium.jpeg', basePrice: 1090, brand: 'Kohat Cement', type: 'OPC' },
  { id: 19, name: 'Kohat Cement (OPC)', image: '/Kohat-cement.webp', basePrice: 1090, brand: 'Kohat Cement', type: 'OPC' },
  { id: 20, name: 'Kohat White Cement', image: '/WHITE-KOHAT.webp', basePrice: 1090, brand: 'Kohat Cement', type: 'White' },
  { id: 21, name: 'Flying Pakistan Cement (OPC)', image: '/Flying.webp', basePrice: 1090, brand: 'Flying Cement', type: 'OPC' },
  { id: 22, name: 'Maple Leaf White Cement', image: '/whitemaple.jpg', basePrice: 1090, brand: 'Maple Leaf Cement', type: 'White' },
  { id: 23, name: 'Maple Leaf Cement (OPC)', image: '/MAPLE-ORDINARY-W-600x600.png', basePrice: 1090, brand: 'Maple Leaf Cement', type: 'OPC' },
  { id: 24, name: 'Cherat Cement (OPC)', image: '/Cherat-cement-400x400.webp', basePrice: 1090, brand: 'Cherat Cement', type: 'OPC' },
  { id: 25, name: 'DG Cement (OPC)', image: '/DG-ORDINARY-W.png', basePrice: 1090, brand: 'DG Cement', type: 'OPC' },
  { id: 26, name: 'DG Cement (SRC)', image: '/DG-Cement-Src-Ace-Material.jpg', basePrice: 1090, brand: 'DG Cement', type: 'SRC' },
]

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }))
  }

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
                        width={120}
                        height={80}
                        className="mx-auto mb-3"
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
