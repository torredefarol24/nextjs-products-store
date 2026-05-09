import { AppError } from "@/config/errors"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	try {
		const cookieStore = await cookies()
		cookieStore.delete("token")
		return NextResponse.json({ message: "Logged out successfully" })
	} catch (error) {
		console.error("Logout API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to logout" }, { status: 500 })
	}
}
