"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between p-4 bg-gray-200">
      <h1 className="font-bold">MyShop</h1>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        
        <Link href="/products" className="mr-4">Products</Link>
        {session ? (
            <>
            <Link href="/dashboard/add-product" className="mr-4">Add Product</Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
