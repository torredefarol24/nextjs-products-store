"use client"

import { ROUTES } from "@/config/constants"
import { AppError } from "@/config/errors"
import { useToast } from "@/contexts/toasts"
import { ILoginComponentProps, ILoginFormData } from "@/interfaces/auth"
import { useState } from "react"

export default function LoginComponent({ onLogin }: ILoginComponentProps) {
	const { showSuccess, showError } = useToast()
	const [formData, setFormData] = useState<ILoginFormData>({
		email: "",
		password: "",
	})

	const [errors, setErrors] = useState<Partial<ILoginFormData>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		// Clear error when user starts typing
		if (errors[name as keyof ILoginFormData]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = (): boolean => {
		const newErrors: Partial<ILoginFormData> = {}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email address"
		}

		if (!formData.password) {
			newErrors.password = "Password is required"
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
			await onLogin(formData)
			showSuccess("Login successful! Welcome back!")
			setFormData({
				email: "",
				password: "",
			})
		} catch (error) {
			console.error("Login error:", error)
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
		<div className="w-full max-w-md mx-auto">
			<div className="card card-lg p-8 sm:p-10 space-y-8">
				{/* Header */}
				<div className="space-y-3 text-center">
					<h2 className="text-3xl sm:text-4xl font-bold theme-text">Welcome Back</h2>
					<p className="theme-text-muted">Sign in to your account to continue shopping</p>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="space-y-5">
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
							className={`input-field ${errors.email ? "input-error" : ""}`}
							placeholder="you@example.com"
							disabled={isSubmitting}
						/>
						{errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
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
							className={`input-field ${errors.password ? "input-error" : ""}`}
							placeholder="••••••••"
							disabled={isSubmitting}
						/>
						{errors.password && (
							<p className="text-sm text-red-500 font-medium">{errors.password}</p>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn btn-primary w-full text-base mt-6"
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
								Signing In...
							</>
						) : (
							"Sign In"
						)}
					</button>
				</form>

				{/* Sign Up Link */}
				<div className="text-center pt-4 border-t theme-border-light">
					<p className="text-sm theme-text-muted">
						Don&apos;t have an account?{" "}
						<a
							href={ROUTES.signup}
							className="font-semibold theme-link hover:theme-text transition"
						>
							Sign up here
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}
