export function ContactComponent() {
	return (
		<section className="mx-auto max-w-3xl rounded-3xl  theme-border theme-surface p-6 shadow-sm sm:p-8">
			<h2 className="text-2xl font-semibold theme-text">Get in touch</h2>
			<p className="mt-3 theme-text-muted">
				If you have questions about the store or want to connect, send a message or use one of
				the options below.
			</p>

			<div className="mt-6 grid gap-4 sm:grid-cols-2">
				<div className="rounded-2xl theme-border theme-surface p-4">
					<p className="text-sm font-semibold theme-text">Email</p>
					<a
						className="mt-2 block theme-link transition"
						href="mailto:burningraven06@gmail.com"
					>
						burningraven06@gmail.com
					</a>
				</div>
			</div>

			<div className="mt-6 rounded-2xl theme-border theme-surface p-4">
				<p className="text-sm font-semibold theme-text">Support me</p>
				<p className="mt-2 theme-text-muted">
					If you enjoy the project and want to support future improvements, consider a small tip
					or share this store with your network.
				</p>
				<div className="mt-4 grid gap-3 sm:grid-cols-2">
					<a
						href="#"
						className="inline-flex items-center justify-center rounded-xl border border-transparent bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
					>
						Buy me a coffee
					</a>
					<a
						href="#"
						className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-transparent px-4 py-2 text-sm font-semibold theme-text transition hover:bg-slate-100"
					>
						Share the store
					</a>
				</div>
			</div>
		</section>
	)
}
