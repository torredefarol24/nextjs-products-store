"use client"

import SignoutButton from "@/components/auth/Signout"
import { ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import Link from "next/link"
import { useState } from "react"

export function HeaderComponent() {
	const { user } = useAuth()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header className="sticky top-0 z-50 theme-surface border-b theme-border shadow-sm backdrop-blur-sm bg-opacity-95">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center flex-shrink-0">
						<h1 className="text-2xl font-bold text-gradient">
							<Link href={user ? ROUTES.dashboard : ROUTES.home} className="transition">
								Kyle&apos;s Store
							</Link>
						</h1>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden sm:flex items-center gap-1">
						{!user && (
							<Link
								href={ROUTES.home}
								className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
							>
								Home
							</Link>
						)}
						<Link
							href={ROUTES.products}
							className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
						>
							Products
						</Link>
						<Link
							href={ROUTES.category}
							className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
						>
							Category
						</Link>
						{!user && (
							<Link
								href={ROUTES.contact}
								className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
							>
								Contact
							</Link>
						)}

						<div className="border-l theme-border mx-2 h-6" />

						{user ? (
							<>
								<Link
									href={ROUTES.orders}
									className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
								>
									Orders
								</Link>
								<Link
									href={ROUTES.settings}
									className="px-3 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
								>
									Settings
								</Link>
								<SignoutButton />
							</>
						) : (
							<Link
								href={ROUTES.login}
								className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:shadow-lg transition"
							>
								Sign In
							</Link>
						)}
					</nav>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg theme-text hover:theme-surface-secondary transition"
						aria-label="Toggle menu"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMenuOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="sm:hidden pb-4 border-t theme-border animate-in fade-in slide-in-from-top-2 duration-200">
						<nav className="flex flex-col gap-1 mt-4">
							{!user && (
								<Link
									href={ROUTES.home}
									className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
									onClick={closeMenu}
								>
									Home
								</Link>
							)}
							<Link
								href={ROUTES.products}
								className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
								onClick={closeMenu}
							>
								Products
							</Link>
							<Link
								href={ROUTES.category}
								className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
								onClick={closeMenu}
							>
								Category
							</Link>
							{!user && (
								<Link
									href={ROUTES.contact}
									className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
									onClick={closeMenu}
								>
									Contact
								</Link>
							)}

							{user ? (
								<>
									<Link
										href={ROUTES.orders}
										className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
										onClick={closeMenu}
									>
										Orders
									</Link>
									<Link
										href={ROUTES.settings}
										className="px-4 py-2 rounded-lg theme-text hover:theme-surface-secondary transition"
										onClick={closeMenu}
									>
										Settings
									</Link>
									<div onClick={closeMenu} className="px-4 py-2">
										<SignoutButton />
									</div>
								</>
							) : (
								<Link
									href={ROUTES.login}
									className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium text-center transition"
									onClick={closeMenu}
								>
									Sign In
								</Link>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}
