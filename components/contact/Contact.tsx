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
					<a className="mt-2 block theme-link transition" href="mailto:hello@example.com">
						hello@example.com
					</a>
				</div>

				<div className="rounded-2xl theme-border theme-surface p-4">
					<p className="text-sm font-semibold theme-text">Phone</p>
					<a className="mt-2 block theme-link transition" href="tel:+1234567890">
						+1 (234) 567-890
					</a>
				</div>
			</div>

			<div className="mt-6 space-y-3 rounded-2xl theme-border theme-surface p-4">
				<p className="text-sm font-semibold theme-text">Message</p>
				<p className="theme-text-muted">
					You can also reach out through social media or send a quick note to start a
					conversation.
				</p>
				<ul className="space-y-2 theme-text-muted">
					<li>
						LinkedIn: <span className="font-medium theme-text">linkedin.com/in/yourname</span>
					</li>
					<li>
						Twitter: <span className="font-medium theme-text">@yourhandle</span>
					</li>
				</ul>
			</div>
		</section>
	)
}
