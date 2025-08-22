

"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Function to check active link
  const linkClass = (path) =>
    pathname === path
      ? "text-yellow-300 font-semibold"
      : "text-white hover:text-blue-300 transition"

  return (
    <nav className="bg-blue-700 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-bold text-white text-xl">MyShop</h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/products" className={linkClass("/products")}>Products</Link>
          {session ? (
            <>
              <Link
                href="/dashboard/add-product"
                className={linkClass("/dashboard/add-product")}
              >
                Add Product
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className={linkClass("/login")}>Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 flex flex-col items-center bg-blue-600 py-4 rounded-lg shadow-lg">
          <Link href="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>
            Home
          </Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className={linkClass("/products")}>
            Products
          </Link>
          {session ? (
            <>
              <Link
                href="/dashboard/add-product"
                onClick={() => setMenuOpen(false)}
                className={linkClass("/dashboard/add-product")}
              >
                Add Product
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={linkClass("/login")}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
