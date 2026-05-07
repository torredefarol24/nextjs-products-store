import { CategoryListComponent } from "@/components/category/CategoryList"
import { getCategories } from "@/lib/category"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Category",
}

export default function Category() {
	const categories = getCategories()
	return <CategoryListComponent categories={categories} />
}
