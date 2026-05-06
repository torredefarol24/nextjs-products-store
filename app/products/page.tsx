import ProductsComponent from "@/components/products/Products"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Products",
}

export default function Products() {
	return <ProductsComponent />
}
