"use client"

import LoginComponent from "@/components/auth/Login"
import { LoginData } from "@/interfaces/auth"
import { loginUser } from "@/lib/auth"

export default function LoginPage() {
	const handleLogin = async (data: LoginData) => {
		const result = await loginUser(data)
		return result
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
			<LoginComponent onLogin={handleLogin} />
		</div>
	)
}
