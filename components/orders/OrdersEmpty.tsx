import { ROUTES } from "@/config/constants"
import Link from "next/link"

export function OrderEmpty() {
	return (
		<div className="min-h-screen bg-gray-50 theme-surface flex items-center justify-center p-6">
			<div className="text-center max-w-md mx-auto">
				<div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg
						className="w-12 h-12 text-blue-600 dark:text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={1.5}
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
				</div>
				<h2 className="text-2xl font-bold theme-text mb-2">No Orders Yet</h2>
				<p className="theme-text-muted mb-6">
					You haven't placed any orders yet. Start shopping to see your orders here!
				</p>
				<Link
					href={ROUTES.products}
					className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					Start Shopping
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</Link>
			</div>
		</div>
	)
}
