import { IProduct } from "@/interfaces/product"
import Link from "next/link"

export function ProductThumbnail({ product }: { product: IProduct }) {
	const rating = product.rating.toFixed(1)
	const displayPrice = product.price * (1 - product.discountPercentage / 100)

	return (
		<Link href={`/products/${product.id}`}>
			<div className="group cursor-pointer h-full">
				<div className="card card-lg overflow-hidden mb-4 h-64 sm:h-72 transition-all duration-300 group-hover:shadow-xl">
					<div className="relative w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-800/10">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
						{/* Discount Badge */}
						{product.discountPercentage > 0 && (
							<div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
								-{product.discountPercentage.toFixed(0)}%
							</div>
						)}
						{/* Stock Status Badge */}
						<div className="absolute top-3 left-3">
							<span
								className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
									product.availabilityStatus === "Low Stock"
										? "bg-yellow-500/90 text-yellow-50"
										: product.availabilityStatus === "In Stock"
											? "bg-green-500/90 text-green-50"
											: "bg-red-500/90 text-red-50"
								}`}
							>
								{product.availabilityStatus}
							</span>
						</div>
						{/* Rating Overlay */}
						<div className="absolute bottom-3 right-3 bg-white/95 theme-surface border theme-border backdrop-blur px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
							<span className="text-yellow-400">★</span>
							<span className="font-semibold text-sm theme-text">{rating}</span>
						</div>
					</div>
				</div>

				<div className="space-y-3">
					{/* Title */}
					<h3 className="font-semibold theme-text line-clamp-2 text-sm sm:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
						{product.title}
					</h3>

					{/* Description */}
					<p className="text-xs sm:text-sm theme-text-muted line-clamp-2 leading-relaxed">
						{product.description}
					</p>

					{/* Price Section */}
					<div className="flex items-baseline gap-2 pt-1">
						<span className="text-lg sm:text-xl font-bold text-gradient">
							${displayPrice.toFixed(2)}
						</span>
						{product.discountPercentage > 0 && (
							<span className="text-xs sm:text-sm theme-text-muted line-through">
								${product.price.toFixed(2)}
							</span>
						)}
					</div>

					{/* Meta Info */}
					<div className="flex items-center justify-between text-xs theme-text-muted pt-2 border-t theme-border-light">
						<span className="font-medium">{product.brand}</span>
						<span className="text-right truncate">{product.category}</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
