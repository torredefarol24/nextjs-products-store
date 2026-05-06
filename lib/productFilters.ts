import { IProduct, IProductFilterState } from "@/interfaces/product"

export function filterProducts(products: IProduct[], filters: IProductFilterState): IProduct[] {
	return products.filter((product) => {
		// Category filter
		if (filters.category && product.category !== filters.category) {
			return false
		}

		// Brand filter
		if (filters.brand && product.brand !== filters.brand) {
			return false
		}

		// Price range filter
		const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0
		const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity
		if (product.price < minPrice || product.price > maxPrice) {
			return false
		}

		// Rating filter
		const minRating = filters.minRating ? parseFloat(filters.minRating) : 0
		if (product.rating < minRating) {
			return false
		}

		// Availability status filter
		if (
			filters.availabilityStatus &&
			product.availabilityStatus !== filters.availabilityStatus
		) {
			return false
		}

		// Tags filter
		if (filters.selectedTags.length > 0) {
			const hasMatchingTag = filters.selectedTags.some((selectedTag) =>
				product.tags.includes(selectedTag),
			)
			if (!hasMatchingTag) {
				return false
			}
		}

		return true
	})
}

export function getDefaultFilters(): IProductFilterState {
	return {
		category: "",
		brand: "",
		minPrice: "",
		maxPrice: "",
		minRating: "",
		availabilityStatus: "",
		selectedTags: [],
	}
}
