import { categories } from "@/data/category"
import { ICategory } from "@/interfaces/platform"

export function getCategoryDetailsById(categoryId: number): ICategory | null {
	const category = categories.find((cat) => cat.categoryId === categoryId)
	return category || null
}
