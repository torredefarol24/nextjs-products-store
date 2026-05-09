"use client"

import { ROUTES } from "@/config/constants"
import Link from "next/link"

export default function Home() {
	return (
		<div className="min-h-screen theme-surface">
			{/* Hero Section */}
			<section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Kyle Store</h1>
					<p className="text-xl md:text-2xl mb-8 opacity-90">
						Discover amazing products at unbeatable prices
					</p>
					<Link
						href={ROUTES.products}
						className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
					>
						Shop Now
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-bold text-center theme-text mb-12">Why Choose Us?</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center p-6 rounded-lg theme-surface theme-border">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">🚚</span>
							</div>
							<h3 className="text-xl font-semibold theme-text mb-2">Fast Shipping</h3>
							<p className="theme-text-muted">Get your orders delivered quickly and safely</p>
						</div>
						<div className="text-center p-6 rounded-lg theme-surface theme-border">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">💯</span>
							</div>
							<h3 className="text-xl font-semibold theme-text mb-2">Quality Products</h3>
							<p className="theme-text-muted">Only the best products from trusted brands</p>
						</div>
						<div className="text-center p-6 rounded-lg theme-surface theme-border">
							<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl">💳</span>
							</div>
							<h3 className="text-xl font-semibold theme-text mb-2">Secure Payment</h3>
							<p className="theme-text-muted">Safe and secure checkout process</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="theme-surface py-16 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-bold theme-text mb-4">Ready to Start Shopping?</h2>
					<p className="text-lg theme-text-muted mb-8">
						Browse our collection and find exactly what you need
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href={ROUTES.products}
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
						>
							View Products
						</Link>
						<Link
							href={ROUTES.category}
							className="theme-surface px-6 py-3 rounded-lg font-medium transition duration-300"
						>
							Browse Categories
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}
