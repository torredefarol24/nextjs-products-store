import ProductsListComponent from "@/components/products/ProductsList"
import { IProductByCategoryPageProps } from "@/interfaces/category"
import { getCategories } from "@/lib/category"
import { getProductsByCategory } from "@/lib/products"
import { Metadata } from "next"

export async function generateMetadata({
	params,
}: IProductByCategoryPageProps): Promise<Metadata> {
	const { slug } = await params
	const products = await getProductsByCategory(slug)

	if (products.length === 0) {
		return {
			title: "Category Not Found",
		}
	}

	return {
		title: `Products in ${slug} Category`,
		description: `Explore our collection of products in the ${slug} category.`,
		openGraph: {
			title: `Products in ${slug} Category`,
			description: `Explore our collection of products in the ${slug} category.`,
			images: products.slice(0, 3).map((p) => p.thumbnail),
		},
	}
}

export async function generateStaticParams() {
	const categories = await getCategories()

	return categories.map((category) => ({
		slug: category.slug,
	}))
}

export default async function ProductsByCategoryPage({ params }: IProductByCategoryPageProps) {
	const { slug } = await params
	const products = await getProductsByCategory(slug)

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 capitalize">{slug} Products</h1>
			<ProductsListComponent products={products} />
		</div>
	)
}
