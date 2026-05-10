import { ROUTES } from "@/config/constants"
import Link from "next/link"

export default function Home() {
	return (
		<div className="space-y-16 py-8">
			{/* Hero Section */}
			<section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 text-white py-20 px-4 sm:py-32 sm:px-8">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
				<div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

				<div className="relative max-w-4xl mx-auto text-center space-y-8">
					<div className="space-y-4">
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
							Welcome to
							<br /> Kyle's Store
						</h1>
						<p className="text-xl sm:text-2xl opacity-95 max-w-2xl mx-auto">
							Discover amazing products at unbeatable prices with fast shipping and excellent
							customer service
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<Link
							href={ROUTES.products}
							className="btn btn-primary text-lg px-8 py-3 shadow-2xl"
						>
							Shop Now
						</Link>
						<Link
							href={ROUTES.category}
							className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 border border-white/30 text-lg"
						>
							Browse Categories
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="space-y-12">
					<div className="text-center space-y-4">
						<h2 className="text-4xl sm:text-5xl font-bold theme-text">Why Choose Us?</h2>
						<p className="text-lg theme-text-muted max-w-2xl mx-auto">
							We're committed to providing the best shopping experience with quality products,
							competitive prices, and outstanding service.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Feature 1 */}
						<div className="card card-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center text-3xl shadow-md">
								🚚
							</div>
							<h3 className="text-2xl font-semibold theme-text">Fast Shipping</h3>
							<p className="theme-text-muted leading-relaxed">
								Get your orders delivered quickly and safely. We partner with trusted carriers
								to ensure your products arrive on time.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="card card-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30 flex items-center justify-center text-3xl shadow-md">
								✓
							</div>
							<h3 className="text-2xl font-semibold theme-text">Quality Products</h3>
							<p className="theme-text-muted leading-relaxed">
								Only the best products from trusted brands. Every item is carefully selected and
								quality-checked before shipping.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="card card-lg p-8 space-y-4 hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center text-3xl shadow-md">
								🔒
							</div>
							<h3 className="text-2xl font-semibold theme-text">Secure Checkout</h3>
							<p className="theme-text-muted leading-relaxed">
								Your payment information is safe and secure. We use industry-standard encryption
								to protect all transactions.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white py-16 px-4 sm:px-8">
				<div className="relative max-w-4xl mx-auto text-center space-y-6">
					<h2 className="text-4xl sm:text-5xl font-bold">Ready to Start Shopping?</h2>
					<p className="text-lg opacity-90 max-w-2xl mx-auto">
						Browse our collection of premium products and find exactly what you need. Join
						thousands of satisfied customers today.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
						<Link href={ROUTES.products} className="btn btn-primary">
							Explore Products
						</Link>
						<Link
							href={ROUTES.category}
							className="btn border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all"
						>
							View Categories
						</Link>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
					<div className="card card-lg p-6 text-center space-y-2">
						<p className="text-3xl sm:text-4xl font-bold text-gradient">10k+</p>
						<p className="theme-text-muted">Products</p>
					</div>
					<div className="card card-lg p-6 text-center space-y-2">
						<p className="text-3xl sm:text-4xl font-bold text-gradient">50k+</p>
						<p className="theme-text-muted">Happy Customers</p>
					</div>
					<div className="card card-lg p-6 text-center space-y-2">
						<p className="text-3xl sm:text-4xl font-bold text-gradient">24/7</p>
						<p className="theme-text-muted">Support</p>
					</div>
					<div className="card card-lg p-6 text-center space-y-2">
						<p className="text-3xl sm:text-4xl font-bold text-gradient">100%</p>
						<p className="theme-text-muted">Satisfaction</p>
					</div>
				</div>
			</section>
		</div>
	)
}
