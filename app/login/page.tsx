"use client"

import LoginComponent from "@/components/auth/Login"
import { APP_ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { LoginData } from "@/interfaces/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
	const { login } = useAuth()
	const router = useRouter()

	useEffect(() => {
		document.title = "Login"
	}, [])

	const handleLogin = async (data: LoginData) => {
		await login(data)
		router.push(APP_ROUTES.home)
	}

	return (
		<div className="min-h-screen flex items-center justify-center theme-surface px-4 py-12">
			<LoginComponent onLogin={handleLogin} />
		</div>
	)
}
