import { AppError } from "@/config/errors"
import { changePassword } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
	try {
		const body = await request.json()
		await changePassword(
			body.currentEmail,
			body.currentPassword,
			body.newPassword,
			body.confirmPassword,
		)

		return NextResponse.json({ message: "Password changed successfully" })
	} catch (error) {
		console.error("Change password API error:", error)
		if (error instanceof AppError) {
			return NextResponse.json({ message: error.message }, { status: error.statusCode || 400 })
		}
		return NextResponse.json({ message: "Unable to change password" }, { status: 500 })
	}
}
