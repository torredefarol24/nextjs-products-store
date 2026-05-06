import { ENDPOINTS } from "@/config/endpoints"

export async function getProducts() {
	const response = await fetch(ENDPOINTS.products)
	if (!response.ok) {
		throw new Error("Failed to fetch products")
	}
	const data = await response.json()
	return data.products
}

export async function getProductDetailsById(productId: number) {
	const response = await fetch(`${ENDPOINTS.products}/${productId}`)
	if (!response.ok) {
		throw new Error(`Failed to fetch product with ID ${productId}`)
	}
	const product = await response.json()
	return product
}
