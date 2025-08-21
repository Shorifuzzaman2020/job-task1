

// import Link from "next/link"

// export default function Home() {
//   return (
//     <main>

//       {/* Hero */}
//       <section className="p-10 text-center bg-blue-100">
//         <h2 className="text-3xl font-bold">Welcome to MyShop</h2>
//         <p className="mt-2">Best products at the best prices</p>
//       </section>

//       {/* Product Highlights */}
//       <section className="p-6 grid grid-cols-2 gap-4">
//         <div className="p-4 border rounded">Product A</div>
//         <div className="p-4 border rounded">Product B</div>
//       </section>

//       {/* Footer */}
//       <footer className="p-4 text-center bg-gray-200">
//         <p>© 2025 MyShop</p>
//       </footer>
//     </main>
//   )
// }


import Link from "next/link";

export default function Home() {
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
      <section className="py-16 px-6 bg-gray-50 flex-1">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Example Product Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="h-48 bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              Product A
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Product A</h3>
              <p className="text-gray-600 mb-4">
                High quality product at a great price.
              </p>
              <Link
                href="/products/1"
                className="text-blue-600 font-semibold hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="h-48 bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
              Product B
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">Product B</h3>
              <p className="text-gray-600 mb-4">
                Best seller item loved by our customers.
              </p>
              <Link
                href="/products/2"
                className="text-indigo-600 font-semibold hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Add more product cards as needed */}
        </div>
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
