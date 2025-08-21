
"use client"
import Link from "next/link";

import { useEffect, useState } from "react"
import Image from "next/image"
export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <p>Loading products...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </main>
    )
  }
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to MyShop
        </h1>
        <p className="text-xl mb-8 drop-shadow-md">
          Find the best products at unbeatable prices.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Browse Products
        </Link>
      </section>

      {/* Product Highlights */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="overflow-hidden relative">
            <div
              className="flex animate-scroll whitespace-nowrap"
              style={{ gap: '1.5rem' }}
            >
              {products.concat(products).map((product, idx) => (
                <div
                  key={product._id + idx}
                  className="inline-block w-[250px] h-[450px] border p-4 rounded-lg shadow-sm flex-shrink-0 flex flex-col justify-between"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 mb-4">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                        priority={true}
                      />
                    ) : (
                      <div className="bg-gray-200 w-full h-full rounded"></div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg truncate">{product.name}</h3>
                      <p className="text-gray-600 text-sm break-words line-clamp-4">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-2">
                      <p className="font-semibold mb-1">${product.price}</p>
                      {product.warranty && (
                        <p className="text-sm text-gray-500 mb-2 truncate">
                          Warranty: {product.warranty}
                        </p>
                      )}
                      <Link
                        href={`/products/${product._id}`}
                        className="inline-block text-blue-600 hover:underline text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <style jsx>{`
    .animate-scroll {
      display: flex;
      animation: scroll 30s linear infinite;
    }
    @keyframes scroll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `}</style>
      </section>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>© 2025 MyShop. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link href="#" className="hover:text-blue-400 transition">
            Facebook
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Twitter
          </Link>
          <Link href="#" className="hover:text-blue-400 transition">
            Instagram
          </Link>
        </div>
      </footer>
    </main>
  );
}
