"use client"

import { useToast } from "@/components/ui/Toast"
import { AppError, NetworkError, ValidationError } from "@/lib/errors"
import { useState } from "react"

export default function ErrorHandlingDemo() {
	const { showSuccess, showError, showWarning, showInfo } = useToast()
	const [isLoading, setIsLoading] = useState(false)

	const simulateSuccess = async () => {
		setIsLoading(true)
		try {
			// Simulate successful operation
			await new Promise((resolve) => setTimeout(resolve, 1000))
			showSuccess("Operation completed successfully!")
		} catch (error) {
			showError("Unexpected error occurred")
		} finally {
			setIsLoading(false)
		}
	}

	const simulateValidationError = async () => {
		setIsLoading(true)
		try {
			await new Promise((resolve) => setTimeout(resolve, 500))
			throw new ValidationError("This is a validation error example")
		} catch (error) {
			if (error instanceof AppError) {
				showError(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const simulateNetworkError = async () => {
		setIsLoading(true)
		try {
			await new Promise((resolve) => setTimeout(resolve, 500))
			throw new NetworkError("Failed to connect to server")
		} catch (error) {
			if (error instanceof AppError) {
				showError(error.message)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const simulateGenericError = async () => {
		setIsLoading(true)
		try {
			await new Promise((resolve) => setTimeout(resolve, 500))
			throw new Error("Something went wrong!")
		} catch (error) {
			showError(error instanceof Error ? error.message : "Unknown error")
		} finally {
			setIsLoading(false)
		}
	}

	const showAllToastTypes = () => {
		showSuccess("This is a success message")
		setTimeout(() => showError("This is an error message"), 1000)
		setTimeout(() => showWarning("This is a warning message"), 2000)
		setTimeout(() => showInfo("This is an info message"), 3000)
	}

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-6">
			<div className="text-center">
				<h1 className="text-3xl font-bold theme-text mb-2">Error Handling Demo</h1>
				<p className="theme-text-muted">
					Test the comprehensive error handling system implemented in this app
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<button
					onClick={simulateSuccess}
					disabled={isLoading}
					className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition"
				>
					{isLoading ? "Processing..." : "Simulate Success"}
				</button>

				<button
					onClick={simulateValidationError}
					disabled={isLoading}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition"
				>
					{isLoading ? "Processing..." : "Simulate Validation Error"}
				</button>

				<button
					onClick={simulateNetworkError}
					disabled={isLoading}
					className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-3 px-4 rounded-lg transition"
				>
					{isLoading ? "Processing..." : "Simulate Network Error"}
				</button>

				<button
					onClick={simulateGenericError}
					disabled={isLoading}
					className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-3 px-4 rounded-lg transition"
				>
					{isLoading ? "Processing..." : "Simulate Generic Error"}
				</button>
			</div>

			<div className="text-center">
				<button
					onClick={showAllToastTypes}
					className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition"
				>
					Show All Toast Types
				</button>
			</div>

			<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
				<h3 className="font-semibold theme-text mb-2">Error Handling Features:</h3>
				<ul className="text-sm theme-text-muted space-y-1">
					<li>• Custom error classes (AppError, ValidationError, NetworkError, etc.)</li>
					<li>• Global error boundary for React components</li>
					<li>• Toast notifications for user feedback</li>
					<li>• Centralized error handling utilities</li>
					<li>• Proper error logging and context</li>
					<li>• Type-safe error handling throughout the app</li>
				</ul>
			</div>
		</div>
	)
}
