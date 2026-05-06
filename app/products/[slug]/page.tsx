import ProductDetailComponent from "@/components/products/Product"
import { IProduct } from "@/interfaces/platform"
import { getProductDetailsById } from "@/lib/products"

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
	const { slug } = await params
	const productId = parseInt(slug, 10)
	const product: IProduct = await getProductDetailsById(productId)

	return <ProductDetailComponent product={product} />
}
