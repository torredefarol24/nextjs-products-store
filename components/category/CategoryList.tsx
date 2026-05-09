import { ICategory } from "@/interfaces/category"
import Category from "./Category"

export function CategoryListComponent({ categories }: { categories: ICategory[] }) {
	return (
		<div className="space-y-8">
			{/* Header Section */}
			<div className="space-y-4">
				<h2 className="mt-8 text-4xl font-bold theme-text bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Product Categories
				</h2>
				<p className="text-lg mt-4 theme-text-muted max-w-2xl leading-relaxed">
					Browse our curated selection of product categories to find exactly what you&apos;re
					looking for. From beauty essentials to home decor, we have everything you need.
				</p>
			</div>

			{/* Categories Grid */}
			<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{categories.map((category, idx) => (
					<Category
						key={idx}
						categoryId={category.categoryId}
						name={category.name}
						slug={category.slug}
					/>
				))}
			</div>

			{/* Help Section */}
			<div className="mt-12 rounded-2xl theme-border theme-surface border p-8 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
				<div className="flex items-start gap-4">
					<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
						?
					</div>
					<div className="flex-1">
						<h3 className="text-xl font-semibold theme-text mb-2">
							Need Help Finding Something?
						</h3>
						<p className="theme-text-muted mb-4 leading-relaxed">
							Can&apos;t find what you&apos;re looking for? Try using our advanced search
							feature with filters, or contact our support team for personalized
							recommendations.
						</p>
						<div className="flex flex-wrap gap-3">
							<button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg">
								Search Products
							</button>
							<button className="px-4 py-2 theme-border theme-surface border rounded-lg font-medium theme-text hover:theme-surface transition-all duration-200">
								Contact Support
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
