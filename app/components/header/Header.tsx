export function Header() {
	return (
		<header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-xl font-semibold text-slate-900">Products Shop</h1>
				<nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600 sm:gap-4">
					<a className="transition hover:text-slate-900" href="#">
						Home
					</a>
					<a className="transition hover:text-slate-900" href="#">
						Products
					</a>
					<a className="transition hover:text-slate-900" href="#">
						Contact
					</a>
				</nav>
			</div>
		</header>
	)
}
