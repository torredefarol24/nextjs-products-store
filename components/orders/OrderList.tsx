"use client"

import { APIS } from "@/config/constants"
import { useAuth } from "@/contexts/auth"
import { IOrder } from "@/interfaces/order"
import { useState } from "react"
import { OrdersTable } from "./OrderTable"
import { DeleteOrderModal } from "./OrdersDeleteModal"
import { OrderEmpty } from "./OrdersEmpty"

type SortField = "total" | "createdAt"
type SortDirection = "asc" | "desc"

export default function OrdersListComponent({ orders }: { orders: IOrder[] }) {
	const { user } = useAuth()
	const [deletedOrderIds, setDeletedOrderIds] = useState<string[]>([])
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
		let aValue: string | number
		let bValue: string | number

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
			const response = await fetch(APIS.INTERNAL.deleteOrder, {
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

	if (displayedOrders.length === 0) {
		return <OrderEmpty />
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

					<OrdersTable
						orders={orders}
						sortedOrders={sortedOrders}
						deletingOrderId={deletingOrderId}
						confirmDelete={confirmDelete}
					/>
				</div>

				{/* Delete Confirmation Modal */}
				{showDeleteConfirm && (
					<DeleteOrderModal
						cancelDelete={cancelDelete}
						handleDeleteOrder={handleDeleteOrder}
						showDeleteConfirm={showDeleteConfirm}
						deletingOrderId={deletingOrderId}
					/>
				)}
			</div>
		</div>
	)
}
