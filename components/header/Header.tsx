"use client"

import SignoutButton from "@/components/auth/Signout"
import { ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { useTheme } from "@/contexts/themes"
import Link from "next/link"

export function HeaderComponent() {
	const { theme, toggleTheme } = useTheme()
	const { user } = useAuth()

	return (
		<header className="theme-surface border-b px-4 py-4 shadow-sm sm:px-6 lg:px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h1 className="text-xl font-semibold theme-text">
					<Link className="transition theme-link" href={user ? ROUTES.dashboard : ROUTES.home}>
						Kyle&apos;s Store
					</Link>
				</h1>
				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<nav className="flex flex-wrap items-center gap-3 text-sm theme-text sm:gap-4">
						{!user && (
							<Link className="transition theme-link" href="/">
								Home
							</Link>
						)}
						<Link className="transition theme-link" href={ROUTES.products}>
							Products
						</Link>
						<Link className="transition theme-link" href={ROUTES.category}>
							Category
						</Link>
						{!user && (
							<Link className="transition theme-link" href={ROUTES.contact}>
								Contact
							</Link>
						)}

						{user ? (
							<>
								<Link className="transition theme-link" href={ROUTES.orders}>
									Orders
								</Link>

								<Link className="transition theme-link" href={ROUTES.settings}>
									Settings
								</Link>
								<Link className="transition theme-link" href={ROUTES.contact}>
									Contact
								</Link>
								<SignoutButton />
							</>
						) : (
							<>
								<Link className="transition theme-link" href={ROUTES.login}>
									Sign In
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	)
}
