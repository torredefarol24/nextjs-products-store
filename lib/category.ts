import { categories } from "@/data/category"
import { ICategory } from "@/interfaces/category"

export function getCategoryDetailsById(categoryId: number): ICategory | null {
	const category = categories.find((cat) => cat.categoryId === categoryId)
	return category || null
}

export function getCategories(): ICategory[] {
	return categories
}
