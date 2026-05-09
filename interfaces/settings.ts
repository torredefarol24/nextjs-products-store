import { IChangePasswordData } from "@/interfaces/auth"
export interface IUserProfileData {
	fullName: string
	email: string
	avatar?: string
}

export interface ISettingsComponentProps {
	user: IUserProfileData
	onUpdate: (data: IUserProfileData) => void
	onPasswordChange?: (data: IChangePasswordData) => Promise<void>
	onDeleteAccount?: () => Promise<void>
	isEditing?: boolean
}
