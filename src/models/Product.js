import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

// Avoid model overwrite issue in dev mode
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema)

export default Product
