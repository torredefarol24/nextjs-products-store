export interface IUserProfileData {
	fullName: string
	email: string
	avatar?: string
}

import { IChangePasswordData } from "@/interfaces/auth"

export interface IUserProfileComponentProps {
	user: IUserProfileData
	onUpdate: (data: IUserProfileData) => void
	onPasswordChange?: (data: IChangePasswordData) => Promise<void>
	isEditing?: boolean
}
