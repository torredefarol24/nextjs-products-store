export interface IProductFilterState {
	category: string
	brand: string
	minPrice: string
	maxPrice: string
	minRating: string
	availabilityStatus: string
	selectedTags: string[]
}

export interface IProduct {
	id: number
	title: string
	description: string
	category: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	tags: string[]
	brand: string
	sku: string
	weight: number
	dimensions: {
		width: number
		height: number
		depth: number
	}
	warrantyInformation: string
	shippingInformation: string
	availabilityStatus: string
	reviews: {
		rating: number
		comment: string
		date: string
		reviewerName: string
		reviewerEmail: string
	}[]
	returnPolicy: string
	minimumOrderQuantity: number
	meta: {
		createdAt: string
		updatedAt: string
		barcode: string
		qrCode: string
	}
	thumbnail: string
	images: string[]
}

export interface IProductFilterComponentProps {
	products: IProduct[]
	filters: IProductFilterState
	onFilterChange: (filters: IProductFilterState) => void
	onClearFilters: () => void
}

export interface IProductsListComponentProps {
	products: IProduct[]
}

export interface IProductPageProps {
	params: {
		id: string
	}
}
