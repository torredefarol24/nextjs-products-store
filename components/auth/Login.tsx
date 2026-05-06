"use client"

import { useToast } from "@/components/ui/Toast"
import { AppError } from "@/lib/errors"
import { useState } from "react"

interface LoginFormData {
	email: string
	password: string
}

interface LoginComponentProps {
	onLogin?: (data: LoginFormData) => void
}

export default function LoginComponent({ onLogin }: LoginComponentProps) {
	const { showSuccess, showError } = useToast()
	const [formData, setFormData] = useState<LoginFormData>({
		email: "",
		password: "",
	})

	const [errors, setErrors] = useState<Partial<LoginFormData>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		// Clear error when user starts typing
		if (errors[name as keyof LoginFormData]) {
			setErrors((prev) => ({
				...prev,
				[name]: "",
			}))
		}
	}

	const validateForm = (): boolean => {
		const newErrors: Partial<LoginFormData> = {}

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
			// Call the onLogin callback if provided
			if (onLogin) {
				await onLogin(formData)
			}

			// Show success message
			showSuccess("Login successful! Welcome back!")

			// Reset form on success
			setFormData({
				email: "",
				password: "",
			})
		} catch (error) {
			console.error("Login error:", error)

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
				<h2 className="text-3xl font-bold theme-text">Welcome Back</h2>
				<p className="mt-2 theme-text-muted">Sign in to your account to continue shopping</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
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
						placeholder="Enter your password"
						disabled={isSubmitting}
					/>
					{errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Signing In..." : "Sign In"}
				</button>
			</form>

			{/* Additional Links */}
			<div className="mt-8 text-center">
				<p className="text-sm theme-text-muted">
					Don&apos;t have an account?{" "}
					<a href="/signup" className="theme-link hover:theme-text transition">
						Sign up here
					</a>
				</p>
			</div>
		</div>
	)
}
