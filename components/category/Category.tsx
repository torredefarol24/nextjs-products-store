import { APP_ROUTES } from "@/config/constants"
import { ICategory } from "@/interfaces/category"
import Link from "next/link"

export default function Category({ name, slug }: ICategory) {
	return (
		<div className="rounded-2xl theme-border theme-surface border p-6 transition hover:shadow-md">
			<h3 className="text-lg font-semibold theme-text">{name}</h3>
			<Link
				className="mt-4 inline-flex items-center text-sm font-medium theme-link transition"
				href={APP_ROUTES.productByCategory(slug)}
			>
				Shop {name} products →
			</Link>
		</div>
	)
}
