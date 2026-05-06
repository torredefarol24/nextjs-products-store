"use client"

import { ToastMessage } from "@/lib/errors"
import { createContext, ReactNode, useCallback, useContext, useState } from "react"

interface ToastContextType {
	toasts: ToastMessage[]
	addToast: (message: Omit<ToastMessage, "id">) => void
	removeToast: (id: string) => void
	showSuccess: (message: string, duration?: number) => void
	showError: (message: string, duration?: number) => void
	showWarning: (message: string, duration?: number) => void
	showInfo: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

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
	const [toasts, setToasts] = useState<ToastMessage[]>([])

	const addToast = useCallback((toast: Omit<ToastMessage, "id">) => {
		const id = Math.random().toString(36).substring(2, 9)
		const newToast: ToastMessage = {
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

function ToastContainer() {
	const { toasts, removeToast } = useToast()

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} onRemove={removeToast} />
			))}
		</div>
	)
}

interface ToastProps {
	toast: ToastMessage
	onRemove: (id: string) => void
}

function Toast({ toast, onRemove }: ToastProps) {
	const getToastStyles = () => {
		switch (toast.type) {
			case "success":
				return "bg-green-500 text-white"
			case "error":
				return "bg-red-500 text-white"
			case "warning":
				return "bg-yellow-500 text-black"
			case "info":
				return "bg-blue-500 text-white"
			default:
				return "bg-gray-500 text-white"
		}
	}

	return (
		<div
			className={`${getToastStyles()} px-4 py-3 rounded-lg shadow-lg max-w-sm flex items-center justify-between`}
		>
			<span className="text-sm font-medium">{toast.message}</span>
			<button onClick={() => onRemove(toast.id)} className="ml-4 text-current hover:opacity-75">
				×
			</button>
		</div>
	)
}
