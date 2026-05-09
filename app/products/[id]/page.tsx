import ProductDetailComponent from "@/components/products/ProductDetail"
import { IProduct, IProductPageProps } from "@/interfaces/product"
import { getProductDetailsById, getProducts } from "@/lib/products"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: IProductPageProps): Promise<Metadata> {
	const { id } = await params
	const products = await getProducts()
	const product = products.find((p: IProduct) => p.id === parseInt(id))

	if (!product) {
		return {
			title: "Product Not Found",
		}
	}

	return {
		title: product.title,
		description: product.description,
		openGraph: {
			title: product.title,
			description: product.description,
			images: [product.thumbnail],
		},
	}
}

export default async function ProductDetailPage({ params }: IProductPageProps) {
	const { id } = await params
	const product = await getProductDetailsById(parseInt(id))

	if (!product) {
		notFound()
	}

	return <ProductDetailComponent product={product} />
}
