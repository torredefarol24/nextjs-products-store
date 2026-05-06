import { ICategory } from "@/interfaces/product"
import Category from "./Category"

export function CategoryListComponent({ categories }: { categories: ICategory[] }) {
	return (
		<section className="mx-auto max-w-6xl rounded-3xl border theme-border theme-surface p-6 shadow-sm sm:p-8">
			<h2 className="text-3xl font-semibold theme-text">Product Categories</h2>
			<p className="mt-3 theme-text-muted">
				Browse our curated selection of product categories to find exactly what you&apos;re
				looking for.
			</p>

			<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{categories.map((category, idx) => (
					<Category
						key={idx}
						categoryId={category.categoryId}
						name={category.name}
						count={category.count}
					/>
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
