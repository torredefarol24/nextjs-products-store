import ProductDetailComponent from "@/components/products/ProductDetail"
import { IProduct } from "@/interfaces/product"
import { getProducts } from "@/lib/products"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface ProductPageProps {
	params: {
		id: string
	}
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
	const products = await getProducts()
	const product = products.find((p: IProduct) => p.id === parseInt(params.id))

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

export async function generateStaticParams() {
	const products = await getProducts()

	return products.map((product: IProduct) => ({
		id: product.id.toString(),
	}))
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params
	const products = await getProducts()
	const product = products.find((p: IProduct) => p.id === parseInt(id))

	if (!product) {
		notFound()
	}

	return <ProductDetailComponent product={product} />
}
