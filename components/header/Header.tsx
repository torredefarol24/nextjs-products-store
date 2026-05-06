"use client"

import { APP_ROUTES } from "@/config/routes"
import { useTheme } from "@/contexts/themes"
import Link from "next/link"

export function HeaderComponent() {
	const { theme, toggleTheme } = useTheme()

	return (
		<header className="theme-surface border-b px-4 py-4 shadow-sm sm:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-xl font-semibold theme-text">
					<Link className="transition theme-link" href="/">
						Kyle&apos;s Store
					</Link>
				</h1>
				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<nav className="flex flex-wrap items-center gap-3 text-sm theme-text sm:gap-4">
						<Link className="transition theme-link" href="/">
							Home
						</Link>
						<Link className="transition theme-link" href={APP_ROUTES.products}>
							Products
						</Link>
						<Link className="transition theme-link" href={APP_ROUTES.category}>
							Category
						</Link>
						<Link className="transition theme-link" href={APP_ROUTES.contact}>
							Contact
						</Link>
						<Link className="transition theme-link" href="/login">
							Sign In
						</Link>
						<Link className="transition theme-link" href="/signup">
							Sign Up
						</Link>
						<button
							type="button"
							onClick={toggleTheme}
							className="theme-button inline-flex h-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition"
						>
							{theme === "light" ? "🌙 Dark" : "☀️ Light"}
						</button>
					</nav>
				</div>
			</div>
		</header>
	)
}
