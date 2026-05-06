"use client"

import SignupComponent from "@/components/auth/Signup"
import { ISignupData } from "@/interfaces/auth"
import { createUser } from "@/lib/auth"

export default function SignupPage() {
	async function handleSignup(data: ISignupData) {
		// Here you would typically send the data to your backend API
		console.log("Signup data:", data)

		await createUser(data)

		// For demo purposes, just log the data
		// alert(`Welcome ${data.fullName}! Your account has been created.`)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
			<SignupComponent onSignup={handleSignup} />
		</div>
	)
}
