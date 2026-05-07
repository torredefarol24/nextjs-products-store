import { loginUser } from "@/lib/auth"
import { AppError } from "@/lib/errors"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const data = await request.json()
		const user = await loginUser(data)
		return NextResponse.json({ user })
	} catch (error) {
		console.error("Login API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to login" }, { status: 500 })
	}
}
