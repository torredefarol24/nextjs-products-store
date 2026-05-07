"use client"

import { useToast } from "@/components/ui/Toast"
import { IChangePasswordData } from "@/interfaces/auth"
import { IUserProfileComponentProps, IUserProfileData } from "@/interfaces/profile"
import Image from "next/image"
import { useState } from "react"

export default function UserProfileComponent({
	user,
	onUpdate,
	onPasswordChange,
	isEditing: initialIsEditing = false,
}: IUserProfileComponentProps) {
	const { showSuccess, showError } = useToast()
	const [isEditing, setIsEditing] = useState(initialIsEditing)
	const [formData, setFormData] = useState<IUserProfileData>(user)
	const [isSaving, setIsSaving] = useState(false)
	const [passwordData, setPasswordData] = useState<IChangePasswordData>({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	})
	const [isPasswordSaving, setIsPasswordSaving] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const validateForm = (): boolean => {
		if (!formData.fullName?.trim()) {
			showError("Full name is required")
			return false
		}
		if (!formData.email?.trim()) {
			showError("Email is required")
			return false
		}
		if (!/\S+@\S+\.\S+/.test(formData.email)) {
			showError("Please enter a valid email address")
			return false
		}
		return true
	}

	const handleSave = async () => {
		if (!validateForm()) {
			return
		}

		setIsSaving(true)

		try {
			await onUpdate(formData)

			showSuccess("Profile updated successfully!")
			setIsEditing(false)
		} catch {
			showError("Failed to update profile")
		} finally {
			setIsSaving(false)
		}
	}

	const validatePasswordForm = (): boolean => {
		if (!passwordData.currentPassword) {
			showError("Current password is required")
			return false
		}
		if (!passwordData.newPassword) {
			showError("New password is required")
			return false
		}
		if (passwordData.newPassword.length < 6) {
			showError("New password must be at least 6 characters long")
			return false
		}
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			showError("New password and confirmation do not match")
			return false
		}
		return true
	}

	const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setPasswordData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handlePasswordSave = async () => {
		if (!validatePasswordForm()) {
			return
		}

		if (!onPasswordChange) {
			showError("Password update is not available")
			return
		}

		setIsPasswordSaving(true)

		try {
			await onPasswordChange(passwordData)
			showSuccess("Password updated successfully!")
			setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
		} catch {
			showError("Failed to update password")
		} finally {
			setIsPasswordSaving(false)
		}
	}

	const handlePasswordCancel = () => {
		setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
	}

	const avatarSrc =
		formData.avatar ||
		`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
			formData.fullName || "profile",
		)}`

	const handleCancel = () => {
		setFormData(user)
		setIsEditing(false)
	}

	return (
		<div className="max-w-7xl mx-auto">
			<div className="grid gap-8 xl:grid-cols-[1.25fr_0.95fr]">
				<div className="rounded-3xl border theme-border theme-surface p-8 shadow-sm">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-3xl font-bold theme-text">User Profile</h2>
					</div>

					{/* Avatar Section */}
					<div className="flex justify-center mb-8">
						<div className="w-32 h-32 rounded-full overflow-hidden border-4 theme-border shadow-md">
							<Image
								src={avatarSrc}
								alt={formData.fullName}
								width={128}
								height={128}
								className="w-full h-full object-cover"
								unoptimized
							/>
						</div>
					</div>

					{/* Profile Content */}
					{isEditing ? (
						// Edit Mode
						<div className="space-y-6">
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
									className="w-full rounded-xl border theme-border theme-surface px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your full name"
									disabled={isSaving}
								/>
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
									className="w-full rounded-xl border theme-border theme-surface px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your email"
									disabled={isSaving}
								/>
							</div>

							{/* Action Buttons */}
							<div className="flex gap-3 pt-4">
								<button
									onClick={handleSave}
									disabled={isSaving}
									className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition"
								>
									{isSaving ? "Saving..." : "Save Changes"}
								</button>
								<button
									onClick={handleCancel}
									disabled={isSaving}
									className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition"
								>
									Cancel
								</button>
							</div>
						</div>
					) : (
						// View Mode
						<div className="space-y-6">
							{/* Full Name Display */}
							<div className="space-y-2">
								<label className="block text-sm font-medium theme-text-muted">Full Name</label>
								<p className="text-lg theme-text font-medium">{formData.fullName}</p>
							</div>

							{/* Email Display */}
							<div className="space-y-2">
								<label className="block text-sm font-medium theme-text-muted">
									Email Address
								</label>
								<p className="text-lg theme-text font-medium break-all">{formData.email}</p>
							</div>

							{/* Additional Info */}
							<div className="flex justify-between items-center">
								<div className="pt-4 border-t theme-border">
									<p className="text-sm theme-text-muted">
										Last updated: {new Date().toLocaleDateString()}
									</p>
								</div>

								<div className="pt-4 border-t theme-border">
									{!isEditing && (
										<button
											onClick={() => setIsEditing(true)}
											className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
										>
											Edit Profile
										</button>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="rounded-3xl border theme-border theme-surface p-8 shadow-sm">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-3xl font-bold theme-text">Change Password</h2>
					</div>

					<div className="space-y-6">
						<div className="space-y-2">
							<label htmlFor="currentPassword" className="block text-sm font-medium theme-text">
								Current Password
							</label>
							<input
								type="password"
								id="currentPassword"
								name="currentPassword"
								value={passwordData.currentPassword}
								onChange={handlePasswordInputChange}
								className="w-full rounded-xl border theme-border theme-surface px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter current password"
								disabled={isPasswordSaving}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="newPassword" className="block text-sm font-medium theme-text">
								New Password
							</label>
							<input
								type="password"
								id="newPassword"
								name="newPassword"
								value={passwordData.newPassword}
								onChange={handlePasswordInputChange}
								className="w-full rounded-xl border theme-border theme-surface px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter new password"
								disabled={isPasswordSaving}
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="confirmPassword" className="block text-sm font-medium theme-text">
								Confirm New Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={passwordData.confirmPassword}
								onChange={handlePasswordInputChange}
								className="w-full rounded-xl border theme-border theme-surface px-4 py-3 theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Confirm new password"
								disabled={isPasswordSaving}
							/>
						</div>

						<div className="flex gap-3 pt-4">
							<button
								onClick={handlePasswordSave}
								disabled={isPasswordSaving}
								className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition"
							>
								{isPasswordSaving ? "Updating..." : "Update Password"}
							</button>
							<button
								onClick={handlePasswordCancel}
								disabled={isPasswordSaving}
								className="flex-1 bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition"
							>
								Reset
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
