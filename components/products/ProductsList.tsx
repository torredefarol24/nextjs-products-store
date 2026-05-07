"use client"

import { IProductFilterState, IProductsListComponentProps } from "@/interfaces/product"
import { filterProducts, getDefaultFilters, searchProducts } from "@/lib/productFilters"
import { useMemo, useState } from "react"
import { ProductFilterComponent } from "./ProductFilter"
import { ProductSearchComponent } from "./ProductSearch"
import { ProductThumbnail } from "./ProductThumbnail"

export default function ProductsListComponent({ products }: IProductsListComponentProps) {
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
						className="flex items-center gap-2 px-4 py-2 theme-border theme-surface border rounded-xl hover:theme-surface transition theme-text"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
							/>
						</svg>
						Filters {showFilters ? "▼" : "▶"}
					</button>

					<div className="flex flex-wrap items-center gap-3">
						<div className="text-sm theme-text-muted">
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
								className="px-4 py-2 theme-link hover:theme-text transition text-sm"
							>
								Clear all
							</button>
						)}
					</div>
				</div>

				{/* Filter Panel */}
				{showFilters && (
					<div className="rounded-2xl theme-border theme-surface border p-6">
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
			{filteredProducts.length === 0 ? (
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
