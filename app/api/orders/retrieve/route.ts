import { AppError } from "@/lib/errors"
import { getUserOrders } from "@/lib/orders"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const orders = await getUserOrders(body.userId)
		return NextResponse.json(orders)
	} catch (error) {
		console.error("Get orders API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to retrieve orders" }, { status: 500 })
	}
}
