"use client"

import { APIS } from "@/config/constants"
import { IAuthContextType, IChangePasswordData, ILoginData, IUser } from "@/interfaces/auth"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const AuthContext = createContext<IAuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const restoreSession = async () => {
			const email = window.localStorage.getItem("authEmail")
			if (!email) {
				setLoading(false)
				return
			}

			try {
				const response = await fetch(APIS.INTERNAL.getUser, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				})

				if (!response.ok) {
					window.localStorage.removeItem("authEmail")
					setUser(null)
					setLoading(false)
					return
				}

				const data = await response.json()
				setUser(data.user)
			} catch (error) {
				console.error("Failed to restore auth session:", error)
				window.localStorage.removeItem("authEmail")
			} finally {
				setLoading(false)
			}
		}

		restoreSession()
	}, [])

	const login = async (data: ILoginData) => {
		const response = await fetch(APIS.INTERNAL.login, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})

		const result = await response.json()
		if (!response.ok) {
			throw new Error(result.message || "Login failed")
		}

		setUser(result.user)
		window.localStorage.setItem("authEmail", result.user.email)
		return result.user
	}

	const logout = () => {
		setUser(null)
		window.localStorage.removeItem("authEmail")
	}

	const updateProfile = async (updateData: { fullName: string; email: string }) => {
		if (!user) {
			throw new Error("Not logged in")
		}

		const response = await fetch(APIS.INTERNAL.updateProfile, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				currentEmail: user.email,
				fullName: updateData.fullName,
				email: updateData.email,
			}),
		})

		const result = await response.json()
		if (!response.ok) {
			throw new Error(result.message || "Unable to update profile")
		}

		setUser(result.user)
		window.localStorage.setItem("authEmail", result.user.email)
		return result.user
	}

	const changePassword = async (passwordData: IChangePasswordData) => {
		if (!user) {
			throw new Error("Not logged in")
		}

		const response = await fetch(APIS.INTERNAL.changePassword, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				currentEmail: user.email,
				currentPassword: passwordData.currentPassword,
				newPassword: passwordData.newPassword,
				confirmPassword: passwordData.confirmPassword,
			}),
		})

		const result = await response.json()
		if (!response.ok) {
			throw new Error(result.message || "Unable to change password")
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, updateProfile, changePassword }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider")
	}
	return context
}
