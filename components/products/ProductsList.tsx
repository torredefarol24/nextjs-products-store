"use client"

import { IProductFilterState, IProductsListComponentProps } from "@/interfaces/product"
import { filterProducts, getDefaultFilters, searchProducts } from "@/lib/productFilters"
import { useMemo, useState } from "react"
import { ProductFilterComponent } from "./ProductFilter"
import { ProductSearchComponent } from "./ProductSearch"
import { ProductThumbnail } from "./ProductThumbnail"

export default function ProductsListComponent({
	products,
	loading = false,
}: IProductsListComponentProps & { loading?: boolean }) {
	const [searchQuery, setSearchQuery] = useState("")
	const [filters, setFilters] = useState<IProductFilterState>(getDefaultFilters())
	const [showFilters, setShowFilters] = useState(false)

	// Apply search and filters independently
	const filteredProducts = useMemo(() => {
		const searched = searchProducts(products, searchQuery)
		return filterProducts(searched, filters)
	}, [products, searchQuery, filters])

	const handleClearFilters = () => {
		setFilters(getDefaultFilters())
	}

	const handleClearSearch = () => {
		setSearchQuery("")
	}

	return (
		<div className="space-y-6">
			{/* Search + Filter Controls */}
			<div className="space-y-4">
				<ProductSearchComponent
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					placeholder="Search products by title, description, brand, category, or tags..."
				/>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center gap-2 px-4 py-2.5 rounded-lg card card-lg font-medium theme-text transition-all duration-200 hover:shadow-md"
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
						{showFilters ? "Hide Filters" : "Show Filters"}
					</button>

					<div className="flex flex-wrap items-center gap-3">
						<div className="text-sm font-medium theme-text-muted px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
							{filteredProducts.length} of {products.length} products
						</div>
						{(searchQuery ||
							filters.category ||
							filters.brand ||
							filters.minPrice ||
							filters.maxPrice ||
							filters.minRating ||
							filters.availabilityStatus ||
							filters.selectedTags.length > 0) && (
							<button
								onClick={() => {
									handleClearFilters()
									handleClearSearch()
									setShowFilters(false)
								}}
								className="px-4 py-2 rounded-lg font-medium text-sm bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 transition"
							>
								Clear all
							</button>
						)}
					</div>
				</div>

				{/* Filter Panel */}
				{showFilters && (
					<div className="card card-lg p-6 animate-in fade-in slide-in-from-top-2 duration-200">
						<ProductFilterComponent
							products={products}
							filters={filters}
							onFilterChange={setFilters}
							onClearFilters={handleClearFilters}
						/>
					</div>
				)}
			</div>

			{/* Products Grid */}
			{loading ? (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="animate-pulse">
							<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
								<div className="aspect-square bg-gray-200 dark:bg-gray-700"></div>
								<div className="p-4 space-y-3">
									<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
									<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
									<div className="flex justify-between items-center">
										<div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
										<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
									</div>
									<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : filteredProducts.length === 0 ? (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">🔍</div>
					<h3 className="text-xl font-semibold theme-text mb-2">No products found</h3>
					<p className="theme-text-muted mb-4">
						Try adjusting your search or filters to find what you&apos;re looking for.
					</p>
					<button
						onClick={handleClearSearch}
						className="px-4 py-2 theme-link hover:theme-text transition"
					>
						Clear search
					</button>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filteredProducts.map((product) => (
						<ProductThumbnail key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	)
}
