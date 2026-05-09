import { JwtPayload, verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function getCurrentUser() {
	const cookieStore = await cookies()
	const token = cookieStore.get("token")?.value

	if (!token) {
		return null
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload

		return {
			id: decoded.id,
			email: decoded.email,
			role: decoded.role,
		}
	} catch {
		return null
	}
}
