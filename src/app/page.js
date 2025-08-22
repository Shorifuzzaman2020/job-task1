
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
        
        <p>Loading...</p>
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
    <main className="min-h-screen flex flex-col mt-3 w-11/12 mx-auto ">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-200 to-indigo-800 text-white py-20 px-6 border-2 rounded-3xl">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-around md:gap-4">
          {/* Left: Circle Image Layout */}
          <div className="relative w-80 h-80 flex items-center justify-center mb-10 md:mb-0">
            <div className="absolute w-full h-full rounded-full border-4 border-white flex items-center justify-center">
              {/* Small images placed around circle */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <Image src="https://i.ibb.co.com/b5yv5P6Q/download-10.jpg" alt="product1" width={70} height={70} className="rounded-full shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Image src="https://i.ibb.co.com/b5yv5P6Q/download-10.jpg" alt="product2" width={70} height={70} className="rounded-full shadow-lg" />
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                <Image src="https://i.ibb.co.com/2Ynn0X9T/download-8.jpg" alt="product3" width={70} height={70} className="rounded-full shadow-lg" />
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <Image src="https://i.ibb.co.com/wFCdvGC7/download-7.jpg" alt="product4" width={70} height={70} className="rounded-full shadow-lg" />
              </div>
            </div>
          </div>

          {/* Right: Typing Effect */}
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
              <span className="typing-text"></span>
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
          </div>
        </div>

        {/* Typing Animation */}
        <style jsx>{`
    .typing-text {
      display: inline-block;
      border-right: 3px solid white;
      white-space: nowrap;
      overflow: hidden;
      animation: typing 4s steps(20, end) infinite alternate,
                 blink 0.7s step-end infinite;
    }
    @keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
    @keyframes blink {
      50% { border-color: transparent }
    }
    .typing-text::before {
      content: "Welcome to MyShop";
    }
  `}</style>
      </section>


      {/* Product Highlights */}
      <section className="py-16 px-6">
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
                        className="inline-block bg-blue-600 p-2 rounded-sm text-white hover:cursor-pointer text-sm"
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
      
    </main>
  );
}
