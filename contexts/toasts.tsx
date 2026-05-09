"use client"

import { ToastContainer } from "@/components/ui/Toast"
import { IToastMessage } from "@/config/errors"
import { IToastContextType } from "@/interfaces/common"
import { createContext, ReactNode, useCallback, useContext, useState } from "react"

const ToastContext = createContext<IToastContextType | undefined>(undefined)

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider")
	}
	return context
}

interface ToastProviderProps {
	children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<IToastMessage[]>([])

	const addToast = useCallback((toast: Omit<IToastMessage, "id">) => {
		const id = Math.random().toString(36).substring(2, 9)
		const newToast: IToastMessage = {
			...toast,
			id,
			duration: toast.duration ?? 5000,
		}

		setToasts((prev) => [...prev, newToast])

		// Auto remove toast after duration
		setTimeout(() => {
			// eslint-disable-next-line react-hooks/immutability
			removeToast(id)
		}, newToast.duration)
	}, [])

	// eslint-disable-next-line react-hooks/preserve-manual-memoization
	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}, [])

	const showSuccess = useCallback(
		(message: string, duration?: number) => {
			addToast({ type: "success", message, duration })
		},
		[addToast],
	)

	const showError = useCallback(
		(message: string, duration?: number) => {
			addToast({ type: "error", message, duration })
		},
		[addToast],
	)

	const showWarning = useCallback(
		(message: string, duration?: number) => {
			addToast({ type: "warning", message, duration })
		},
		[addToast],
	)

	const showInfo = useCallback(
		(message: string, duration?: number) => {
			addToast({ type: "info", message, duration })
		},
		[addToast],
	)

	return (
		<ToastContext.Provider
			value={{
				toasts,
				addToast,
				removeToast,
				showSuccess,
				showError,
				showWarning,
				showInfo,
			}}
		>
			{children}
			<ToastContainer />
		</ToastContext.Provider>
	)
}
