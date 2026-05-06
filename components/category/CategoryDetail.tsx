import { ICategoryDetailComponentProps } from "@/interfaces/platform"
import { getCategoryDetailsById } from "@/lib/category"

export default function CategoryDetailComponent({ categoryId }: ICategoryDetailComponentProps) {
	const category = getCategoryDetailsById(categoryId)

	if (!category) {
		return (
			<section className="mx-auto max-w-6xl rounded-3xl border theme-border theme-surface p-6 shadow-sm sm:p-8">
				<h1 className="text-4xl font-bold theme-text">Category Not Found</h1>
				<p className="mt-4 text-lg theme-text-muted">
					The category you&apos;re looking for doesn&apos;t exist.
				</p>
			</section>
		)
	}

	return (
		<section className="mx-auto max-w-6xl rounded-3xl border theme-border theme-surface p-6 shadow-sm sm:p-8">
			<h1 className="text-4xl font-bold theme-text">{category.name}</h1>
			<p className="mt-4 text-lg theme-text-muted">{category.subHeading}</p>
			<div className="mt-6 rounded-2xl theme-border theme-surface border p-4">
				<p className="theme-text">
					This category contains <span className="font-semibold">{category.count}</span>{" "}
					products.
				</p>
			</div>
		</section>
	)
}
