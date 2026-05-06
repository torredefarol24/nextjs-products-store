"use server"

import { TABLES } from "@/config/constants"
import { ISignupData, LoginData } from "@/interfaces/auth"
import { withErrorHandling } from "@/lib/errorUtils"
import { AuthenticationError, DatabaseError, ValidationError } from "@/lib/errors"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"

const uri = process.env.MONGODB_URI as string
const dbName = uri.split("/").pop() || "test"

export async function createUser(signupData: ISignupData) {
	return withErrorHandling(async () => {
		const { fullName, email, password } = signupData

		// Validate input
		if (!fullName?.trim()) {
			throw new ValidationError("Full name is required")
		}
		if (!email?.trim()) {
			throw new ValidationError("Email is required")
		}
		if (!password) {
			throw new ValidationError("Password is required")
		}
		if (password.length < 6) {
			throw new ValidationError("Password must be at least 6 characters long")
		}

		// Check if user already exists
		const client = await clientPromise
		const db = client.db(dbName)

		const existingUser = await db.collection(TABLES.users).findOne({ email })
		if (existingUser) {
			throw new ValidationError("User with this email already exists")
		}

		// Hash password
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		// Create user
		const result = await db.collection(TABLES.users).insertOne({
			fullName,
			email,
			password: hashedPassword,
			createdAt: new Date(),
		})

		if (!result.acknowledged) {
			throw new DatabaseError("Failed to create user")
		}

		return {
			id: result.insertedId,
			fullName,
			email,
		}
	}, "createUser")
}

export async function loginUser(loginData: LoginData) {
	return withErrorHandling(async () => {
		const { email, password } = loginData

		// Validate input
		if (!email?.trim()) {
			throw new ValidationError("Email is required")
		}
		if (!password) {
			throw new ValidationError("Password is required")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		// Find user
		const user = await db.collection(TABLES.users).findOne({ email })
		if (!user) {
			throw new AuthenticationError("Invalid email or password")
		}

		// Verify password
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new AuthenticationError("Invalid email or password")
		}

		// Return user data (excluding password)
		return {
			id: user._id,
			fullName: user.fullName,
			email: user.email,
		}
	}, "loginUser")
}
