// File: src/app/page.tsx

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-[#1f1f1f] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">H&M Cement Company</h1>
        <p className="text-lg md:text-xl mb-6">Strong Foundations Start Here</p>
        <Link href="/products">
          <button className="bg-white text-[#1f1f1f] px-6 py-3 font-semibold rounded-2xl shadow-md hover:scale-105 transition">
            Browse Cement
          </button>
        </Link>
      </section>

      {/* Featured Brands */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Cement Brands</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Card 1 */}
          <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition">
            <Image
              src="/ultratech.png"
              alt="UltraTech Cement"
              width={150}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-center">UltraTech Cement</h3>
            <p className="text-center text-sm text-gray-600">From ₨1200 per 50kg</p>
          </div>

          {/* Brand Card 2 */}
          <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition">
            <Image
              src="/ambuja.png"
              alt="Ambuja Cement"
              width={150}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-center">Ambuja Cement</h3>
            <p className="text-center text-sm text-gray-600">From ₨1150 per 50kg</p>
          </div>

          {/* Brand Card 3 */}
          <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition">
            <Image
              src="/acc.png"
              alt="ACC Cement"
              width={150}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 text-center">ACC Cement</h3>
            <p className="text-center text-sm text-gray-600">From ₨1100 per 50kg</p>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/products">
            <button className="bg-[#1f1f1f] text-white px-6 py-3 rounded-2xl hover:scale-105 transition">
              See All Products
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
