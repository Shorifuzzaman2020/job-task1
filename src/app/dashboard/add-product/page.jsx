

"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function AddProductPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [warranty, setWarranty] = useState("")
    const [image, setImage] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Replace this with your ImgBB API key
    const IMGBB_API_KEY = "fc3b149af4e69041d72248d6085358e9"

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") return <div className="p-6">Loading...</div>

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        // Basic validation
        if (!name.trim() || !desc.trim() || !price.trim() || !warranty.trim() || !image) {
            setError("All fields are required")
            setLoading(false)
            return
        }

        if (isNaN(price) || parseFloat(price) <= 0) {
            setError("Price must be a valid number greater than 0")
            setLoading(false)
            return
        }

        try {
            // Upload image to ImgBB
            const formData = new FormData()
            formData.append("image", image)

            const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            })

            const imgbbData = await imgbbRes.json()

            if (!imgbbData.success) {
                throw new Error("Image upload failed")
            }

            const imageUrl = imgbbData.data.url

            // Send product data to your API
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    description: desc,
                    price: parseFloat(price),
                    warranty,
                    image: imageUrl,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to add product")
            }

            alert("Product added successfully!")
            router.push("/products")
        } catch (err) {
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Product Name" 
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <textarea
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    placeholder="Description" 
                    className="border p-2 w-full rounded"
                    rows="3"
                    disabled={loading}
                />

                <input 
                    type="number"
                    step="0.01"
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    placeholder="Price" 
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="Warranty (e.g., 1 year)"
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="border p-2 w-full rounded"
                    disabled={loading}
                />

                <button 
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded w-full disabled:bg-green-300"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </main>
    )
}

