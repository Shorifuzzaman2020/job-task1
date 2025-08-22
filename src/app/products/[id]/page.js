
// app/products/[id]/page.js
"use client"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function ProductDetail() {
  const params = useParams()
  const productId = params.id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError("")
        console.log("Fetching product with ID:", productId)
        
        const response = await fetch(`/api/products/${productId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found")
          } else {
            throw new Error(`Failed to fetch product: ${response.status}`)
          }
        }
        
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
          <p className="mt-2 text-sm">Product ID: {productId}</p>
        </div>
        <Link href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p>Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href="/products" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>
        
        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium mb-2">Additional Information</h4>
          <p className="text-sm text-gray-500">
            Added on: {new Date(product.createdAt).toLocaleDateString()}
          </p>
          {product.createdBy && (
            <p className="text-sm text-gray-500">Added by: {product.createdBy}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="/products"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Back to Products
        </Link>
      </div>
    </div>
  )
}