import { CategoryListComponent } from "@/components/category/Category"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Category",
}

export default function Category() {
	return <CategoryListComponent />
}
