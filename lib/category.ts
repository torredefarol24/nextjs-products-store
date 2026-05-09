import { APIS } from "@/config/constants"
import { ICategory } from "@/interfaces/category"
import { NetworkError, ValidationError } from "../config/errors"
import { withErrorHandling } from "../utils/errorHandler"

export async function getCategories(): Promise<ICategory[]> {
	return withErrorHandling(async () => {
		const response = await fetch(APIS.ENDPOINTS.getCategories, {
			next: { revalidate: 3600 },
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
