export function ContactComponent() {
	return (
		<section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<h2 className="text-2xl font-semibold text-slate-900">Get in touch</h2>
			<p className="mt-3 text-slate-600">
				If you have questions about the store or want to connect, send a message or use one of
				the options below.
			</p>

			<div className="mt-6 grid gap-4 sm:grid-cols-2">
				<div className="rounded-2xl bg-slate-50 p-4">
					<p className="text-sm font-semibold text-slate-900">Email</p>
					<a
						className="mt-2 block text-slate-700 transition hover:text-slate-900"
						href="mailto:hello@example.com"
					>
						hello@example.com
					</a>
				</div>

				<div className="rounded-2xl bg-slate-50 p-4">
					<p className="text-sm font-semibold text-slate-900">Phone</p>
					<a
						className="mt-2 block text-slate-700 transition hover:text-slate-900"
						href="tel:+1234567890"
					>
						+1 (234) 567-890
					</a>
				</div>
			</div>

			<div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4">
				<p className="text-sm font-semibold text-slate-900">Message</p>
				<p className="text-slate-700">
					You can also reach out through social media or send a quick note to start a
					conversation.
				</p>
				<ul className="space-y-2 text-slate-700">
					<li>
						LinkedIn:{" "}
						<span className="font-medium text-slate-900">linkedin.com/in/yourname</span>
					</li>
					<li>
						Twitter: <span className="font-medium text-slate-900">@yourhandle</span>
					</li>
				</ul>
			</div>
		</section>
	)
}
