import ProductsListComponent from "@/components/products/ProductsList"
import { getProducts } from "@/lib/products"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Products",
}

export default async function ProductsPage() {
	const products = await getProducts()
	return (
		<div className="py-08">
			<h1 className="text-3xl font-bold mb-8 capitalize">Best Sellers</h1>
			<ProductsListComponent products={products} />
		</div>
	)
}
