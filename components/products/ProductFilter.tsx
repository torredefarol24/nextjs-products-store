import { IProductFilterState, ProductFilterComponentProps } from "@/interfaces/product"

export function ProductFilterComponent({
	products,
	filters,
	onFilterChange,
	onClearFilters,
}: ProductFilterComponentProps) {
	// Extract unique values for filter options
	const categories = [...new Set(products.map((p) => p.category))]
	const brands = [...new Set(products.map((p) => p.brand))]
	const allTags = [...new Set(products.flatMap((p) => p.tags))]
	const maxPrice = Math.max(...products.map((p) => p.price))

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFilterChange = (key: keyof IProductFilterState, value: any) => {
		onFilterChange({
			...filters,
			[key]: value,
		})
	}

	const toggleTag = (tag: string) => {
		const newTags = filters.selectedTags.includes(tag)
			? filters.selectedTags.filter((t) => t !== tag)
			: [...filters.selectedTags, tag]

		handleFilterChange("selectedTags", newTags)
	}

	const hasActiveFilters = Object.values(filters).some((value) =>
		Array.isArray(value) ? value.length > 0 : value !== "" && value !== "all",
	)

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold theme-text">Filters</h3>
				{hasActiveFilters && (
					<button
						onClick={onClearFilters}
						className="text-sm theme-link hover:theme-text transition"
					>
						Clear all
					</button>
				)}
			</div>

			{/* Category Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Category</label>
				<select
					value={filters.category}
					onChange={(e) => handleFilterChange("category", e.target.value)}
					className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text"
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			{/* Brand Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Brand</label>
				<select
					value={filters.brand}
					onChange={(e) => handleFilterChange("brand", e.target.value)}
					className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text"
				>
					<option value="">All Brands</option>
					{brands.map((brand, idx) => (
						<option key={idx} value={brand}>
							{brand}
						</option>
					))}
				</select>
			</div>

			{/* Price Range Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Price Range</label>
				<div className="grid grid-cols-2 gap-3">
					<div>
						<input
							type="number"
							placeholder="Min"
							value={filters.minPrice}
							onChange={(e) => handleFilterChange("minPrice", e.target.value)}
							className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text placeholder-theme-text-muted"
							min="0"
							step="0.01"
						/>
					</div>
					<div>
						<input
							type="number"
							placeholder="Max"
							value={filters.maxPrice}
							onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
							className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text placeholder-theme-text-muted"
							min="0"
							step="0.01"
							max={maxPrice}
						/>
					</div>
				</div>
			</div>

			{/* Rating Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Minimum Rating</label>
				<select
					value={filters.minRating}
					onChange={(e) => handleFilterChange("minRating", e.target.value)}
					className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text"
				>
					<option value="">Any Rating</option>
					<option value="4.5">4.5+ Stars</option>
					<option value="4">4+ Stars</option>
					<option value="3.5">3.5+ Stars</option>
					<option value="3">3+ Stars</option>
				</select>
			</div>

			{/* Availability Status Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Availability</label>
				<select
					value={filters.availabilityStatus}
					onChange={(e) => handleFilterChange("availabilityStatus", e.target.value)}
					className="w-full p-3 theme-border theme-surface border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent theme-text"
				>
					<option value="">All Products</option>
					<option value="In Stock">In Stock</option>
					<option value="Low Stock">Low Stock</option>
					<option value="Out of Stock">Out of Stock</option>
				</select>
			</div>

			{/* Tags Filter */}
			<div className="space-y-3">
				<label className="block text-sm font-medium theme-text">Tags</label>
				<div className="flex flex-wrap gap-2">
					{allTags.slice(0, 10).map((tag) => (
						<button
							key={tag}
							onClick={() => toggleTag(tag)}
							className={`px-3 py-1 text-sm rounded-full border transition ${
								filters.selectedTags.includes(tag)
									? "theme-surface theme-border border-blue-500 theme-text"
									: "theme-border theme-surface border-gray-300 theme-text-muted hover:theme-text"
							}`}
						>
							#{tag}
						</button>
					))}
				</div>
				{allTags.length > 10 && (
					<p className="text-xs theme-text-muted">Showing 10 of {allTags.length} tags</p>
				)}
			</div>
		</div>
	)
}
