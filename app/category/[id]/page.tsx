import CategoryDetailComponent from "@/components/category/CategoryDetail"
import { getCategoryDetailsById } from "@/lib/category"

export default async function CategoryDetailPage({ params }: { params: { id: string } }) {
	const { id } = await params
	const categoryId = parseInt(id, 10)
	const category = getCategoryDetailsById(categoryId)

	return <CategoryDetailComponent category={category} />
}
