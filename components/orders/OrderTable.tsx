import { IOrderTableProps } from "@/interfaces/order"
import Image from "next/image"

export function OrdersTable({
	sortedOrders,
	deletingOrderId,
	confirmDelete,
}: IOrderTableProps) {
	return (
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
				<tbody className="bg-white theme-surface divide-y ">
					{sortedOrders.map((order) => (
						<tr key={order.id}>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center">
									<div className="flex-shrink-0 h-10 w-10">
										<Image
											className="h-10 w-10 rounded-full object-cover"
											src={order.product.thumbnail}
											alt={order.product.title}
											width={40}
											height={40}
										/>
									</div>
									<div className="ml-4">
										<div className="text-sm font-medium theme-text">{order.product.title}</div>
										<div className="text-sm theme-text-muted">ID: {order.product.id}</div>
									</div>
								</div>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="text-sm font-medium theme-text">${order.total.toFixed(2)}</div>
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
	)
}
