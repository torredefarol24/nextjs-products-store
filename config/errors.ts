/* eslint-disable @typescript-eslint/no-explicit-any */
export class AppError extends Error {
	constructor(
		message: string,
		public code?: string,
		public statusCode?: number,
		public details?: any,
	) {
		super(message)
		this.name = "AppError"
	}
}

export class ValidationError extends AppError {
	constructor(message: string, details?: any) {
		super(message, "VALIDATION_ERROR", 400, details)
		this.name = "ValidationError"
	}
}

export class AuthenticationError extends AppError {
	constructor(message: string = "Authentication failed") {
		super(message, "AUTH_ERROR", 401)
		this.name = "AuthenticationError"
	}
}

export class NetworkError extends AppError {
	constructor(message: string = "Network request failed") {
		super(message, "NETWORK_ERROR", 0)
		this.name = "NetworkError"
	}
}

export class DatabaseError extends AppError {
	constructor(message: string = "Database operation failed") {
		super(message, "DB_ERROR", 500)
		this.name = "DatabaseError"
	}
}

export interface IErrorState {
	hasError: boolean
	error?: AppError | Error
	message?: string
}

export interface IToastMessage {
	id: string
	type: "success" | "error" | "warning" | "info"
	message: string
	duration?: number
}
