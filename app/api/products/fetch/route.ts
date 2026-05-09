import { AppError } from "@/config/errors"
import { getProducts } from "@/lib/products"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
	try {
		const products = await getProducts()
		return NextResponse.json(products)
	} catch (error) {
		console.error("Get products API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to retrieve products" }, { status: 500 })
	}
}
