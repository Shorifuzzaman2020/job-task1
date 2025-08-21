// app/api/test-mongodb/route.js
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
      return NextResponse.json(
        { error: "MONGODB_URI environment variable is not set" },
        { status: 500 }
      )
    }
    
    console.log("Testing connection with URI:", uri.replace(/:[^:]*@/, ":****@"))
    
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    
    await client.connect()
    const db = client.db("myshop")
    await db.command({ ping: 1 })
    await client.close()
    
    return NextResponse.json({ 
      message: "MongoDB connection successful!",
      database: "myshop"
    })
  } catch (error) {
    console.error("MongoDB connection test failed:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}