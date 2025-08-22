

import clientPromise from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"

// Create a simple auth options object directly in the file

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
}

export async function POST(req) {
    console.log("=== PRODUCTS API ===")

    try {
        // Check authentication
        console.log("Checking authentication...")
        const session = await getServerSession(authOptions)
        console.log("Session:", session ? "Exists" : "None")

        if (!session) {
            console.log("Authentication failed: No session")
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        console.log("Connecting to MongoDB...")
        let client
        try {
            client = await clientPromise
            console.log("MongoDB client connected successfully")
        } catch (clientError) {
            console.error("MongoDB client connection failed:", clientError.message)
            return NextResponse.json(
                { error: "Database connection failed: " + clientError.message },
                { status: 500 }
            )
        }

        const db = client.db("myshop")
        console.log("Using database: myshop")

        // Parse request body
        console.log("Parsing request body...")
        let body
        try {
            body = await req.json()
            console.log("Request body:", JSON.stringify(body))
        } catch (parseError) {
            console.error("Failed to parse JSON:", parseError.message)
            return NextResponse.json(
                { error: "Invalid JSON format" },
                { status: 400 }
            )
        }

        // Validate input
        console.log("Validating input...")
        if (!body.name || !body.description || !body.price) {
            console.log("Validation failed: Missing fields")
            return NextResponse.json(
                { error: "Missing required fields: name, description, price" },
                { status: 400 }
            )
        }

        // Validate price is a number
        const price = parseFloat(body.price)
        if (isNaN(price) || price <= 0) {
            console.log("Validation failed: Invalid price")
            return NextResponse.json(
                { error: "Price must be a valid number greater than 0" },
                { status: 400 }
            )
        }

        const product = {
           
            name: body.name,
            description: body.description,
            price: Number(body.price),
            warranty: body.warranty,
            image: body.image,

            createdBy: session.user?.email || "unknown",
        }

        console.log("Preparing to insert product:", JSON.stringify(product))

        // Try to insert the product
        let result
        try {
            result = await db.collection("products").insertOne(product)
            console.log("Insert successful, ID:", result.insertedId)
        } catch (insertError) {
            console.error("Insert failed:", insertError.message)
            console.error("Error code:", insertError.code)
            return NextResponse.json(
                { error: "Failed to insert product: " + insertError.message },
                { status: 500 }
            )
        }

        console.log("=== REQUEST COMPLETED SUCCESSFULLY ===")
        return NextResponse.json(
            {
                message: "Product added successfully",
                product: { ...product, _id: result.insertedId },
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("UNEXPECTED ERROR:", error.message)
        console.error("Error stack:", error.stack)
        return NextResponse.json(
            { error: "Internal server error: " + error.message },
            { status: 500 }
        )
    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const pathSegments = url.pathname.split('/')
        const productId = pathSegments[pathSegments.length - 1]

        // If we have an ID in the URL, return a single product
        if (productId && productId !== 'products') {
            return await getSingleProduct(productId)
        }

        // Otherwise return all products
        const client = await clientPromise
        const db = client.db("myshop")

        // Check if products collection exists
        const collections = await db.listCollections().toArray()
        const productsCollectionExists = collections.some(
            (col) => col.name === "products"
        )

        if (!productsCollectionExists) {
            return NextResponse.json([], { status: 200 })
        }

        const products = await db
            .collection("products")
            .find({})
            .sort({ createdAt: -1 })
            .toArray()

        return NextResponse.json(products)
    } catch (error) {
        console.error("GET Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch products: " + error.message },
            { status: 500 }
        )
    }
}

// Helper function to get a single product
async function getSingleProduct(productId) {
    try {
        const client = await clientPromise
        const db = client.db("myshop")

        let product
        try {
            product = await db.collection("products").findOne({ _id: new ObjectId(productId) })
        } catch (err) {
            console.error("Error finding product:", err)
            return NextResponse.json(
                { error: "Invalid product ID format" },
                { status: 400 }
            )
        }

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(product)
    } catch (error) {
        console.error("GET Single Product Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch product: " + error.message },
            { status: 500 }
        )
    }
}