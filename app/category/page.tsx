import { CategoryListComponent } from "@/components/category/CategoryList"
import { getCategories } from "@/lib/category"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Category",
}

export default async function CategoryPage() {
	const categories = await getCategories()
	return <CategoryListComponent categories={categories} />
}
