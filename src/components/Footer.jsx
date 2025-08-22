
"use client"
import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white mt-10">
      {/* Top Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-3">MyShop</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Your trusted online store for quality products. 
            Shop smart, shop easy, shop with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-400 transition">Products</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition">About Us</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="#" className="hover:text-blue-400 transition"><FaFacebook size={22} /></Link>
            <Link href="#" className="hover:text-blue-400 transition"><FaTwitter size={22} /></Link>
            <Link href="#" className="hover:text-blue-400 transition"><FaInstagram size={22} /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="bg-blue-900 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
