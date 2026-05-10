"use client"

import Loader from "@/components/ui/Loader"
import { ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { IOrder } from "@/interfaces/order"
import Link from "next/link"
import { useEffect, useMemo } from "react"

export default function DashboardComponent({ orders }: { orders: IOrder[] }) {
	const { user, loading } = useAuth()
	useEffect(() => {
		if (!user) {
			return
		}
	}, [user])

	const totalOrders = orders.length
	const totalSpent = useMemo(
		() => orders.reduce((sum, order) => sum + order.total, 0),
		[orders],
	)
	const averageOrder = totalOrders ? totalSpent / totalOrders : 0
	const mostRecentOrder = useMemo(
		() =>
			orders
				.slice()
				.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0] ??
			null,
		[orders],
	)

	if (loading) {
		return <Loader message="Loading your dashboard…" fullScreen className="theme-surface p-6" />
	}

	if (!user) {
		return (
			<div className="min-h-screen theme-surface flex items-center justify-center p-6">
				<div className="rounded-3xl theme-border theme-surface p-10 text-center shadow-sm">
					<p className="text-xl font-semibold theme-text mb-3">
						Sign in to view your dashboard
					</p>
					<p className="theme-text-muted mb-6">
						This dashboard is available only to signed-in customers.
					</p>
					<Link
						href={ROUTES.login}
						className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
					>
						Sign In
					</Link>
				</div>
			</div>
		)
	}

	return (
		<section className="space-y-8">
			{/* Welcome Header */}
			<div className="card card-lg p-8 space-y-6">
				<div className="space-y-3">
					<p className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
						Dashboard
					</p>
					<h1 className="text-4xl font-bold theme-text">
						Welcome back, {user.fullName || user.email}!
					</h1>
					<p className="text-lg theme-text-muted max-w-2xl">
						Here&apos;s a quick overview of your orders and account activity to help you stay on top
						of store updates.
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 pt-2">
					<Link href={ROUTES.orders} className="btn btn-primary">
						View All Orders
					</Link>
					<Link href={ROUTES.settings} className="btn btn-secondary">
						Manage Profile
					</Link>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{/* Orders Placed */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold theme-text-muted uppercase">Orders Placed</h3>
						<span className="text-2xl">📦</span>
					</div>
					<p className="text-4xl font-bold text-gradient">{totalOrders}</p>
					<p className="text-sm theme-text-muted">Total orders made by you</p>
				</div>

				{/* Total Spent */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold theme-text-muted uppercase">Total Spent</h3>
						<span className="text-2xl">💰</span>
					</div>
					<p className="text-4xl font-bold text-gradient">${totalSpent.toFixed(2)}</p>
					<p className="text-sm theme-text-muted">Overall spend across all orders</p>
				</div>

				{/* Average Order */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold theme-text-muted uppercase">Avg. Order</h3>
						<span className="text-2xl">📊</span>
					</div>
					<p className="text-4xl font-bold text-gradient">${averageOrder.toFixed(2)}</p>
					<p className="text-sm theme-text-muted">Average value per order</p>
				</div>

				{/* Last Order */}
				<div className="card card-lg p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-semibold theme-text-muted uppercase">Last Order</h3>
						<span className="text-2xl">📅</span>
					</div>
					<p className="text-3xl font-bold text-gradient">
						{mostRecentOrder ? new Date(mostRecentOrder.createdAt).toLocaleDateString() : "—"}
					</p>
					<p className="text-sm theme-text-muted">
						{mostRecentOrder ? `Status: ${mostRecentOrder.status}` : "No orders yet"}
					</p>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Order Detail */}
				<div className="card card-lg p-6 space-y-4">
					<h2 className="text-2xl font-bold theme-text">Recent Order</h2>
					<p className="text-sm theme-text-muted">
						Latest order activity and product details from your most recent purchase.
					</p>
					{mostRecentOrder ? (
						<div className="space-y-3 mt-4">
							<div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 space-y-3">
								<p className="font-semibold theme-text">{mostRecentOrder.product.title}</p>
								<div className="grid grid-cols-2 gap-4 text-sm">
									<div>
										<p className="theme-text-muted">Order Total</p>
										<p className="font-bold theme-text text-lg">
											${mostRecentOrder.total.toFixed(2)}
										</p>
									</div>
									<div>
										<p className="theme-text-muted">Status</p>
										<p className="font-bold theme-text">{mostRecentOrder.status}</p>
									</div>
								</div>
								<div>
									<p className="theme-text-muted text-xs">Order Date</p>
									<p className="text-sm theme-text">
										{new Date(mostRecentOrder.createdAt).toLocaleString()}
									</p>
								</div>
							</div>
							<Link href={ROUTES.orders} className="btn btn-secondary w-full text-center">
								View All Orders
							</Link>
						</div>
					) : (
						<div className="p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-center space-y-3 mt-4">
							<p className="theme-text-muted">
								No order history is available yet. Place an order to populate your dashboard.
							</p>
							<Link href={ROUTES.products} className="btn btn-primary inline-flex">
								Start Shopping
							</Link>
						</div>
					)}
				</div>

				{/* Quick Actions */}
				<div className="card card-lg p-6 space-y-4">
					<h2 className="text-2xl font-bold theme-text">Quick Actions</h2>
					<p className="text-sm theme-text-muted">
						Keep your account up to date and continue browsing the store.
					</p>
					<div className="space-y-2 mt-4">
						<Link
							href={ROUTES.products}
							className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition group"
						>
							<div className="flex items-center gap-3">
								<span className="text-2xl">🛍️</span>
								<span className="font-semibold theme-text">Browse Products</span>
							</div>
							<span className="text-xl group-hover:translate-x-1 transition">→</span>
						</Link>
						<Link
							href={ROUTES.category}
							className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition group"
						>
							<div className="flex items-center gap-3">
								<span className="text-2xl">🏷️</span>
								<span className="font-semibold theme-text">Browse Categories</span>
							</div>
							<span className="text-xl group-hover:translate-x-1 transition">→</span>
						</Link>
						<Link
							href={ROUTES.settings}
							className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/10 hover:shadow-md transition group"
						>
							<div className="flex items-center gap-3">
								<span className="text-2xl">⚙️</span>
								<span className="font-semibold theme-text">Update Profile</span>
							</div>
							<span className="text-xl group-hover:translate-x-1 transition">→</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
