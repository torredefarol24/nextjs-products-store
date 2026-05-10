import { ROUTES } from "@/config/constants"
import { ICategory } from "@/interfaces/category"
import Link from "next/link"

export default function Category({ name, slug }: ICategory) {
	const categoryIcons: Record<string, string> = {
		beauty: "💄",
		fragrances: "🌹",
		furniture: "🪑",
		groceries: "🛒",
		"home-decoration": "🏠",
		"kitchen-accessories": "🍴",
		laptops: "💻",
		menswear: "👔",
		motorcycle: "🏍️",
		phones: "📱",
		shoes: "👟",
		sports: "⚽",
		sunglasses: "🕶️",
		tablets: "📱",
		tops: "👕",
		vehicle: "🚗",
		watches: "⌚",
		womendresses: "👗",
		womenswear: "👩‍🦰",
	}

	const icon = categoryIcons[slug.toLowerCase()] || "🏷️"

	return (
		<Link href={ROUTES.productByCategory(slug)}>
			<div className="group relative overflow-hidden rounded-2xl card card-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
				{/* Background gradient on hover */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				{/* Content */}
				<div className="relative z-10 space-y-4">
					{/* Icon */}
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
						{icon}
					</div>

					{/* Name */}
					<div>
						<h3 className="text-xl font-bold theme-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
							{name}
						</h3>
					</div>

					{/* Link with arrow */}
					<div className="flex items-center gap-2 text-sm font-semibold theme-link group-hover:gap-3 transition-all duration-200">
						<span>Explore {name}</span>
						<svg
							className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
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
					</div>
				</div>

				{/* Decorative element */}
				<div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
			</div>
		</Link>
	)
}
