# My App

A full-stack web application built with **Next.js 15**, **MongoDB**, and **NextAuth.js**.  
It provides user authentication with Google OAuth and product management (list, add, view) features.

---

## 🚀 Features
<ul>
  <li>Google OAuth login using <b>NextAuth.js</b></li>
  <li>MongoDB database integration</li>
  <li>REST API routes with Next.js App Router</li>
  <li>Product management: list products, add new products</li>
  <li>Protected routes after login</li>
</ul>

---

## 🛠️ Setup & Installation

bash
# 1. Clone the repository
git clone https://github.com/your-username/my-app.git
cd my-app

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.local file in the root directory and add:

# MongoDB connection
MONGODB_URI="your-mongodb-connection-string"

# NextAuth secret (generate using: openssl rand -base64 32)
NEXTAUTH_SECRET="your-random-secret-key"

# Google OAuth credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# 4. Run the development server
npm run dev

---
then Visit <a href="http://localhost:3000" target="_blank">http://localhost:3000
</a>
## 📌 Route Summary
Pages
<table> <tr><th>Route</th><th>Description</th></tr> <tr><td><code>/</code></td><td>Home page</td></tr> <tr><td><code>/login</code></td><td>Login with Google</td></tr> <tr><td><code>/products</code></td><td>List all products (protected)</td></tr> <tr><td><code>/products/[id]</code></td><td>View single product details</td></tr> </table>
API Endpoints
<table> <tr><th>Route</th><th>Method</th><th>Description</th></tr> <tr><td><code>/api/products</code></td><td>GET</td><td>Fetch all products</td></tr> <tr><td><code>/api/products</code></td><td>POST</td><td>Add a new product</td></tr> <tr><td><code>/api/auth/[...nextauth]</code></td><td>-</td><td>NextAuth.js authentication</td></tr> </table>

✅ Tech Stack
<ul> <li>Next.js 14 (App Router)</li> <li>MongoDB</li> <li>NextAuth.js</li> <li>Tailwind CSS</li> </ul> ```


