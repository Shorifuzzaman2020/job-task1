// app/test-mongodb/page.jsx
"use client"
import { useState } from "react"

export default function TestMongoDB() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setStatus("Testing MongoDB connection...")
    
    try {
      const response = await fetch("/api/test-mongodb")
      const data = await response.json()
      
      if (response.ok) {
        setStatus(`Success: ${data.message}`)
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch (error) {
      setStatus(`Connection failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test MongoDB Connection</h1>
      
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {loading ? "Testing..." : "Test Connection"}
      </button>
      
      {status && (
        <div className={`mt-4 p-3 rounded ${
          status.includes("Success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {status}
        </div>
      )}
      
      <div className="mt-6 text-sm text-gray-600">
        <p className="font-bold">Common issues:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Incorrect connection string</li>
          <li>IP address not whitelisted in MongoDB Atlas</li>
          <li>Internet connectivity issues</li>
          <li>Incorrect database username or password</li>
        </ul>
      </div>
    </div>
  )
}