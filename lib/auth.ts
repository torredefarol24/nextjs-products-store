"use server"

import { TABLES } from "@/config/constants"
import { ISignupData, LoginData } from "@/interfaces/auth"
import { withErrorHandling } from "@/lib/errorUtils"
import { AuthenticationError, DatabaseError, ValidationError } from "@/lib/errors"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"
import { cookies } from "next/headers"

const uri = process.env.MONGODB_URI as string
const dbName = uri.split("/").pop() || "test"

export async function getCurrentUser() {
	const cookieStore = await cookies()
	const token = cookieStore.get("token")?.value

	if (!token) {
		return null
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

		return {
			id: decoded.id,
			email: decoded.email,
			role: decoded.role,
		}
	} catch {
		return null
	}
}

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
			id: result.insertedId.toString(),
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
			id: user._id.toString(),
			fullName: user.fullName,
			email: user.email,
		}
	}, "loginUser")
}

export async function updateProfile(
	userEmail: string,
	updateData: { fullName: string; email: string },
) {
	return withErrorHandling(async () => {
		const { fullName, email } = updateData

		// Validate input
		if (!fullName?.trim()) {
			throw new ValidationError("Full name is required")
		}
		if (!email?.trim()) {
			throw new ValidationError("Email is required")
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			throw new ValidationError("Please enter a valid email address")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		// If email is being changed, check if new email already exists
		if (email !== userEmail) {
			const existingUser = await db.collection(TABLES.users).findOne({ email })
			if (existingUser) {
				throw new ValidationError("Email is already in use by another account")
			}
		}

		// Find the user by current email
		const user = await db.collection(TABLES.users).findOne({ email: userEmail })
		if (!user) {
			throw new ValidationError("User not found")
		}

		// Update user profile
		const result = await db.collection(TABLES.users).updateOne(
			{ email: userEmail },
			{
				$set: {
					fullName,
					email,
					updatedAt: new Date(),
				},
			},
		)

		if (!result.acknowledged) {
			throw new DatabaseError("Failed to update profile")
		}

		// Return updated user data
		return {
			id: user._id.toString(),
			fullName,
			email,
		}
	}, "updateProfile")
}

export async function changePassword(
	userEmail: string,
	currentPassword: string,
	newPassword: string,
	confirmPassword: string,
) {
	return withErrorHandling(async () => {
		if (!currentPassword) {
			throw new ValidationError("Current password is required")
		}
		if (!newPassword) {
			throw new ValidationError("New password is required")
		}
		if (newPassword.length < 6) {
			throw new ValidationError("New password must be at least 6 characters long")
		}
		if (newPassword !== confirmPassword) {
			throw new ValidationError("New password and confirmation do not match")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await db.collection(TABLES.users).findOne({ email: userEmail })
		if (!user) {
			throw new ValidationError("User not found")
		}

		const isValidPassword = await bcrypt.compare(currentPassword, user.password)
		if (!isValidPassword) {
			throw new AuthenticationError("Current password is incorrect")
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(newPassword, salt)

		const result = await db.collection(TABLES.users).updateOne(
			{ email: userEmail },
			{
				$set: {
					password: hashedPassword,
					updatedAt: new Date(),
				},
			},
		)

		if (!result.acknowledged) {
			throw new DatabaseError("Failed to update password")
		}

		return {
			message: "Password updated successfully",
		}
	}, "changePassword")
}

export async function getUserByEmail(email: string) {
	return withErrorHandling(async () => {
		if (!email?.trim()) {
			throw new ValidationError("Email is required")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await db.collection(TABLES.users).findOne({ email })
		if (!user) {
			throw new ValidationError("User not found")
		}

		return {
			id: user._id.toString(),
			fullName: user.fullName,
			email: user.email,
		}
	}, "getUserByEmail")
}

export async function getUserById(userId: string) {
	return withErrorHandling(async () => {
		if (!userId?.trim()) {
			throw new ValidationError("User ID is required")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await db.collection(TABLES.users).findOne({ _id: new ObjectId(userId) })
		if (!user) {
			throw new ValidationError("User not found")
		}

		return {
			id: user._id.toString(),
			fullName: user.fullName,
			email: user.email,
		}
	}, "getUserById")
}
