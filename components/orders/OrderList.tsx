"use client"

import { useAuth } from "@/contexts/auth"
import { IOrder } from "@/interfaces/order"
import { useState } from "react"

type SortField = "total" | "createdAt"
type SortDirection = "asc" | "desc"

export default function OrdersListComponent({ orders }: { orders: IOrder[] }) {
	const { user } = useAuth()
	const [ordersWithProducts, setOrdersWithProducts] = useState<IOrder[]>(orders)
	const [loading, setLoading] = useState(false)
	const [sortField, setSortField] = useState<SortField>("createdAt")
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
	const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null)

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortDirection("asc")
		}
	}

	const sortedOrders = [...ordersWithProducts].sort((a, b) => {
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
				// Remove the order from the local state
				setOrdersWithProducts((prev) =>
					prev.filter((order) => order._id?.toString() !== orderId),
				)
			} else {
				const error = await response.json()
				alert(`Failed to delete order: ${error.message}`)
			}
		} catch (error) {
			console.error("Error deleting order:", error)
			alert("Failed to delete order")
		} finally {
			setDeletingOrderId(null)
		}
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 theme-surface">
				<p className="theme-text">Loading your orders...</p>
			</div>
		)
	}

	if (ordersWithProducts.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 theme-surface">
				<p className="theme-text">You haven't placed any orders yet.</p>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 theme-surface p-6">
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold theme-text mb-6">Your Orders</h1>

				<div className="bg-white theme-surface rounded-lg shadow overflow-hidden">
					<div className="px-6 py-4 border-b theme-border">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold theme-text">Order History</h2>
							<div className="flex gap-4">
								<button
									onClick={() => handleSort("createdAt")}
									className={`px-3 py-1 rounded text-sm font-medium ${
										sortField === "createdAt"
											? "bg-blue-100 text-blue-800 theme-text"
											: "bg-gray-100 text-gray-600 theme-text-muted hover:bg-gray-200"
									}`}
								>
									Date {sortField === "createdAt" && (sortDirection === "asc" ? "↑" : "↓")}
								</button>
								<button
									onClick={() => handleSort("total")}
									className={`px-3 py-1 rounded text-sm font-medium ${
										sortField === "total"
											? "bg-blue-100 text-blue-800 theme-text"
											: "bg-gray-100 text-gray-600 theme-text-muted hover:bg-gray-200"
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
									<tr key={order._id?.toString() || Math.random()}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												{order.product ? (
													<>
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
															<div className="text-sm theme-text-muted">
																ID: {order.product.id}
															</div>
														</div>
													</>
												) : (
													<div className="text-sm theme-text-muted">
														Product not found (ID: {order.productId})
													</div>
												)}
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
												onClick={() => handleDeleteOrder(order._id?.toString() || "")}
												disabled={deletingOrderId === order._id?.toString()}
												className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{deletingOrderId === order._id?.toString() ? "Deleting..." : "Delete"}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
