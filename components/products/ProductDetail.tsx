"use client"
import { APIS } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { useToast } from "@/contexts/toasts"
import { IProduct } from "@/interfaces/product"
import Image from "next/image"

export default function ProductDetailComponent({ product }: { product: IProduct }) {
	const { user } = useAuth()
	const { showSuccess, showError } = useToast()
	const discountedPrice = product.price * (1 - product.discountPercentage / 100)

	const createUserOrder = async () => {
		if (!user) {
			alert("Please login to place an order.")
			return
		}

		try {
			const response = await fetch(APIS.INTERNAL.createOrder, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					orderData: {
						productId: product.id,
						total: discountedPrice,
					},
					productData: {
						title: product.title,
						thumbnail: product.thumbnail,
						price: discountedPrice,
					},
				}),
			})

			if (response.ok) {
				showSuccess("Order placed successfully!")
			} else {
				const errorData = await response.json()
				showError(`Failed to place order: ${errorData.message}`)
			}
		} catch (error) {
			console.error("Error placing order:", error)
			showError("An error occurred while placing your order. Please try again.")
		}
	}

	return (
		<div className="space-y-8">
			<div className="card card-lg p-6 sm:p-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{/* Product Images */}
					<div className="space-y-4">
						<div className="aspect-square overflow-hidden rounded-2xl card relative bg-slate-100 dark:bg-slate-800">
							<Image
								src={product.thumbnail}
								alt={product.title}
								fill
								className="object-cover hover:scale-105 transition-transform duration-300"
							/>
							{product.discountPercentage > 0 && (
								<div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
									-{product.discountPercentage.toFixed(0)}%
								</div>
							)}
						</div>
						<div className="grid grid-cols-3 gap-2">
							{product.images.slice(0, 3).map((image, index) => (
								<div
									key={index}
									className="aspect-square overflow-hidden rounded-lg card relative bg-slate-100 dark:bg-slate-800 cursor-pointer hover:shadow-md transition-all"
								>
									<Image
										src={image}
										alt={`${product.title} ${index + 1}`}
										fill
										className="object-cover hover:scale-105 transition-transform duration-300"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div className="space-y-6">
						<div className="space-y-3">
							<h1 className="text-4xl font-bold theme-text">{product.title}</h1>
							<p className="text-lg theme-text-muted leading-relaxed">{product.description}</p>
						</div>

						{/* Price Section */}
						<div className="space-y-2 pb-6 border-b theme-border-light">
							<div className="flex items-baseline gap-3">
								<span className="text-4xl font-bold text-gradient">
									${discountedPrice.toFixed(2)}
								</span>
								{product.discountPercentage > 0 && (
									<>
										<span className="text-lg theme-text-muted line-through">
											${product.price.toFixed(2)}
										</span>
										<span className="bg-red-500/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-bold">
											Save ${(product.price - discountedPrice).toFixed(2)}
										</span>
									</>
								)}
							</div>
						</div>

						{/* Rating & Stock */}
						<div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/5">
							<div className="flex items-center gap-2">
								<span className="text-2xl text-yellow-400">★</span>
								<span className="text-xl font-bold theme-text">
									{product.rating.toFixed(1)}
								</span>
								<span className="theme-text-muted">({product.reviews.length} reviews)</span>
							</div>
							<div
								className={`px-4 py-2 rounded-lg font-semibold text-sm ${
									product.availabilityStatus === "Low Stock"
										? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
										: product.availabilityStatus === "In Stock"
											? "bg-green-500/20 text-green-700 dark:text-green-400"
											: "bg-red-500/20 text-red-700 dark:text-red-400"
								}`}
							>
								{product.availabilityStatus}
							</div>
						</div>

						{/* Info Grid */}
						<div className="grid grid-cols-2 gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/5">
							<div>
								<p className="text-xs font-semibold theme-text-muted uppercase">Brand</p>
								<p className="font-semibold theme-text mt-1">{product.brand}</p>
							</div>
							<div>
								<p className="text-xs font-semibold theme-text-muted uppercase">Category</p>
								<p className="font-semibold theme-text mt-1">{product.category}</p>
							</div>
							<div>
								<p className="text-xs font-semibold theme-text-muted uppercase">SKU</p>
								<p className="font-semibold theme-text mt-1 font-mono text-sm">{product.sku}</p>
							</div>
							<div>
								<p className="text-xs font-semibold theme-text-muted uppercase">Stock</p>
								<p className="font-semibold theme-text mt-1">{product.stock} units</p>
							</div>
						</div>

						{/* Order Button */}
						<button
							className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
								user && product.stock > 0
									? "btn btn-primary shadow-lg"
									: "bg-slate-400 text-slate-600 cursor-not-allowed"
							}`}
							disabled={!user || product.stock === 0}
							onClick={() => {
								if (user && product.stock > 0) {
									createUserOrder()
								}
							}}
						>
							{!user ? "Login to Order" : product.stock === 0 ? "Out of Stock" : "Order Now"}
						</button>
					</div>
				</div>
			</div>

			{/* Additional Info Sections */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Shipping & Returns */}
				<div className="card card-lg p-6 space-y-4">
					<h3 className="text-xl font-bold theme-text flex items-center gap-2">
						<span className="text-2xl">📦</span> Shipping & Returns
					</h3>
					<div className="space-y-3 text-sm theme-text-muted">
						<div className="flex gap-3">
							<span className="text-lg">🚚</span>
							<p>{product.shippingInformation}</p>
						</div>
						<div className="flex gap-3">
							<span className="text-lg">↩️</span>
							<p>{product.returnPolicy}</p>
						</div>
						<div className="flex gap-3">
							<span className="text-lg">🛡️</span>
							<p>{product.warrantyInformation}</p>
						</div>
						<div className="flex gap-3">
							<span className="text-lg">📦</span>
							<p>Minimum order: {product.minimumOrderQuantity} units</p>
						</div>
					</div>
				</div>

				{/* Dimensions */}
				<div className="card card-lg p-6 space-y-4">
					<h3 className="text-xl font-bold theme-text flex items-center gap-2">
						<span className="text-2xl">📐</span> Dimensions
					</h3>
					<div className="grid grid-cols-3 gap-4 text-center">
						<div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/10">
							<p className="text-2xl font-bold text-gradient">{product.dimensions.width}cm</p>
							<p className="text-xs theme-text-muted mt-2 font-medium">Width</p>
						</div>
						<div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/10">
							<p className="text-2xl font-bold text-gradient">{product.dimensions.height}cm</p>
							<p className="text-xs theme-text-muted mt-2 font-medium">Height</p>
						</div>
						<div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/10">
							<p className="text-2xl font-bold text-gradient">{product.dimensions.depth}cm</p>
							<p className="text-xs theme-text-muted mt-2 font-medium">Depth</p>
						</div>
					</div>
					<p className="text-sm theme-text-muted">
						Weight: <span className="font-semibold theme-text">{product.weight}g</span>
					</p>
				</div>
			</div>

			{/* Tags */}
			<div className="card card-lg p-6 space-y-4">
				<h3 className="text-xl font-bold theme-text">Tags</h3>
				<div className="flex flex-wrap gap-2">
					{product.tags.map((tag) => (
						<span
							key={tag}
							className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium"
						>
							#{tag}
						</span>
					))}
				</div>
			</div>

			{/* Reviews Section */}
			<div className="space-y-6">
				<h2 className="text-3xl font-bold theme-text">Customer Reviews</h2>
				{product.reviews.length > 0 ? (
					<div className="grid gap-4">
						{product.reviews.map((review, index) => (
							<div key={index} className="card card-lg p-6">
								<div className="flex items-start justify-between mb-4">
									<div>
										<p className="font-semibold theme-text">{review.reviewerName}</p>
										<div className="flex items-center gap-2 mt-1">
											<div className="flex gap-0.5">
												{[...Array(5)].map((_, i) => (
													<span
														key={i}
														className={
															i < Math.round(review.rating)
																? "text-yellow-400"
																: "text-slate-300"
														}
													>
														★
													</span>
												))}
											</div>
											<span className="text-sm theme-text-muted">{review.rating} out of 5</span>
										</div>
									</div>
									<span className="text-sm theme-text-muted">
										{new Date(review.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</span>
								</div>
								<p className="theme-text leading-relaxed">{review.comment}</p>
							</div>
						))}
					</div>
				) : (
					<div className="card card-lg p-8 text-center py-12">
						<p className="theme-text-muted">
							No reviews yet. Be the first to review this product!
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
