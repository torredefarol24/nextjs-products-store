import { categories } from "@/data/category"
import { ICategory } from "@/interfaces/platform"

export function getCategoryDetailsById(categoryId: number): ICategory | null {
	console.log("Fetching category details for ID:", categoryId)
	const category = categories.find((cat) => cat.categoryId === categoryId)
	return category || null
}
