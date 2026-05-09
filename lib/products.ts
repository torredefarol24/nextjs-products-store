import { APIS } from "@/config/constants"
import { NetworkError, ValidationError } from "@/config/errors"
import { withErrorHandling } from "@/utils/errorHandler"

export async function getProducts() {
	return withErrorHandling(async () => {
		const response = await fetch(APIS.ENDPOINTS.getProducts, {
			next: { revalidate: 3600 },
		})

		if (!response.ok) {
			throw new NetworkError(
				`Failed to fetch products: ${response.status} ${response.statusText}`,
			)
		}

		const data = await response.json()

		if (!data || !Array.isArray(data.products)) {
			throw new ValidationError("Invalid response format from products API")
		}

		return data.products
	}, "getProducts")
}

export async function getProductDetailsById(productId: number) {
	return withErrorHandling(async () => {
		if (!productId || productId <= 0) {
			throw new ValidationError("Invalid product ID")
		}

		const response = await fetch(APIS.ENDPOINTS.getProductById(productId), {
			next: { revalidate: 3600 },
		})

		if (!response.ok) {
			if (response.status === 404) {
				throw new ValidationError(`Product with ID ${productId} not found`)
			}
			throw new NetworkError(
				`Failed to fetch product: ${response.status} ${response.statusText}`,
			)
		}

		const product = await response.json()

		if (!product || !product.id) {
			throw new ValidationError("Invalid product data received")
		}

		return product
	}, "getProductDetailsById")
}

export async function getProductsByCategory(category: string) {
	return withErrorHandling(async () => {
		if (!category?.trim()) {
			throw new ValidationError("Category is required")
		}

		const response = await fetch(
			APIS.ENDPOINTS.getProductsByCategory(encodeURIComponent(category)),
			{
				next: { revalidate: 3600 }, // Cache for 1 hour
			},
		)

		if (!response.ok) {
			throw new NetworkError(
				`Failed to fetch products by category: ${response.status} ${response.statusText}`,
			)
		}

		const data = await response.json()

		if (!data || !Array.isArray(data.products)) {
			throw new ValidationError("Invalid response format from products API")
		}

		return data.products
	}, "getProductsByCategory")
}
