"use client"

import SignupComponent from "@/components/auth/Signup"
import { ROUTES } from "@/config/constants"
import { ISignupData } from "@/interfaces/auth"
import { createUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
	const router = useRouter()

	useEffect(() => {
		document.title = "Signup"
	}, [])

	const handleSignup = async (data: ISignupData) => {
		await createUser(data)
		router.push(ROUTES.home)
	}

	return (
		<div className="min-h-screen flex items-center justify-center theme-surface px-4 py-12">
			<SignupComponent onSignup={handleSignup} />
		</div>
	)
}
