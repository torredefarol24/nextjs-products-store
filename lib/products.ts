import { ENDPOINTS } from "@/config/constants"
import { withErrorHandling } from "@/lib/errorUtils"
import { NetworkError, ValidationError } from "@/lib/errors"

export async function getProducts() {
	return withErrorHandling(async () => {
		const response = await fetch(ENDPOINTS.products, {
			next: { revalidate: 3600 }, // Cache for 1 hour
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

		const response = await fetch(`${ENDPOINTS.products}/${productId}`, {
			next: { revalidate: 3600 }, // Cache for 1 hour
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
