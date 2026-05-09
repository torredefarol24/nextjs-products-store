import { AppError } from "@/config/errors"
import { getUserByEmail } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const user = await getUserByEmail(body.email)
		return NextResponse.json({ user })
	} catch (error) {
		console.error("Get user API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to retrieve user" }, { status: 500 })
	}
}
