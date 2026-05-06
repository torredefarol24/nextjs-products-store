import ProductsListComponent from "@/components/products/ProductsList"
import { getProducts } from "@/lib/products"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Products",
}

export default async function Products() {
	const products = await getProducts()
	return <ProductsListComponent products={products} />
}
