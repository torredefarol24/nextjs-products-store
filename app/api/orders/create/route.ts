import { AppError } from "@/lib/errors"
import { createOrder } from "@/lib/orders"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const userId = body.userId
		const orderData = body.orderData
		const productData = body.productData
		const newOrder = await createOrder(userId, { orderData, productData })
		return NextResponse.json({ order: newOrder })
	} catch (error) {
		console.error("Create order API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to create order" }, { status: 500 })
	}
}
