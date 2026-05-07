"use client"

import { APP_ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { useRouter } from "next/navigation"

export default function SignoutButton() {
	const { logout } = useAuth()
	const router = useRouter()

	const handleSignOut = () => {
		logout()
		router.push(APP_ROUTES.home)
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
