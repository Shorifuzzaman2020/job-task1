# My App

A full-stack web application built with **Next.js 14**, **MongoDB**, and **NextAuth.js**.  
It provides user authentication with Google OAuth and product management (list, add, view) features.

---

## 🚀 Features
- Google OAuth login using **NextAuth.js**
- MongoDB database integration
- REST API routes with Next.js App Router
- Product management: list products, add new products
- Protected routes after login

---

## 🛠️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/my-app.git
cd my-app

### 2. Install dependencies
```bash
npm install

### 3. Configure Environment Variables
Create a .env.local file in the root directory and add:
```env
# MongoDB connection
MONGODB_URI="your-mongodb-connection-string"

# NextAuth secret
NEXTAUTH_SECRET="your-random-secret-key"

# Google OAuth credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
👉 Replace values with your actual credentials.
Generate NEXTAUTH_SECRET using:
```bash
openssl rand -base64 32

### 4. Run the development server
```bash
npm run dev
Visit http://localhost:3000

📌 Route Summary

| Route            | Description                   |
| ---------------- | ----------------------------- |
| `/`              | Home page                     |
| `/login`         | Login with Google             |
| `/products`      | List all products (protected) |
| `/products/[id]` | View single product details   |

| Route                     | Method | Description                |
| ------------------------- | ------ | -------------------------- |
| `/api/products`           | GET    | Fetch all products         |
| `/api/products`           | POST   | Add a new product          |
| `/api/auth/[...nextauth]` | -      | NextAuth.js authentication |

✅ Tech Stack

Next.js 14 (App Router)
MongoDB
NextAuth.js
Tailwind CSS



