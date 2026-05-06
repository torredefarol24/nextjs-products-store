import { CategoryListComponent } from "@/components/category/CategoryList"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Category",
}

export default function Category() {
	return <CategoryListComponent />
}
