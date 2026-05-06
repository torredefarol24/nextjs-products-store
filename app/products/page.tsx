import ProductsComponent from "@/components/products/ProductsList"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Products",
}

export default function Products() {
	return <ProductsComponent />
}
