import { ROUTES } from "@/config/constants"
import Link from "next/link"

export function FooterComponent() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="border-t theme-border theme-surface mt-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Brand Section */}
					<div className="space-y-3">
						<h3 className="text-lg font-bold text-gradient">Kyle&apos;s Store</h3>
						<p className="text-sm theme-text-muted leading-relaxed">
							Discover amazing products at unbeatable prices with our curated collection.
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-3">
						<h4 className="font-semibold theme-text">Quick Links</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href={ROUTES.products} className="theme-link hover:theme-text transition">
									Shop Products
								</Link>
							</li>
							<li>
								<Link href={ROUTES.category} className="theme-link hover:theme-text transition">
									Categories
								</Link>
							</li>
							<li>
								<Link href={ROUTES.contact} className="theme-link hover:theme-text transition">
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Information */}
					<div className="space-y-3">
						<h4 className="font-semibold theme-text">Information</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a href={ROUTES.contact} className="theme-link hover:theme-text transition">
									About Us
								</a>
							</li>
							<li>
								<a href={ROUTES.contact} className="theme-link hover:theme-text transition">
									Shipping Info
								</a>
							</li>
							<li>
								<a href={ROUTES.contact} className="theme-link hover:theme-text transition">
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className="space-y-3">
						<h4 className="font-semibold theme-text">Connect</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a
									href="mailto:burningraven06@gmail.com"
									className="theme-link hover:theme-text transition"
								>
									Email us
								</a>
							</li>
							<li>
								<a href={ROUTES.contact} className="theme-link hover:theme-text transition">
									Twitter
								</a>
							</li>
							<li>
								<a href={ROUTES.contact} className="theme-link hover:theme-text transition">
									Instagram
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t theme-border-light mb-8" />

				{/* Bottom Section */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm theme-text-muted">
						© {currentYear} Kyle&apos;s Store. All rights reserved.
					</p>
					<p className="text-sm theme-text-muted">
						Built with <span className="text-red-500">❤</span> using Next.js & Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	)
}
