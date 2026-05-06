export function CategoryListComponent() {
	const categories = [
		{ name: "Electronics", count: 24 },
		{ name: "Clothing", count: 18 },
		{ name: "Home & Garden", count: 32 },
		{ name: "Sports & Outdoors", count: 15 },
		{ name: "Books & Media", count: 28 },
		{ name: "Toys & Games", count: 21 },
	]

	return (
		<section className="mx-auto max-w-6xl rounded-3xl border theme-border theme-surface p-6 shadow-sm sm:p-8">
			<h2 className="text-3xl font-semibold theme-text">Product Categories</h2>
			<p className="mt-3 theme-text-muted">
				Browse our curated selection of product categories to find exactly what you&apos;re
				looking for.
			</p>

			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((category) => (
					<div
						key={category.name}
						className="rounded-2xl theme-border theme-surface border p-6 transition hover:shadow-md"
					>
						<h3 className="text-lg font-semibold theme-text">{category.name}</h3>
						<p className="mt-2 theme-text-muted">{category.count} products</p>
						<button className="mt-4 inline-flex items-center text-sm font-medium theme-link transition">
							Browse Category →
						</button>
					</div>
				))}
			</div>

			<div className="mt-8 rounded-2xl theme-border theme-surface border p-6">
				<h3 className="text-lg font-semibold theme-text">Need Help?</h3>
				<p className="mt-2 theme-text-muted">
					Can&apos;t find what you&apos;re looking for? Try using our search feature or contact
					our support team for personalized recommendations.
				</p>
			</div>
		</section>
	)
}
