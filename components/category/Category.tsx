import { ICategory } from "@/interfaces/paltform"

export default function Category({ name, count }: ICategory) {
	return (
		<div
			key={name}
			className="rounded-2xl theme-border theme-surface border p-6 transition hover:shadow-md"
		>
			<h3 className="text-lg font-semibold theme-text">{name}</h3>
			<p className="mt-2 theme-text-muted">{count} products</p>
			<button className="mt-4 inline-flex items-center text-sm font-medium theme-link transition">
				Browse Category →
			</button>
		</div>
	)
}
