import { IProduct } from "@/interfaces/product"
import Link from "next/link"

export function ProductThumbnail({ product }: { product: IProduct }) {
	return (
		<Link key={product.id} href={`/products/${product.id}`}>
			<div className="group cursor-pointer">
				<div className="aspect-square overflow-hidden rounded-2xl theme-border theme-surface border mb-4 transition group-hover:shadow-lg">
					<img
						src={product.thumbnail}
						alt={product.title}
						className="h-full w-full object-cover transition group-hover:scale-105"
					/>
				</div>
				<div className="space-y-2">
					<h3 className="font-semibold theme-text line-clamp-2 group-hover:theme-link transition">
						{product.title}
					</h3>
					<p className="text-sm theme-text-muted line-clamp-2">{product.description}</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="font-bold theme-text">${product.price.toFixed(2)}</span>
							{product.discountPercentage > 0 && (
								<span className="text-sm text-green-600 font-medium">
									-{product.discountPercentage.toFixed(0)}%
								</span>
							)}
						</div>
						<div className="flex items-center gap-1">
							<span className="text-yellow-400">★</span>
							<span className="text-sm theme-text-muted">{product.rating.toFixed(1)}</span>
						</div>
					</div>
					<div className="flex items-center justify-between text-xs theme-text-muted">
						<span>{product.brand}</span>
						<span
							className={`px-2 py-1 rounded-full ${
								product.availabilityStatus === "Low Stock"
									? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
									: product.availabilityStatus === "In Stock"
										? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
										: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
							}`}
						>
							{product.availabilityStatus}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
