"use client"

import { APP_ROUTES } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { IOrder } from "@/interfaces/order"
import Link from "next/link"
import { useState } from "react"

type SortField = "total" | "createdAt"
type SortDirection = "asc" | "desc"

export default function OrdersListComponent({ orders }: { orders: IOrder[] }) {
	const { user } = useAuth()
	const [deletedOrderIds, setDeletedOrderIds] = useState<string[]>([])
	const [loading, setLoading] = useState(false)
	const [sortField, setSortField] = useState<SortField>("createdAt")
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
	const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

	const displayedOrders = orders.filter((order) => !deletedOrderIds.includes(order.id))

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortDirection("asc")
		}
	}

	const sortedOrders = [...displayedOrders].sort((a, b) => {
		let aValue: any
		let bValue: any

		if (sortField === "total") {
			aValue = a.total
			bValue = b.total
		} else {
			aValue = new Date(a.createdAt).getTime()
			bValue = new Date(b.createdAt).getTime()
		}

		if (sortDirection === "asc") {
			return aValue > bValue ? 1 : -1
		} else {
			return aValue < bValue ? 1 : -1
		}
	})

	const handleDeleteOrder = async (orderId: string) => {
		if (!user) return

		setDeletingOrderId(orderId)
		try {
			const response = await fetch("/api/orders/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					orderId,
				}),
			})

			if (response.ok) {
				setDeletedOrderIds((prev) => [...prev, orderId])
			} else {
				const error = await response.json()
				alert(`Failed to delete order: ${error.message}`)
			}
		} catch (error) {
			console.error("Error deleting order:", error)
			alert("Failed to delete order")
		} finally {
			setDeletingOrderId(null)
			setShowDeleteConfirm(null)
		}
	}

	const confirmDelete = (orderId: string) => {
		setShowDeleteConfirm(orderId)
	}

	const cancelDelete = () => {
		setShowDeleteConfirm(null)
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 theme-surface p-6">
				<div className="max-w-6xl mx-auto">
					<div className="animate-pulse">
						<div className="h-8 theme-surface rounded w-48 mb-6"></div>
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
							<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
								<div className="h-6 theme-surface rounded w-32"></div>
							</div>
							<div className="p-6 space-y-4">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="flex items-center space-x-4">
										<div className="w-12 h-12 theme-surface rounded-full"></div>
										<div className="flex-1 space-y-2">
											<div className="h-4 theme-surface rounded w-3/4"></div>
											<div className="h-3 theme-surface rounded w-1/2"></div>
										</div>
										<div className="h-8 theme-surface rounded w-20"></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (displayedOrders.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 theme-surface flex items-center justify-center p-6">
				<div className="text-center max-w-md mx-auto">
					<div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-12 h-12 text-blue-600 dark:text-blue-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
							/>
						</svg>
					</div>
					<h2 className="text-2xl font-bold theme-text mb-2">No Orders Yet</h2>
					<p className="theme-text-muted mb-6">
						You haven't placed any orders yet. Start shopping to see your orders here!
					</p>
					<Link
						href={APP_ROUTES.products}
						className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						Start Shopping
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 theme-surface p-6">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-3xl font-bold theme-text mb-2">Your Orders</h1>
					<p className="theme-text-muted">Manage and track all your orders in one place</p>
				</div>

				<div className="bg-white theme-surface rounded-xl shadow-lg overflow-hidden">
					<div className="px-6 py-5 border-b border-gray-200 theme-surface bg-gradient-to-r from-blue-50 to-purple-50 ">
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
							<div>
								<h2 className="text-xl font-semibold theme-text">Order History</h2>
								<p className="text-sm theme-text-muted mt-1">
									{sortedOrders.length} order{sortedOrders.length !== 1 ? "s" : ""} found
								</p>
							</div>
							<div className="flex gap-3">
								<button
									onClick={() => handleSort("createdAt")}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
										sortField === "createdAt"
											? "bg-blue-600 text-white shadow-md"
											: "bg-gray-100 theme-surface theme-border border theme-text hover:bg-gray-200 dark:hover:bg-gray-600"
									}`}
								>
									Date {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
								</button>
								<button
									onClick={() => handleSort("total")}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
										sortField === "total"
											? "bg-blue-600 text-white shadow-md"
											: "bg-gray-100 theme-surface theme-border border theme-text hover:bg-gray-200 dark:hover:bg-gray-600"
									}`}
								>
									Price {sortField === "total" && (sortDirection === "asc" ? "↑" : "↓")}
								</button>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 theme-surface">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium theme-text-muted uppercase tracking-wider">
										Product
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium theme-text-muted uppercase tracking-wider">
										Total
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium theme-text-muted uppercase tracking-wider">
										Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium theme-text-muted uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium theme-text-muted uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white theme-surface divide-y theme-border">
								{sortedOrders.map((order) => (
									<tr key={order.id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="flex-shrink-0 h-10 w-10">
													<img
														className="h-10 w-10 rounded-full object-cover"
														src={order.product.thumbnail}
														alt={order.product.title}
													/>
												</div>
												<div className="ml-4">
													<div className="text-sm font-medium theme-text">
														{order.product.title}
													</div>
													<div className="text-sm theme-text-muted">ID: {order.product.id}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium theme-text">
												${order.total.toFixed(2)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm theme-text">
												{new Date(order.createdAt).toLocaleDateString()}
											</div>
											<div className="text-sm theme-text-muted">
												{new Date(order.createdAt).toLocaleTimeString()}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												{order.status || "Pending"}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<button
												onClick={() => confirmDelete(order.id)}
												disabled={deletingOrderId === order.id}
												className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
											>
												{deletingOrderId === order.id ? "Deleting..." : "Delete"}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Delete Confirmation Modal */}
				{showDeleteConfirm && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
									<svg
										className="w-6 h-6 text-red-600 dark:text-red-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
										/>
									</svg>
								</div>
								<div>
									<h3 className="text-lg font-semibold theme-text">Delete Order</h3>
									<p className="text-sm theme-text-muted">This action cannot be undone.</p>
								</div>
							</div>
							<p className="theme-text-muted mb-6">
								Are you sure you want to delete this order? This will permanently remove the
								order from your account.
							</p>
							<div className="flex gap-3">
								<button
									onClick={cancelDelete}
									className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 theme-text rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDeleteOrder(showDeleteConfirm)}
									disabled={deletingOrderId === showDeleteConfirm}
									className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
								>
									{deletingOrderId === showDeleteConfirm ? (
										<>
											<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Deleting...
										</>
									) : (
										"Delete Order"
									)}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
