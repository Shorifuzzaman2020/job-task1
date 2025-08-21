// app/api/products/[id]/route.js
import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { id } = params
    
    console.log("Fetching product with ID:", id)
    
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db("myshop")
    
    let product
    try {
      product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    } catch (err) {
      console.error("Error finding product:", err)
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      )
    }
    
    if (!product) {
      console.log("Product not found with ID:", id)
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }
    
    console.log("Product found:", product)
    return NextResponse.json(product)
  } catch (error) {
    console.error("GET Product Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch product: " + error.message },
      { status: 500 }
    )
  }
}