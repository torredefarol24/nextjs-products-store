import { IProduct } from "@/interfaces/platform"

export default function ProductDetailComponent({ product }: { product: IProduct }) {
	const discountedPrice = product.price * (1 - product.discountPercentage / 100)

	return (
		<div className="mx-auto max-w-4xl rounded-3xl border theme-border theme-surface p-6 shadow-sm sm:p-8">
			<div className="grid gap-8 lg:grid-cols-2">
				{/* Product Images */}
				<div className="space-y-4">
					<div className="aspect-square overflow-hidden rounded-2xl theme-border theme-surface border">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="grid grid-cols-3 gap-2">
						{product.images.slice(0, 3).map((image, index) => (
							<div
								key={index}
								className="aspect-square overflow-hidden rounded-lg theme-border theme-surface border"
							>
								<img
									src={image}
									alt={`${product.title} ${index + 1}`}
									className="h-full w-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>

				{/* Product Details */}
				<div className="space-y-6">
					<div>
						<h1 className="text-3xl font-bold theme-text">{product.title}</h1>
						<p className="mt-2 theme-text-muted">{product.description}</p>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-2xl font-bold theme-text">${discountedPrice.toFixed(2)}</span>
						{product.discountPercentage > 0 && (
							<>
								<span className="text-lg text-red-500 line-through">
									${product.price.toFixed(2)}
								</span>
								<span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
									-{product.discountPercentage.toFixed(1)}%
								</span>
							</>
						)}
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1">
							<span className="text-yellow-400">★</span>
							<span className="font-medium theme-text">{product.rating.toFixed(1)}</span>
						</div>
						<span className="theme-text-muted">({product.reviews.length} reviews)</span>
						<span
							className={`rounded-full px-2 py-1 text-sm font-medium ${
								product.availabilityStatus === "Low Stock"
									? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
									: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
							}`}
						>
							{product.availabilityStatus}
						</span>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="theme-text-muted">Brand:</span>
							<span className="font-medium theme-text">{product.brand}</span>
						</div>
						<div className="flex justify-between">
							<span className="theme-text-muted">Category:</span>
							<span className="font-medium theme-text">{product.category}</span>
						</div>
						<div className="flex justify-between">
							<span className="theme-text-muted">SKU:</span>
							<span className="font-medium theme-text">{product.sku}</span>
						</div>
						<div className="flex justify-between">
							<span className="theme-text-muted">Stock:</span>
							<span className="font-medium theme-text">{product.stock} units</span>
						</div>
						<div className="flex justify-between">
							<span className="theme-text-muted">Weight:</span>
							<span className="font-medium theme-text">{product.weight}g</span>
						</div>
					</div>

					<div className="space-y-3 rounded-2xl theme-border theme-surface border p-4">
						<h3 className="font-semibold theme-text">Shipping & Returns</h3>
						<div className="space-y-2 text-sm theme-text-muted">
							<p>🚚 {product.shippingInformation}</p>
							<p>🔄 {product.returnPolicy}</p>
							<p>🛡️ {product.warrantyInformation}</p>
							<p>📦 Minimum order: {product.minimumOrderQuantity} units</p>
						</div>
					</div>

					<div className="space-y-3 rounded-2xl theme-border theme-surface border p-4">
						<h3 className="font-semibold theme-text">Dimensions</h3>
						<div className="grid grid-cols-3 gap-4 text-center">
							<div>
								<p className="text-2xl font-bold theme-text">{product.dimensions.width}cm</p>
								<p className="text-sm theme-text-muted">Width</p>
							</div>
							<div>
								<p className="text-2xl font-bold theme-text">{product.dimensions.height}cm</p>
								<p className="text-sm theme-text-muted">Height</p>
							</div>
							<div>
								<p className="text-2xl font-bold theme-text">{product.dimensions.depth}cm</p>
								<p className="text-sm theme-text-muted">Depth</p>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-2">
						{product.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full theme-border theme-surface border px-3 py-1 text-sm theme-text-muted"
							>
								#{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold theme-text mb-6">Customer Reviews</h2>
				<div className="space-y-4">
					{product.reviews.map((review, index) => (
						<div key={index} className="rounded-2xl theme-border theme-surface border p-4">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2">
									<span className="font-medium theme-text">{review.reviewerName}</span>
									<div className="flex items-center gap-1">
										<span className="text-yellow-400">★</span>
										<span className="text-sm theme-text-muted">{review.rating}</span>
									</div>
								</div>
								<span className="text-sm theme-text-muted">
									{new Date(review.date).toLocaleDateString()}
								</span>
							</div>
							<p className="theme-text">{review.comment}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
