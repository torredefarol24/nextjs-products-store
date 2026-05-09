import { ROUTES } from "@/config/constants"
import { ICategory } from "@/interfaces/category"
import Link from "next/link"

export default function Category({ name, slug }: ICategory) {
	const firstLetter = name.charAt(0).toUpperCase()

	return (
		<div className="group relative rounded-2xl theme-border theme-surface border p-6 transition-all duration-300 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 cursor-pointer overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Content */}
			<div className="relative z-10">
				{/* Avatar */}
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
						{firstLetter}
					</div>
					<div className="flex-1">
						<h3 className="text-lg font-semibold theme-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
							{name}
						</h3>
					</div>
				</div>

				{/* Link */}
				<Link
					className="inline-flex items-center gap-2 text-sm font-medium theme-link group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200 group-hover:gap-3"
					href={ROUTES.productByCategory(slug)}
				>
					<span>Shop {name} products</span>
					<svg
						className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
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
