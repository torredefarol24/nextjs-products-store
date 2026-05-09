import { AppError } from "@/config/errors"
import { loginUser } from "@/lib/auth"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

function signToken(user: { id: string; email: string; role?: string }) {
	const payload = {
		id: user.id,
		email: user.email,
		role: user.role || "user",
	}

	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" })
}

export async function POST(request: Request) {
	try {
		const data = await request.json()
		const user = await loginUser(data)
		const token = signToken(user)

		const response = NextResponse.json({ user })
		response.cookies.set("token", token, {
			httpOnly: true,
			sameSite: "strict",
		})
		return response
	} catch (error) {
		console.error("Login API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to login" }, { status: 500 })
	}
}
