import { IProduct } from "@/interfaces/platform"
import Link from "next/link"

export default function ProductsListComponent({ products }: { products: IProduct[] }) {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{products.map((product, idx) => (
				<Link key={idx} href={`/products/${product.id}`}>
					<div className="aspect-square overflow-hidden rounded-2xl theme-border theme-surface border">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="rounded-2xl theme-border theme-surface border p-4">
						<h3 className="font-semibold theme-text">{product.title}</h3>
						<p className="mt-2 theme-text-muted">{product.description}</p>
						<p className="mt-2 font-bold theme-text">${product.price}</p>
					</div>
				</Link>
			))}
		</div>
	)
}
