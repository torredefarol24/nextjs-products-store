import { CategoryListComponent } from "@/components/category/CategoryList"
import { categories } from "@/data/category"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Category",
}

export default function Category() {
	return <CategoryListComponent categories={categories} />
}
