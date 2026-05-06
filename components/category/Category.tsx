import { ICategory } from "@/interfaces/platform"
import Link from "next/link"

export default function Category({ categoryId, name, count }: ICategory) {
	return (
		<div className="rounded-2xl theme-border theme-surface border p-6 transition hover:shadow-md">
			<h3 className="text-lg font-semibold theme-text">{name}</h3>
			<p className="mt-2 theme-text-muted">{count} products</p>
			<Link
				className="mt-4 inline-flex items-center text-sm font-medium theme-link transition"
				href={`/category/${categoryId}`}
			>
				Browse Category →
			</Link>
		</div>
	)
}
