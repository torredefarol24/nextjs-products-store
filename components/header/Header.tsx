"use client"

import { APP_ROUTES } from "@/config/routes"
import Link from "next/link"

export function Header() {
	return (
		<header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-xl font-semibold text-slate-900">Products Shop</h1>
				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600 sm:gap-4">
						<Link className="transition hover:text-slate-900" href="/">
							Home
						</Link>
						<Link className="transition hover:text-slate-900" href={APP_ROUTES.products}>
							Products
						</Link>
						<Link className="transition hover:text-slate-900" href={APP_ROUTES.contact}>
							Contact
						</Link>
					</nav>
				</div>
			</div>
		</header>
	)
}
