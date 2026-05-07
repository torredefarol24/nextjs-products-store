import { updateProfile } from "@/lib/auth"
import { AppError } from "@/lib/errors"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
	try {
		const body = await request.json()
		const user = await updateProfile(body.currentEmail, {
			fullName: body.fullName,
			email: body.email,
		})
		return NextResponse.json({ user })
	} catch (error) {
		console.error("Update profile API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to update profile" }, { status: 500 })
	}
}
