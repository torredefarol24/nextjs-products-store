import CategoryDetailComponent from "@/components/category/CategoryDetail"
import { getCategoryDetailsById } from "@/lib/category"

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
	const { slug } = await params
	const categoryId = parseInt(slug, 10)
	const category = getCategoryDetailsById(categoryId)

	return <CategoryDetailComponent category={category} />
}
