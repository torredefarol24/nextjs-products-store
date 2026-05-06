import CategoryDetailComponent from "@/components/category/CategoryDetail"

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
	const { slug } = await params
	const categoryId = parseInt(slug, 10)

	return <CategoryDetailComponent categoryId={categoryId} />
}
