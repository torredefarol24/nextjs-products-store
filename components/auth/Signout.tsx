"use client"

import { ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { useRouter } from "next/navigation"

export default function SignoutButton() {
	const { logout } = useAuth()
	const router = useRouter()

	const handleSignOut = async () => {
		await logout()
		router.push(ROUTES.home)
	}

	return (
		<button
			type="button"
			onClick={handleSignOut}
			className="theme-button inline-flex h-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition"
		>
			Sign Out
		</button>
	)
}
