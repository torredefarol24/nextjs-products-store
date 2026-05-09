import { AppError } from "@/lib/errors"
import { deleteOrder } from "@/lib/orders"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
	try {
		const body = await request.json()
		const userId = body.userId
		const orderId = body.orderId
		const result = await deleteOrder(userId, orderId)
		return NextResponse.json(result)
	} catch (error) {
		console.error("Delete order API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to delete order" }, { status: 500 })
	}
}
