"use client"

import { AppError } from "@/config/errors"
import { useToast } from "@/contexts/toasts"
import { ISignupComponentProps, ISignupData } from "@/interfaces/auth"
import { useState } from "react"

export default function SignupComponent({ onSignup }: ISignupComponentProps) {
	const { showSuccess, showError } = useToast()
	const [formData, setFormData] = useState<ISignupData>({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	const [errors, setErrors] = useState<Partial<ISignupData>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		if (errors[name as keyof ISignupData]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = (): boolean => {
		const newErrors: Partial<ISignupData> = {}

		if (!formData.fullName.trim()) {
			newErrors.fullName = "Full name is required"
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		if (!formData.password) {
			newErrors.password = "Password is required"
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters long"
		}

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password"
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match"
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)

		try {
			await onSignup(formData)
			showSuccess("Account created successfully! Welcome aboard!")
			setFormData({
				fullName: "",
				email: "",
				password: "",
				confirmPassword: "",
			})
		} catch (error) {
			console.error("Signup error:", error)

			// Show error message
			if (error instanceof AppError) {
				showError(error.message)
			} else if (error instanceof Error) {
				showError(error.message || "An unexpected error occurred")
			} else {
				showError("An unexpected error occurred")
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className="mx-auto max-w-md rounded-3xl border theme-border theme-surface p-8 shadow-sm">
			<div className="mb-8 text-center">
				<h2 className="text-3xl font-bold theme-text">Create Account</h2>
				<p className="mt-2 theme-text-muted">Join us to start shopping with exclusive deals</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Full Name Field */}
				<div className="space-y-2">
					<label htmlFor="fullName" className="block text-sm font-medium theme-text">
						Full Name
					</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={formData.fullName}
						onChange={handleInputChange}
						className={`w-full rounded-xl border px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
							errors.fullName ? "border-red-500 theme-surface" : "theme-border theme-surface"
						}`}
						placeholder="Enter your full name"
						disabled={isSubmitting}
					/>
					{errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
				</div>

				{/* Email Field */}
				<div className="space-y-2">
					<label htmlFor="email" className="block text-sm font-medium theme-text">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className={`w-full rounded-xl border px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
							errors.email ? "border-red-500 theme-surface" : "theme-border theme-surface"
						}`}
						placeholder="Enter your email"
						disabled={isSubmitting}
					/>
					{errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
				</div>

				{/* Password Field */}
				<div className="space-y-2">
					<label htmlFor="password" className="block text-sm font-medium theme-text">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						className={`w-full rounded-xl border px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
							errors.password ? "border-red-500 theme-surface" : "theme-border theme-surface"
						}`}
						placeholder="Create a password"
						disabled={isSubmitting}
					/>
					{errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
					<p className="text-xs theme-text-muted">
						Password must be at least 6 characters long
					</p>
				</div>

				{/* Confirm Password Field */}
				<div className="space-y-2">
					<label htmlFor="confirmPassword" className="block text-sm font-medium theme-text">
						Confirm Password
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleInputChange}
						className={`w-full rounded-xl border px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
							errors.confirmPassword
								? "border-red-500 theme-surface"
								: "theme-border theme-surface"
						}`}
						placeholder="Confirm your password"
						disabled={isSubmitting}
					/>
					{errors.confirmPassword && (
						<p className="text-sm text-red-600">{errors.confirmPassword}</p>
					)}
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
				>
					{isSubmitting ? (
						<>
							<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Creating Account...
						</>
					) : (
						"Sign Up"
					)}
				</button>
			</form>

			{/* Additional Links */}
			<div className="mt-8 text-center">
				<p className="text-sm theme-text-muted">
					Already have an account?{" "}
					<a href="/login" className="theme-link hover:theme-text transition">
						Sign in here
					</a>
				</p>
			</div>
		</div>
	)
}
