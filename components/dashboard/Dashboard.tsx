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
		<section className="mx-auto max-w-6xl space-y-8">
			<div className="rounded-3xl theme-border theme-surface p-8 shadow-sm">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.24em] theme-text-muted">
							Dashboard
						</p>
						<h1 className="mt-3 text-3xl font-semibold theme-text">
							Welcome back, {user.fullName || user.email}
						</h1>
						<p className="mt-2 max-w-2xl text-sm leading-6 theme-text-muted">
							A quick overview of your orders and account activity to help you stay on top of
							store updates.
						</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link
							href={ROUTES.orders}
							className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
						>
							View Orders
						</Link>
						<Link
							href={ROUTES.settings}
							className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold theme-text transition hover:bg-slate-100"
						>
							Manage Profile
						</Link>
					</div>
				</div>

				<div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					<div className="rounded-3xl theme-surface p-6 shadow-sm">
						<p className="text-sm font-semibold theme-text-muted">Orders placed</p>
						<p className="mt-4 text-3xl font-semibold theme-text">{totalOrders}</p>
						<p className="mt-2 text-sm theme-text-muted">Total orders made by you</p>
					</div>
					<div className="rounded-3xl theme-surface p-6 shadow-sm">
						<p className="text-sm font-semibold theme-text-muted">Total spent</p>
						<p className="mt-4 text-3xl font-semibold theme-text">${totalSpent.toFixed(2)}</p>
						<p className="mt-2 text-sm theme-text-muted">Overall spend across your orders</p>
					</div>
					<div className="rounded-3xl theme-surface p-6 shadow-sm">
						<p className="text-sm font-semibold theme-text-muted">Average order</p>
						<p className="mt-4 text-3xl font-semibold theme-text">${averageOrder.toFixed(2)}</p>
						<p className="mt-2 text-sm theme-text-muted">Average value per order</p>
					</div>
					<div className="rounded-3xl theme-surface p-6 shadow-sm">
						<p className="text-sm font-semibold theme-text-muted">Last order</p>
						<p className="mt-4 text-3xl font-semibold theme-text">
							{mostRecentOrder ? new Date(mostRecentOrder.createdAt).toLocaleDateString() : "—"}
						</p>
						<p className="mt-2 text-sm theme-text-muted">
							Latest order status: {mostRecentOrder?.status ?? "No orders yet"}
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-3xl theme-border theme-surface p-6">
					<h2 className="text-xl font-semibold theme-text">Recent Order Detail</h2>
					<p className="mt-3 text-sm theme-text-muted">
						Latest order activity and product details from your most recent purchase.
					</p>
					{mostRecentOrder ? (
						<div className="mt-6 space-y-4">
							<div className="rounded-3xl border border-slate-200 theme-surface p-4">
								<p className="text-sm font-semibold theme-text">
									{mostRecentOrder.product.title}
								</p>
								<p className="mt-2 text-sm theme-text-muted">
									Order total: ${mostRecentOrder.total.toFixed(2)}
								</p>
								<p className="text-sm theme-text-muted">Status: {mostRecentOrder.status}</p>
							</div>
							<div className="rounded-3xl border border-slate-200 theme-surface p-4">
								<p className="text-sm font-semibold theme-text">Order date</p>
								<p className="mt-2 text-sm theme-text-muted">
									{new Date(mostRecentOrder.createdAt).toLocaleString()}
								</p>
							</div>
						</div>
					) : (
						<div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-sm theme-text-muted">
							No order history is available yet. Place an order to populate your dashboard.
						</div>
					)}
				</div>
				<div className="rounded-3xl theme-border theme-surface p-6">
					<h2 className="text-xl font-semibold theme-text">Quick actions</h2>
					<p className="mt-3 text-sm theme-text-muted">
						Keep your account up to date and continue browsing the store.
					</p>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<Link
							href={ROUTES.products}
							className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
						>
							Browse products
						</Link>
						<Link
							href={ROUTES.orders}
							className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold theme-text transition hover:bg-slate-100"
						>
							View orders
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
