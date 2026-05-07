export interface ISignupData {
	fullName: string
	email: string
	password: string
	confirmPassword?: string
}

export interface LoginData {
	email: string
	password: string
}

export interface IUser {
	id: string
	fullName: string
	email: string
	avatar?: string
}

export interface ISignupComponentProps {
	onSignup: (data: ISignupData) => void
}

export interface ILoginFormData {
	email: string
	password: string
}

export interface ILoginComponentProps {
	onLogin: (data: ILoginFormData) => void
}

export interface IChangePasswordData {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

export interface IAuthContextType {
	user: IUser | null
	loading: boolean
	login: (data: LoginData) => Promise<IUser>
	logout: () => void
	updateProfile: (data: { fullName: string; email: string }) => Promise<IUser>
	changePassword: (data: IChangePasswordData) => Promise<void>
}
