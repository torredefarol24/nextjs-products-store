"use client"

import SettingsComponent from "@/components/settings/Settings"
import Loader from "@/components/ui/Loader"
import { ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { IChangePasswordData } from "@/interfaces/auth"
import { IUserProfileData } from "@/interfaces/settings"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SettingsPage() {
	const { user, updateProfile, changePassword, loading, logout } = useAuth()
	const router = useRouter()

	useEffect(() => {
		document.title = "Settings"
	}, [])

	if (loading) {
		return (
			<Loader message="Loading profile..." fullScreen className="bg-gray-50 theme-surface" />
		)
	}

	if (!user) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 theme-surface px-4 py-12 text-center">
				<p className="text-lg theme-text">You need to be signed in to view your profile.</p>
				<Link
					href={ROUTES.login}
					className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
				>
					Sign In
				</Link>
			</div>
		)
	}

	const handleProfileUpdate = async (data: IUserProfileData) => {
		await updateProfile({
			fullName: data.fullName,
			email: data.email,
		})
	}

	const handlePasswordChange = async (data: IChangePasswordData) => {
		await changePassword(data)
		setTimeout(async () => {
			await logout()
			router.push(ROUTES.login)
		}, 2000)
	}

	return (
		<div className="min-h-screen theme-surface py-12 px-4">
			<SettingsComponent
				user={user}
				onUpdate={handleProfileUpdate}
				onPasswordChange={handlePasswordChange}
			/>
		</div>
	)
}
