

import Providers from "./providers"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
          </Providers>

      </body>
    </html>
  )
}
