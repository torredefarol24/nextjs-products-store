import { ENDPOINTS } from "@/config/constants"
import { ICategory } from "@/interfaces/category"
import { NetworkError, ValidationError } from "./errors"
import { withErrorHandling } from "./errorUtils"

export async function getCategories(): Promise<ICategory[]> {
	return withErrorHandling(async () => {
		const response = await fetch(ENDPOINTS.categories, {
			next: { revalidate: 3600 }, // Cache for 1 hour
		})

		if (!response.ok) {
			throw new NetworkError(
				`Failed to fetch categories: ${response.status} ${response.statusText}`,
			)
		}

		const data = await response.json()

		if (!data || !Array.isArray(data)) {
			throw new ValidationError("Invalid response format from categories API")
		}

		return data
	}, "getCategories")
}
