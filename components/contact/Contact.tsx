export function ContactComponent() {
	return (
		<section className="space-y-8 py-8">
			{/* Header */}
			<div className="text-center space-y-4 max-w-3xl mx-auto">
				<h1 className="text-4xl sm:text-5xl font-bold theme-text">Get in Touch</h1>
				<p className="text-lg theme-text-muted">
					We'd love to hear from you! Whether you have questions about our products, need
					support, or just want to say hello, we're here to help.
				</p>
			</div>

			{/* Contact Methods Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
				{/* Email */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center gap-3">
						<span className="text-3xl">📧</span>
						<h3 className="text-xl font-bold theme-text">Email</h3>
					</div>
					<p className="theme-text-muted">
						Send us an email and we'll respond as soon as possible.
					</p>
					<a
						href="mailto:burningraven06@gmail.com"
						className="inline-flex items-center gap-2 font-semibold theme-link hover:theme-text transition"
					>
						<span>burningraven06@gmail.com</span>
						<span>→</span>
					</a>
				</div>

				{/* Response Time */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center gap-3">
						<span className="text-3xl">⏱️</span>
						<h3 className="text-xl font-bold theme-text">Response Time</h3>
					</div>
					<p className="theme-text-muted">
						We typically respond to all inquiries within 24 hours.
					</p>
					<p className="inline-flex items-center gap-2 font-semibold text-green-600 dark:text-green-400">
						<span>●</span>
						<span>Available 24/7</span>
					</p>
				</div>
			</div>

			{/* Support Section */}
			<div className="card card-lg p-8 space-y-6 max-w-3xl mx-auto">
				<div className="space-y-2">
					<h2 className="text-2xl font-bold theme-text flex items-center gap-2">
						<span className="text-3xl">💪</span> Support Kyle's Store
					</h2>
					<p className="theme-text-muted">
						If you enjoy our project and want to support future improvements, here are a few
						ways you can help:
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<a
						href="#"
						className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition"
					>
						<span className="text-3xl">☕</span>
						<div>
							<p className="font-semibold theme-text">Buy me a coffee</p>
							<p className="text-sm theme-text-muted">Show your appreciation</p>
						</div>
						<span className="text-2xl ml-auto opacity-50">→</span>
					</a>
					<a
						href="#"
						className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition"
					>
						<span className="text-3xl">🔗</span>
						<div>
							<p className="font-semibold theme-text">Share the store</p>
							<p className="text-sm theme-text-muted">Tell your friends</p>
						</div>
						<span className="text-2xl ml-auto opacity-50">→</span>
					</a>
					<a
						href="#"
						className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition"
					>
						<span className="text-3xl">⭐</span>
						<div>
							<p className="font-semibold theme-text">Leave a review</p>
							<p className="text-sm theme-text-muted">Rate our service</p>
						</div>
						<span className="text-2xl ml-auto opacity-50">→</span>
					</a>
					<a
						href="#"
						className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition"
					>
						<span className="text-3xl">🌟</span>
						<div>
							<p className="font-semibold theme-text">Follow us</p>
							<p className="text-sm theme-text-muted">Stay updated</p>
						</div>
						<span className="text-2xl ml-auto opacity-50">→</span>
					</a>
				</div>
			</div>

			{/* FAQ Section */}
			<div className="card card-lg p-8 space-y-6 max-w-3xl mx-auto">
				<h2 className="text-2xl font-bold theme-text">Frequently Asked Questions</h2>
				<div className="space-y-4">
					<details className="group rounded-lg p-4 bg-slate-50 dark:bg-slate-800/10 cursor-pointer">
						<summary className="flex items-center justify-between font-semibold theme-text select-none">
							<span>How long does shipping take?</span>
							<span className="transition group-open:rotate-180">▼</span>
						</summary>
						<p className="mt-4 theme-text-muted text-sm leading-relaxed">
							Most orders are shipped within 2-3 business days. Standard shipping typically
							takes 5-7 business days, while expedited shipping takes 2-3 business days.
						</p>
					</details>
					<details className="group rounded-lg p-4 bg-slate-50 dark:bg-slate-800/10 cursor-pointer">
						<summary className="flex items-center justify-between font-semibold theme-text select-none">
							<span>What is your return policy?</span>
							<span className="transition group-open:rotate-180">▼</span>
						</summary>
						<p className="mt-4 theme-text-muted text-sm leading-relaxed">
							We offer a 30-day money-back guarantee on all purchases. Items must be in original
							condition with all packaging and documentation.
						</p>
					</details>
					<details className="group rounded-lg p-4 bg-slate-50 dark:bg-slate-800/10 cursor-pointer">
						<summary className="flex items-center justify-between font-semibold theme-text select-none">
							<span>Do you offer customer support?</span>
							<span className="transition group-open:rotate-180">▼</span>
						</summary>
						<p className="mt-4 theme-text-muted text-sm leading-relaxed">
							Yes! We offer 24/7 customer support via email. We respond to all inquiries within
							24 hours during business days.
						</p>
					</details>
				</div>
			</div>
		</section>
	)
}
