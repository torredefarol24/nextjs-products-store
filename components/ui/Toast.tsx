"use client"

import { useToast } from "@/contexts/toasts"
import { IToastProps } from "@/interfaces/common"

export function ToastContainer() {
	const { toasts, removeToast } = useToast()

	return (
		<div className="fixed top-4 right-4 z-50 space-y-2">
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} onRemove={removeToast} />
			))}
		</div>
	)
}

export function Toast({ toast, onRemove }: IToastProps) {
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
