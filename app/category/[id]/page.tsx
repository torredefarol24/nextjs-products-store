import CategoryDetailComponent from "@/components/category/CategoryDetail"
import { ICategory, ICategoryPageProps } from "@/interfaces/category"
import { getCategories, getCategoryDetailsById } from "@/lib/category"
import { Metadata } from "next"

export async function generateMetadata({ params }: ICategoryPageProps): Promise<Metadata> {
	const categories = await getCategories()
	const category = categories.find((c: ICategory) => c.categoryId === parseInt(params.id))

	if (!category) {
		return {
			title: "Category Not Found",
		}
	}

	return {
		title: category.name,
		description: category.subHeading,
		openGraph: {
			title: category.name,
			description: category.subHeading,
		},
	}
}

export async function generateStaticParams() {
	const categories = await getCategories()

	return categories.map((category: ICategory) => ({
		id: category.categoryId.toString(),
	}))
}

export default async function CategoryDetailPage({ params }: { params: { id: string } }) {
	const { id } = await params
	const category = getCategoryDetailsById(parseInt(id, 10))

	return <CategoryDetailComponent category={category} />
}
