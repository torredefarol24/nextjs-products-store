import { AppError, DatabaseError, NetworkError, ValidationError } from "@/config/errors"

export async function withErrorHandling<T>(
	operation: () => Promise<T>,
	context?: string,
): Promise<T> {
	try {
		return await operation()
	} catch (error) {
		console.error(`Error in ${context || "operation"}:`, error)

		// Re-throw AppError instances as-is
		if (error instanceof AppError) {
			throw error
		}

		// Convert other errors to appropriate AppError types
		if (error instanceof TypeError && error.message.includes("fetch")) {
			throw new NetworkError(`Network request failed: ${error.message}`)
		}

		if (error instanceof Error) {
			// Check for specific error patterns
			if (error.message.includes("validation") || error.message.includes("required")) {
				throw new ValidationError(error.message)
			}

			if (error.message.includes("database") || error.message.includes("MongoDB")) {
				throw new DatabaseError(error.message)
			}

			// Generic error
			throw new AppError(error.message, "UNKNOWN_ERROR", 500)
		}

		// Unknown error type
		throw new AppError("An unexpected error occurred", "UNKNOWN_ERROR", 500)
	}
}

export function handleApiError(error: unknown): AppError {
	if (error instanceof AppError) {
		return error
	}

	if (error instanceof Error) {
		// Handle HTTP response errors
		if ("status" in error) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const httpError = error as any
			switch (httpError.status) {
				case 400:
					return new ValidationError(httpError.message || "Bad request")
				case 401:
					return new AppError(httpError.message || "Unauthorized", "AUTH_ERROR", 401)
				case 403:
					return new AppError(httpError.message || "Forbidden", "FORBIDDEN", 403)
				case 404:
					return new AppError(httpError.message || "Not found", "NOT_FOUND", 404)
				case 500:
					return new AppError(httpError.message || "Internal server error", "SERVER_ERROR", 500)
				default:
					return new AppError(
						httpError.message || "Request failed",
						"HTTP_ERROR",
						httpError.status,
					)
			}
		}

		// Handle network errors
		if (error.message.includes("fetch") || error.message.includes("network")) {
			return new NetworkError(error.message)
		}

		return new AppError(error.message, "UNKNOWN_ERROR", 500)
	}

	return new AppError("An unexpected error occurred", "UNKNOWN_ERROR", 500)
}

export function logError(error: AppError | Error, context?: string) {
	const errorInfo = {
		message: error.message,
		name: error.name,
		stack: error.stack,
		context,
		timestamp: new Date().toISOString(),
		...(error instanceof AppError && {
			code: error.code,
			statusCode: error.statusCode,
			details: error.details,
		}),
	}

	console.error("Logged Error:", errorInfo)

	// In a real app, you would send this to a logging service
	// sendToLoggingService(errorInfo)
}
