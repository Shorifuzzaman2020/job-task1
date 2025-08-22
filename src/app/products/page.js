

"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
export default function ProductsPage() {
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
        <main className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products</h2>

            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        
                        <div key={product._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">

                            {/* Product Image */}
                            {product.image && (
                                <div className="relative w-full h-100 mb-4">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded"
                                        priority={true} // optional: prioritize above-the-fold images
                                    />
                                </div>
                            )}

                            {/* Product Details */}
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-gray-600 my-2">{product.description}</p>
                            <p className="font-semibold mb-2">${product.price}</p>

                            {/* Warranty */}
                            {product.warranty && (
                                <p className="text-sm text-gray-500 mb-3">Warranty: {product.warranty}</p>
                            )}

                            {/* Link to Details */}
                            <Link
                                href={`/products/${product._id}`}
                                className="inline-block bg-blue-600 p-2 rounded-sm text-white hover:cursor-pointer text-sm"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}