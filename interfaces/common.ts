import { IToastMessage } from "@/config/errors"

export interface SearchProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	placeholder?: string
}

export type ThemeType = "light" | "dark"

export interface IThemeContextType {
	theme: ThemeType
	toggleTheme: () => void
}

export interface IToastProps {
	toast: IToastMessage
	onRemove: (id: string) => void
}

export interface IToastContextType {
	toasts: IToastMessage[]
	addToast: (message: Omit<IToastMessage, "id">) => void
	removeToast: (id: string) => void
	showSuccess: (message: string, duration?: number) => void
	showError: (message: string, duration?: number) => void
	showWarning: (message: string, duration?: number) => void
	showInfo: (message: string, duration?: number) => void
}
